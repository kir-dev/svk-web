import { groq, SanityClient } from 'next-sanity'
import { Member } from '../sanity.types'

const timeBetweenRevalidations: number = 30 //24 * 60 * 60

const membersQuery = groq`*[_type == 'member'] {name, position, picture, slug}`

export async function getMembers(client: SanityClient): Promise<Member[]> {
  return await client.fetch(
    membersQuery,
    {},
    {
      next: { revalidate: timeBetweenRevalidations },
    },
  )
}

export const getMemberBySlug = async (
  client: SanityClient,
  slug: string,
): Promise<Member | undefined> => {
  try {
    const memberBySlugQuery = groq`*[_type == 'member' && slug.current == '${slug}' ]{name, position, description, picture, slug}`
    const response = await client.fetch(
      memberBySlugQuery,
      {},
      {
        next: { revalidate: timeBetweenRevalidations },
      },
    )

    if (Array.isArray(response)) {
      if (response.length > 0) {
        return response[0]
      }
      return undefined
    }
    return response
  } catch (e) {
    console.error(e)
  }
}
