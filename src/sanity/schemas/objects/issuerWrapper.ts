import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'issuerWrapper',
  title: 'Issuer Wrapper',
  type: 'object',
  fields: [
    defineField({ title: 'Issuer Name', name: 'name', type: 'string' }),
    defineField({ title: 'Issuer Link', name: 'link', type: 'url' }),
  ],
});
