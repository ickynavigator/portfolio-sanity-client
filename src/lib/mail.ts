import nodemailer from 'nodemailer';
import server from '../env/server.mjs';

const getTransporter = () => {
  const transporter = nodemailer.createTransport({
    logger: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',

    service: server.SMTP_SERVICE,
    auth: {
      user: server.SMTP_USER,
      pass: server.SMTP_PASS,
    },
  });

  return {
    [Symbol.dispose]() {
      transporter.close();
    },
    transporter,
  };
};

export default getTransporter;
