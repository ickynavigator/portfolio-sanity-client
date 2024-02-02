import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'socialLink',
  title: 'Social Media Link',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Social Media Name',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Social Media Link',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'react-icons icon name',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
  ],
});
