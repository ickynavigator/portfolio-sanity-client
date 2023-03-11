import { ContactForms } from '../schema';

export const isContactForm = <R extends boolean = false>(
  data: any,
): data is R extends true ? Required<ContactForms> : ContactForms => {
  if (
    data.name &&
    data.email &&
    data.message &&
    data?._type === 'contactForms'
  ) {
    return true;
  }
  return false;
};

export default {};
