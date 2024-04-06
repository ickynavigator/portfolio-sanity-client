import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'certificateHide',
      title: 'Hide Certificate',
      type: 'boolean',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'idx',
      title: 'Certificate ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Certificate Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'authorityName',
      title: 'Authority Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'authorityImage',
      title: 'Authority Image',
      type: 'image',
      validation: Rule => Rule.required(),
      options: { hotspot: true },
    }),
    defineField({
      name: 'startDate',
      title: 'Certificate Start Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Certificate End Date',
      type: 'date',
    }),
    defineField({
      name: 'certificateLink',
      title: 'Certificate Link',
      type: 'url',
    }),
  ],

  initialValue: () => ({
    certificateHide: false,
    startDate: new Date().toISOString().split('T')[0],
  }),

  preview: {
    select: {
      title: 'name',
      media: 'authorityImage',
    },
  },
});
