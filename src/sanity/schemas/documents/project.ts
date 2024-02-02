import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'projectHide',
      title: 'Hide Project',
      type: 'boolean',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Project Name',
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'urlWrapper',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'urlWrapper',
    }),
    defineField({
      name: 'projectIssuer',
      title: 'Project Issuer',
      type: 'issuerWrapper',
    }),
    defineField({
      name: 'externalAuthors',
      title: 'External Authors',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'author' } })],
    }),
    defineField({
      name: 'projectImage',
      title: 'Project Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
      validation: Rule => Rule.unique(),
    }),
    defineField({
      name: 'profileStatus',
      title: 'Profile Status',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Abandoned', value: 'abandoned' },
        ],
        layout: 'radio',
      },
    }),
  ],

  initialValue: () => ({
    projectHide: false,
    projectUrl: { visibility: false },
    sourceUrl: { visibility: false },
  }),

  preview: {
    select: {
      title: 'name',
      media: 'projectImage',
    },
  },
});
