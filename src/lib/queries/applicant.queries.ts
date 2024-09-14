import { groq, SanityClient } from 'next-sanity'
import { Applicant } from '~/lib/sanity.types'

export const applyForEvent = async (
  client: SanityClient,
  applicant: Applicant,
) => {
  return await client.create(applicant)
}

export const getApplicantsForEvent = async (
  client: SanityClient,
  eventID: string,
): Promise<Applicant[]> => {
  return await client.fetch(
    groq`*[_type == 'applicant' && eventID == '${eventID}']{name,email}`,
  )
}
