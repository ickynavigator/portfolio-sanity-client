import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'configuration',
  title: 'Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description:
        'The name of the website owner. Displayed in the header and the SEO info',
      codegen: { required: true },
      validation: Rule => Rule.required(),
      initialValue: 'John Doe',
    }),
    defineField({
      name: 'showOriginalSourceLink',
      title: 'Show Original Source Link',
      type: 'boolean',
      description:
        'Should a link to the original source code be shown in the portfolio',
      codegen: { required: true },
      validation: Rule => Rule.required(),
      initialValue: true,
    }),
    defineField({
      name: 'mailInfo',
      title: 'Mail Information',
      description:
        'Can leave `from` and `to` as empty strings if SMTP is not setup',
      type: 'object',
      fields: [
        defineField({
          name: 'from',
          title: 'From',
          type: 'string',
          description: 'The email address to send from',
        }),
        defineField({
          name: 'to',
          title: 'To',
          type: 'string',
          description: 'The email address to send to',
        }),
      ],
    }),
    defineField({
      name: 'PageSetup',
      title: 'Page Setup',
      description: 'Setup the pages to be displayed',
      type: 'object',
      fields: [
        defineField({
          name: 'showCareerLink',
          title: 'Show Career Link',
          type: 'boolean',
          description: 'Show career page link',
          codegen: { required: true },
          validation: Rule => Rule.required(),
          initialValue: true,
        }),
        defineField({
          name: 'showCertificateLink',
          title: 'Show Certificate Link',
          type: 'boolean',
          description: 'Show certificates page link',
          codegen: { required: true },
          validation: Rule => Rule.required(),
          initialValue: false,
        }),
        defineField({
          name: 'showContactLink',
          title: 'Show Contact Link',
          type: 'boolean',
          description: 'Show contact page link',
          codegen: { required: true },
          validation: Rule => Rule.required(),
          initialValue: true,
        }),
        defineField({
          name: 'showProjectLink',
          title: 'Show Project Link',
          type: 'boolean',
          description: 'Show projects page link',
          codegen: { required: true },
          validation: Rule => Rule.required(),
          initialValue: true,
        }),
      ],
      codegen: { required: true },
      validation: Rule => Rule.required(),
    }),
  ],
});
