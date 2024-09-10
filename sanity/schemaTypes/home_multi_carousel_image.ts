import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home_multi_carousel_images',
  title: 'Home Multi Carousel Images',
  type: 'document',
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
  ],

  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
  },
})
