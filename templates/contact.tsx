import { ContactForms } from '../schema';

interface IEmailContact extends ContactForms {}

export const EmailContact = ({ name, email, message }: IEmailContact) => {
  return (
    <>
      {name} has sent you a mail. They attached the email - {email}
      <br />
      {message}
    </>
  );
};

export default EmailContact;
