import { Partner } from '~/lib/sanity.types'
import { SanityClient } from 'next-sanity'

export const partnerQueries = `*[_type == 'partner'] {_id, name,link,image}`

export const getPartners = async (client: SanityClient): Promise<Partner[]> => {
  return await client.fetch(
    partnerQueries,
    {},
    {
      next: {
        revalidate: 60,
      },
    },
  )
}
