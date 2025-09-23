import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name of the member',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'This is used for the url of the member. Must be unique!',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'position',
      title: 'Position',
      description: 'Title, rank, field, etc.',
      type: 'string',
    }),
    defineField({
      name: 'orderPriority',
      title: 'Order Priority',
      description:
        'Represents the order of the members on the page. The lower the number, the earlier it is on the list.',
      initialValue: 0,
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'The short description for the member that appears on the detailed member page',
      type: 'string',
    }),
    defineField({
      name: 'picture',
      title: 'Profile picture',
      description: 'Picture of the member',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Text that appears if the picture fails to load',
        },
      ],
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      description: 'The LinkedIn page of the member',
      type: 'url',
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
