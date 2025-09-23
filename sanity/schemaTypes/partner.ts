import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The name of the partner. Will be used on the partner preview if no image is provided',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      description: "This is where the user will be redirected to if they press on the company's icon",
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'The image of the partner that will appear on the',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Will be used if image is provided but failed to load'
        },
      ],
    }),
  ],

  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      return {
        title: selection.name,
      }
    },
  },
})
