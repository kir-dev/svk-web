import { Picture } from '~/lib/sanity.types'
import { groq, SanityClient } from 'next-sanity'

const timeBetweenRevalidations: number = 24 * 60 * 60

const aboutUsBackgroundQuery = groq`*[_type == 'picture' && title == 'About Us Background'][0] {_id, title, image}`

export const getAboutUsBackground = async (
  client: SanityClient,
): Promise<Picture> => {
  const result = await client.fetch(
    aboutUsBackgroundQuery,
    {},
    {
      next: { revalidate: timeBetweenRevalidations },
    },
  )
  if (result == null) {
    throw new Error('No picture found')
  }
  return result
}
