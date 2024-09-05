import { Picture } from '~/lib/sanity.types'
import { SanityClient } from 'next-sanity'

export const imageQueries = `*[_type == 'picture'] {_id, title, image}`

export const getImages = async (client: SanityClient): Promise<Picture[]> => {
  return await client.fetch(imageQueries)
}
