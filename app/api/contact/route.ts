import { NextRequest, NextResponse } from 'next/server';
import { FormSubmission, FormValues } from '@/types';
import xss from 'xss';
import nodemailer from 'nodemailer';
import { RECAPTCHA_ACTION } from '@/constants/recaptcha';

// nodemailer needs the Node.js runtime; it cannot run on the edge.
export const runtime = 'nodejs';

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

// reCAPTCHA Enterprise assessment. Project id is taken from the Google Cloud
// console (public, non-secret); only the API key lives in the environment.
const RECAPTCHA_PROJECT = 'personal-website-1783424992246';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const apiKey = process.env.RECAPTCHA_ENTERPRISE_API_KEY;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!apiKey || !siteKey) {
    throw new Error('reCAPTCHA Enterprise is not configured');
  }

  const response = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT}/assessments?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: { token, expectedAction: RECAPTCHA_ACTION, siteKey },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Something went wrong, received ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return (
    data.tokenProperties?.valid === true &&
    data.tokenProperties?.action === RECAPTCHA_ACTION &&
    (data.riskAnalysis?.score ?? 0) >= 0.5
  );
}

const sendContactEmail = async (formValues: FormValues) => {
  const user = process.env.FASTMAIL_SMTP_USER;
  const pass = process.env.FASTMAIL_SMTP_PASSWORD;

  if (!user || !pass) throw new Error('SMTP credentials are not set');

  const transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to: process.env.CONTACT_TO_EMAIL || user,
    replyTo: formValues.email,
    subject: `New contact form message from ${formValues.name}`,
    text: [
      `Name: ${formValues.name}`,
      `Email: ${formValues.email}`,
      `Phone: ${formValues.phoneNumber || '—'}`,
      '',
      formValues.message,
    ].join('\n'),
  });
};

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

  const { allowed, retryAfterSec } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
    );
  }

  let body: FormSubmission;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { name, email, message, phoneNumber, isAgreeingToTerms, recaptchaToken } =
    body;

  if (!name || !email || !message || !isAgreeingToTerms || !recaptchaToken) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  let isCaptchaValid: boolean;
  try {
    isCaptchaValid = await verifyRecaptcha(recaptchaToken);
  } catch {
    return NextResponse.json(
      { error: 'reCAPTCHA verification unavailable' },
      { status: 502 }
    );
  }

  if (!isCaptchaValid) {
    return NextResponse.json(
      { error: 'reCAPTCHA verification failed' },
      { status: 400 }
    );
  }

  const sanitizedName = xss(name);
  const sanitizedEmail = xss(email);
  const sanitizedPhone = xss(phoneNumber);
  const sanitizedMessage = xss(message);

  try {
    await sendContactEmail({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      phoneNumber: sanitizedPhone,
      isAgreeingToTerms,
    });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
