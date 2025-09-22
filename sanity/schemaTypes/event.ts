import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Is the event active',
      description:
        'If this field is Date Dependent the event will behave as active until the given datetime',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
          { title: 'Date Dependent', value: 'dateDependent' },
        ],
        layout: 'radio',
      },
      initialValue: 'dateDependent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'datetime',
      title: 'Datetime',
      type: 'datetime',
    }),
    defineField({
      name: 'lecturer',
      title: 'Lecturer',
      description: 'Name or estimated count',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'spotLink',
      title: 'Link of the Spot album',
      type: 'url',
    }),
    defineField({
      name: 'externalLink',
      title: 'External link',
      type: 'url',
    }),
    defineField({
      name: 'exportLink',
      title: 'ICS export link',
      type: 'url',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      description: 'description',
      image: 'image',
      spotLink: 'spotLink',
      externalLink: 'externalLink',
      exportLink: 'exportLink',
      isActive: 'isActive',
    },
  },
})
