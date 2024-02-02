import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'career',
  title: 'Career',
  type: 'document',
  fields: [
    defineField({
      name: 'careerHide',
      title: 'Hide Career',
      type: 'boolean',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Contract', value: 'Contract' },
          { title: 'Self-Employed', value: 'Self-employed' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Internship', value: 'Internship' },
          { title: 'Apprenticeship', value: 'Apprenticeship' },
          { title: 'Freelance', value: 'Freelance' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'locationType',
      title: 'Location Type',
      type: 'string',
      options: {
        list: [
          { title: 'On-site', value: 'On-site' },
          { title: 'Hybrid', value: 'Hybrid' },
          { title: 'Remote', value: 'Remote' },
        ],
        layout: 'dropdown',
      },
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      //   codegen: { required: true },
      //   validation: Rule => Rule.required(),
      options: { hotspot: true },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'skillTags',
      title: 'Skills',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
      codegen: { required: true },
      validation: Rule => Rule.unique(),
    }),
  ],

  initialValue: () => ({
    careerHide: false,
    employmentType: 'Full-time',
    locationType: 'On-site',
    startDate: new Date().toISOString().split('T')[0],
  }),

  preview: {
    select: {
      title: 'name',
      media: 'companyLogo',
    },
  },
});
