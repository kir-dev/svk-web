import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the event',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'englishTitle',
      title: 'English Title',
      description: 'The english title of the event',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'This is used for the url of the event. Must be unique!',
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
      description: 'The location where the event will be set',
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
      description: 'The date that the event will occur on',
      type: 'datetime',
    }),
    defineField({
      name: 'lecturer',
      title: 'Lecturer',
      description: 'Name of lecturer or estimated count of the lecturers',
      type: 'string',
    }),
    defineField({
      name: 'englishLecturer',
      title: 'Name of lecturer in english',
      description:
        'Name of lecturer in english. May be left blank if estimated count of lecturers is given',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'The description that will appear in the detailed view of the event. Will not appear if you define an external link',
      type: 'string',
    }),
    defineField({
      name: 'englishDescription',
      title: 'Description in english',
      description:
        'The description that will appear in the detailed view of the event in english. Will not appear if you define an external link',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Preview image of the event',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Text that appears if the image fails to load',
        },
      ],
    }),
    defineField({
      name: 'spotLink',
      title: 'Link of the Spot album',
      description:
        'This is the link the user will go to if they press the little picture icon on the preview of the event',
      type: 'url',
    }),
    defineField({
      name: 'externalLink',
      title: 'External link',
      description:
        'If defined, this is where the user will be redirected to when they click on the event preview',
      type: 'url',
    }),
    defineField({
      name: 'exportLink',
      title: 'ICS export link',
      description: '(not currently in use)',
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
