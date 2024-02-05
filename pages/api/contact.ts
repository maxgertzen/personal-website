import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import xss from 'xss';

/* 
const nodemailer = require("nodemailer");

export default async (req, res) => {

const { firstName, lastName, email, message } = JSON.parse(req.body);

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "myEmail@gmail.com",
        pass: "password",
    },
    secure: true,
});

await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

const mailData = {
    from: {
        name: `${firstName} ${lastName}`,
        address: "myEmail@gmail.com",
    },
    replyTo: email,
    to: "recipient@gmail.com",
    subject: `form message`,
    text: message,
    html: `${message}`,
};

await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});

res.status(200).json({ status: "OK" });
};
 */
type RequestBody = {
  name: string;
  email: string;
  phoneNumber: string;
  isAgreeingToTerms: boolean;
  message: string;
};

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message, phoneNumber, isAgreeingToTerms }: RequestBody =
    req.body;

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
    from: email,
    to: process.env.EMAIL_USERNAME,
    subject: `[maxgertzen.com] - New contact form submission from ${name}`,
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
