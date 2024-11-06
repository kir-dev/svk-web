import { Picture } from '~/lib/sanity.types'
import { groq, SanityClient } from 'next-sanity'

const aboutUsBackgroundQuery = groq`*[_type == 'picture' && title == 'About Us Background'][0] {_id, title, image}`

export const getAboutUsBackground = async ( client: SanityClient): Promise<Picture> => {
  return await client.fetch(aboutUsBackgroundQuery)
}