import { SanityClient } from 'next-sanity'
import { Applicant } from '~/lib/sanity.types'

export const applyForEvent = async (
  client: SanityClient,
  applicant: Applicant,
) => {
  return await client.create(applicant)
}
