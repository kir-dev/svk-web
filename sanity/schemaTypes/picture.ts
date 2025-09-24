import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'picture',
  title: 'Picture',
  type: 'document',
  description: "These pictures can be used for various things on website. Normally you don't want to add here unless you know what you are doing",
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
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
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
  },
})
