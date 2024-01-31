'use server';

import { render } from '@react-email/render';
import Mail from 'nodemailer/lib/mailer';
import server from '~/env/server.mjs';
import transporter from '~/lib/mail';
import projectConfig from '~/lib/project.config';
import { ContactForms } from '~/schema';
import { EmailContact } from '~/templates';

export const sendMail = async (emailHtml: string, options?: Mail.Options) => {
  if (!projectConfig.mailInfo.from || !projectConfig.mailInfo.to) return;

  if (
    server.SMTP_USER === undefined ||
    server.SMTP_PASS === undefined ||
    server.SMTP_SERVICE === undefined
  )
    return;

  try {
    transporter.sendMail({
      from: projectConfig.mailInfo.from,
      to: projectConfig.mailInfo.to,
      html: emailHtml,
      ...options,
    });
  } catch (error) {
    // TODO: Log error
    console.error(error);
  }
};

export const mailContactForm = async (values: ContactForms) => {
  sendMail(render(EmailContact(values)), {
    subject: `New Contact Form from ${values.name}`,
  });
};
