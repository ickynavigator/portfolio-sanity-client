'use server';

import { render } from '@react-email/render';
import Mail from 'nodemailer/lib/mailer';
import transporter from '~/lib/mail';
import projectConfig from '~/lib/project.config';
import { ContactForms } from '~/schema';
import { EmailContact } from '~/templates';

export const sendMail = async (emailHtml: string, options?: Mail.Options) => {
  try {
    return transporter.sendMail({
      from: projectConfig.mailInfo.from,
      to: projectConfig.mailInfo.to,
      html: emailHtml,
      ...options,
    });
  } catch (error) {
    // TODO: Log error
    console.error(error);
    return error;
  }
};

export const mailContactForm = async (values: ContactForms) => {
  return sendMail(render(EmailContact(values)));
};
