import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'urlWrapper',
  title: 'URL Wrapper',
  type: 'object',
  fields: [
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({ title: 'Hide URL', name: 'visibility', type: 'boolean' }),
  ],

  initialValue: () => ({
    visibility: false,
  }),
});
