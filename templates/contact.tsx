import { ContactForms } from '../schema';

interface IEmailContact extends ContactForms {}

export const EmailContact = ({ name, email, message }: IEmailContact) => {
  const dryrun = process.env.NODE_ENV !== 'production';

  return (
    <>
      {dryrun && <>This is a dryrun</>}
      <br />
      {name} has sent you a mail. They attached the email - {email}
      <br />
      {message}
    </>
  );
};

export default EmailContact;
