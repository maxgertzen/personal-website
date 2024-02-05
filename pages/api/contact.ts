import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import xss from 'xss';

type RequestBody = {
  name: string;
  email: string;
  phoneNumber: string;
  isSubscribed: boolean;
  message: string;
};

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message, phoneNumber, isSubscribed }: RequestBody =
    req.body;

  if (!name || !email || !message || !isSubscribed) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sanitizedMessage = xss(message);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USERNAME,
    subject: `[maxgertzen.co] - New contact form submission from ${name}`,
    html: `
      <p>You have a new contact form submission:</p>
      <p><strong>Full Name: </strong> ${name}</p>
      <p><strong>Phone Number: </strong> ${phoneNumber}</p>
      <p><strong>Email: </strong> ${email}</p>
      <p><strong>Agreed to receive communications: </strong> ${
        isSubscribed ? 'Yes' : 'No'
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
