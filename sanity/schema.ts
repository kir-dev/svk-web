import { type SchemaTypeDefinition } from 'sanity'

import member from './schemaTypes/member'
import event from './schemaTypes/event'
import partner from './schemaTypes/partner'
import picture from './schemaTypes/picture'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member, event, partner, picture],
}
