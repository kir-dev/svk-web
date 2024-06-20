import { type SchemaTypeDefinition } from 'sanity'

import member from './schemaTypes/member'
import lecturer from './schemaTypes/lecturer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member, lecturer],
}
