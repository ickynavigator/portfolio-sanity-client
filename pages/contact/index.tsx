import React, { FormEvent, useState } from 'react';
import type { NextPage } from 'next';
import MetaHead from '../../components/MetaHead';

const Index: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <MetaHead title="Contact Obi Fortune" />
      <div className="my-3">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Contact Me</h1>
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
