import { NextRequest, NextResponse } from 'next/server';
import { FormSubmission, FormValues } from '@/types';
import xss from 'xss';

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
