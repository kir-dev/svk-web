import { Picture } from '~/lib/sanity.types'
import { SanityClient } from 'next-sanity'

const images = `*[_type == 'mini_carousel_image'] {_id, title, image}`
const homeMultiCarouselQueries = `*[_type == 'home_multi_carousel_images'] {_id, title, image}`
const aboutMultiCarouselQueries = `*[_type == 'about_multi_carousel_images'] {_id, title, image}`

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
