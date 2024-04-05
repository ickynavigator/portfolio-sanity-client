'use server';

import { render } from '@react-email/render';
import { createContactMessage } from '~/lib/actions/sanity';
import Mailer from '~/lib/mail';
import { EmailContact } from '~/templates';

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
  await mailer.sendMail(render(EmailContact(values)), {
    subject: `New Contact Form from ${values.name}`,
  });

  return { sanityForm };
};

export default formSubmit;
