import { type SchemaTypeDefinition } from 'sanity'

import member from './schemaTypes/member'
import event from './schemaTypes/event'
import partner from './schemaTypes/partner'
import mini_carousel_image from './schemaTypes/mini_carousel_image'
import home_multi_carousel_image from './schemaTypes/home_multi_carousel_image'
import about_multi_carousel_image from './schemaTypes/about_multi_carousel_image'
import picture from './schemaTypes/picture'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    member,
    event,
    partner,
    mini_carousel_image,
    home_multi_carousel_image,
    about_multi_carousel_image,
    picture
  ],
}
