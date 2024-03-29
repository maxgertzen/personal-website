import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import xss from 'xss';

type RequestBody = {
  name: string;
  email: string;
  phoneNumber: string;
  isAgreeingToTerms: boolean;
  message: string;
  recaptchaToken: string;
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secret}&response=${token}`,
    }
  );
  const data = await response.json();

  return data.success && data.score > 0.5;
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    email,
    message,
    phoneNumber,
    isAgreeingToTerms,
    recaptchaToken,
  }: RequestBody = req.body;

  const isCaptchaValid = await verifyRecaptcha(recaptchaToken);

  if (!isCaptchaValid) {
    return res.status(400).json({ error: 'reCAPTCHA verification failed' });
  }

  if (!name || !email || !message || !isAgreeingToTerms) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sanitizedMessage = xss(message);

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Server is ready to take our messages');
        resolve(success);
      }
    });
  });

  const mailOptions = {
    from: `"maxgertzen.com" <${process.env.EMAIL_USERNAME}>`,
    to: process.env.EMAIL_USERNAME,
    subject: `New contact form submission from ${name}`,
    html: `
      <p>You have a new contact form submission:</p>
      <p><strong>Full Name: </strong> ${name}</p>
      <p><strong>Phone Number: </strong> ${phoneNumber}</p>
      <p><strong>Email: </strong> ${email}</p>
      <p><strong>Agreed to receive communications: </strong> ${
        isAgreeingToTerms ? 'Yes' : 'No'
      }</p>
      <p><strong>Message: </strong> ${sanitizedMessage}</p>
    `,
  };

  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    console.log('Message Sent', emailResponse.messageId);
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
};

export default sendEmail;
