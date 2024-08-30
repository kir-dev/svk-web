import { groq, SanityClient } from 'next-sanity'
import { Member } from '../sanity.types'

export const membersQuery = groq`*[_type == 'member'] {name,position,description,linkedIn,picture}`

export async function getMembers(client: SanityClient): Promise<Member[]> {
  return await client.fetch(membersQuery)
}
