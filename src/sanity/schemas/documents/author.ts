import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Github URL',
      name: 'githubUrl',
      type: 'url',
    }),
    defineField({
      name: 'githubImage',
      title: 'Github Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'githubImage',
    },
  },
});
