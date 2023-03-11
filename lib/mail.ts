import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  logger: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',

  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;
