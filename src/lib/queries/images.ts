import { Picture } from '~/lib/sanity.types'
import { groq, SanityClient } from 'next-sanity'

const images = groq`*[_type == 'mini_carousel_image'] {_id, title, image}`
const homeMultiCarouselQueries = groq`*[_type == 'home_multi_carousel_images'] {_id, title, image}`
const aboutMultiCarouselQueries = groq`*[_type == 'about_multi_carousel_images'] {_id, title, image}`

const timeBetweenRevalidations: number = 24 * 60 * 60

export const getMiniCarouselImages = async (
  client: SanityClient,
): Promise<Picture[]> => {
  return await client.fetch(
    images,
    {},
    {
      next: { revalidate: timeBetweenRevalidations },
    },
  )
}

export const getHomeMultiCarouselImages = async (
  client: SanityClient,
): Promise<Picture[]> => {
  return await client.fetch(
    homeMultiCarouselQueries,
    {},
    {
      next: { revalidate: timeBetweenRevalidations },
    },
  )
}

export const getAboutMultiCarouselImages = async (
  client: SanityClient,
): Promise<Picture[]> => {
  return await client.fetch(
    aboutMultiCarouselQueries,
    {},
    {
      next: { revalidate: timeBetweenRevalidations },
    },
  )
}
