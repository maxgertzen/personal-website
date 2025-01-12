import { FormSubmission, FormValues } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import xss from 'xss';

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
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

    if (!response.ok)
      throw new Error(
        `Something went wrong, received ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    console.info(JSON.stringify(data, null, 2));

    return data.success;
  } catch (error) {
    throw error;
  }
}

const startGoogleApp = async (formValues: FormValues) => {
  try {
    const appUrl = process.env.G_APP_URL;

    if (!appUrl) throw new Error('No URL is set');

    const response = await fetch(process.env.G_APP_URL as string, {
      method: 'POST',
      body: JSON.stringify(formValues),
    });

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    if (!response.ok || data.status !== 'success') {
      throw data || response.status;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const processEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    email,
    message,
    phoneNumber,
    isAgreeingToTerms,
    recaptchaToken,
  }: FormSubmission = req.body;

  const isCaptchaValid = await verifyRecaptcha(recaptchaToken);

  if (!isCaptchaValid) {
    return res.status(400).json({ error: 'reCAPTCHA verification failed' });
  }

  if (!name || !email || !message || !isAgreeingToTerms) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sanitizedMessage = xss(message);

  try {
    const response = await startGoogleApp({
      name,
      email,
      message: sanitizedMessage,
      phoneNumber,
      isAgreeingToTerms,
    });

    return res.status(200).json(response);
  } catch (error) {
    return void res.status(500).end();
  }
};

export default processEntry;
