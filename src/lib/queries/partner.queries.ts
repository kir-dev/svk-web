import { Partner } from '~/lib/sanity.types'
import { groq, SanityClient } from 'next-sanity'

const timeBetweenRevalidations: number = 30 //24 * 60 * 60

const partnerQueries = groq`*[_type == 'partner'] {_id, name,link,image}`

export const getPartners = async (client: SanityClient): Promise<Partner[]> => {
  return await client.fetch(
    partnerQueries,
    {},
    {
      next: { revalidate: timeBetweenRevalidations },
    },
  )
}
