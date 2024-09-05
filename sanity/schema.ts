import { type SchemaTypeDefinition } from 'sanity'

import member from './schemaTypes/member'
import lecturer from './schemaTypes/lecturer'
import event from './schemaTypes/event'
import partner from './schemaTypes/partner'
import images from './schemaTypes/images'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member, lecturer, event, partner, images],
}
