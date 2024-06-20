import { type SchemaTypeDefinition } from 'sanity'

import member from './schemaTypes/member'
import lecturer from './schemaTypes/lecturer'
import event from './schemaTypes/event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member, lecturer, event],
}
