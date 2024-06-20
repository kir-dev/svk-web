import { type SchemaTypeDefinition } from 'sanity'

import member from './schemaTypes/member'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [member],
}
