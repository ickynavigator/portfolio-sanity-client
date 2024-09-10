'use server';

import { render } from '@react-email/components';
import { createContactMessage } from '~/lib/actions/sanity';
import Mailer from '~/lib/mail';
import { EmailContact } from '~/templates/contact';

interface IFormSubmit {
  name: string;
  email: string;
  message: string;
}

const formSubmit = async (values: IFormSubmit) => {
  const sanityForm = await createContactMessage({
    _type: 'contactForms',
    ...values,
  });

  const mailer = new Mailer();
  const html = await render(EmailContact(values), {
    pretty: false,
  });
  await mailer.sendMail(html, {
    replyTo: values.email,
    subject: `New Contact Form from ${values.name}`,
  });

  return { sanityForm };
};

export default formSubmit;
