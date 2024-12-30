import { Picture } from '~/lib/sanity.types'
import { groq, SanityClient } from 'next-sanity'

const images = groq`*[_type == 'mini_carousel_image'] {_id, title, image}`
const homeMultiCarouselQueries = groq`*[_type == 'home_multi_carousel_images'] {_id, title, image}`
const aboutMultiCarouselQueries = groq`*[_type == 'about_multi_carousel_images'] {_id, title, image}`

export const getMiniCarouselImages = async (
  client: SanityClient,
): Promise<Picture[]> => {
  return await client.fetch(images)
}

export const getHomeMultiCarouselImages = async (
  client: SanityClient,
): Promise<Picture[]> => {
  return await client.fetch(homeMultiCarouselQueries)
}

export const getAboutMultiCarouselImages = async (
  client: SanityClient,
): Promise<Picture[]> => {
  return await client.fetch(aboutMultiCarouselQueries)
}
