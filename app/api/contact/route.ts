import { NextRequest, NextResponse } from 'next/server';
import { FormSubmission, FormValues } from '@/types';
import xss from 'xss';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();

  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetTime) rateLimitMap.delete(key);
  }

  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  entry.count++;
  return { allowed: true, retryAfterSec: 0 };
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SITE_SECRET;

  const params = new URLSearchParams({
    secret: secret || '',
    response: token,
  }).toString();

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Something went wrong, received ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return data.success && data.score >= 0.5;
}

const startGoogleApp = async (formValues: FormValues) => {
  const appUrl = process.env.G_APP_URL;

  if (!appUrl) throw new Error('No URL is set');

  const response = await fetch(appUrl, {
    method: 'POST',
    body: JSON.stringify(formValues),
  });

  const data = await response.json();

  if (!response.ok || data.status !== 'success') {
    throw data || response.status;
  }

  return data;
};

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.ip ||
    'unknown';

  const { allowed, retryAfterSec } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
    );
  }

  const {
    name,
    email,
    message,
    phoneNumber,
    isAgreeingToTerms,
    recaptchaToken,
  }: FormSubmission = await request.json();

  const isCaptchaValid = await verifyRecaptcha(recaptchaToken);

  if (!isCaptchaValid) {
    return NextResponse.json(
      { error: 'reCAPTCHA verification failed' },
      { status: 400 }
    );
  }

  if (!name || !email || !message || !isAgreeingToTerms) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const sanitizedName = xss(name);
  const sanitizedEmail = xss(email);
  const sanitizedPhone = xss(phoneNumber);
  const sanitizedMessage = xss(message);

  try {
    const response = await startGoogleApp({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      phoneNumber: sanitizedPhone,
      isAgreeingToTerms,
    });

    return NextResponse.json(response);
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
