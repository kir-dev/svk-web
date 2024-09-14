import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'applicant',
  title: 'Applicant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventID',
      title: 'Event ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      return {
        ...selection,
        title: selection.name,
      }
    },
  },
})
