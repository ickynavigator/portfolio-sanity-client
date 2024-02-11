import { defineField, defineType } from '@sanity-typed/types';
import CheckIcon from '../components/checkIcon';

export default defineType({
  name: 'contactForms',
  title: 'Contact Forms',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text' }),
    defineField({ name: 'reviewed', title: 'Reviewed', type: 'boolean' }),
  ],

  initialValue: () => ({
    reviewed: false,
  }),

  preview: {
    select: {
      name: 'name',
      email: 'email',
      status: 'reviewed',
    },
    prepare: ({ name, email, status }) => {
      return { title: name, subtitle: email, media: CheckIcon({ status }) };
    },
  },
});
