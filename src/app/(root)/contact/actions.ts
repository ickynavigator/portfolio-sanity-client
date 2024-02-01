'use server';

import { mailContactForm } from '~/lib/actions/mail';
import { createContactMessage } from '~/lib/actions/sanity';

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

  const mailForm = await mailContactForm(sanityForm);

  return { sanityForm, mailForm };
};

export default formSubmit;
