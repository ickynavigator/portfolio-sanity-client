import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'personalInfo',
  title: 'Personal Info',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Show Job Status',
      name: 'jobVisibility',
      type: 'boolean',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'jobStatus',
      title: 'Job Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open For Hire', value: 'open' },
          { title: 'In Between Jobs', value: 'inbetween' },
          { title: 'Unavailable', value: 'close' },
        ],
        layout: 'radio',
      },
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'CV', title: 'Curriculum Vitae', type: 'file' }),
    defineField({
      name: 'CVLastUpdatedAt',
      title: 'CV Last Updated at',
      type: 'date',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })],
    }),
    defineField({
      name: 'skillTags',
      title: 'Skills',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
      validation: Rule => Rule.unique(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
