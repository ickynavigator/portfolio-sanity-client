import type { NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import MetaHead from '../../components/MetaHead';
import { postToSanity } from '../../lib/sanity';
import type { ContactForms } from '../../schema';
import type { Enhanced } from '../../types';

const Index: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [formSuc, setFormSuc] = useState(false);
  const [formErr, setFormErr] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setFormSuc(false);
    setFormErr(false);

    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.checkValidity() === true) {
      try {
        const res = await postToSanity<Enhanced<ContactForms>, ContactForms>({
          _type: 'contactForms',
          name,
          email,
          message,
        });

        if (res.status === 200) {
          setName('');
          setEmail('');
          setMessage('');
          setFormSuc(true);
        }
      } catch (error) {
        setFormErr(true);
      }
    }
  };

  useEffect(() => {
    if (formSuc) {
      setTimeout(() => {
        setFormSuc(false);
      }, 5000);
    }
  });

  useEffect(() => {
    if (formErr) {
      setTimeout(() => {
        setFormErr(false);
      }, 5000);
    }
  });
  return (
    <>
      <MetaHead title="Contact Obi Fortune" />
      <div className="my-3">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Contact Me</h1>
          {formSuc && (
            <div className="flex items-center justify-center w-full py-1 mt-3 text-green-800 bg-green-200 border-2 border-green-400 rounded">
              Message Sent Successfully
            </div>
          )}
          {formErr && (
            <div className="flex items-center justify-center w-full py-1 mt-3 text-red-800 bg-red-200 border-2 border-red-400 rounded">
              There was an issue please try again
            </div>
          )}
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full mt-3 md:w-4/5"
          >
            <div className="inputGroup">
              <label htmlFor="Name">Name</label>
              <input
                required
                minLength={5}
                className="inputBox"
                type="text"
                name="Name"
                id="Name"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="Email">Email</label>
              <input
                required
                minLength={5}
                className="inputBox"
                type="text"
                name="Email"
                id="Email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="Message">Message</label>
              <textarea
                required
                className="inputBox"
                name="Message"
                id="Message"
                rows={5}
                minLength={10}
                maxLength={300}
                placeholder="Enter Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <input
              type="submit"
              className="mt-3 text-gray-500 border border-gray-500 rounded btn hover:bg-gray-500 hover:text-white"
              value="Send"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
