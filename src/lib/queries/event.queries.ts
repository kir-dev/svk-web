import { groq, SanityClient } from 'next-sanity'
import { EventActivitySate, EventFull, EventPreview } from '~/lib/sanity.types'

const tags: string[] = ['event']

export const currentEventsPreview = groq`*[_type == 'event' && isActive == '${EventActivitySate.active}' || (isActive == '${EventActivitySate.dateDependent}' && datetime > now())]{image,externalLink, slug}`

export const getCurrentEventsPreview = async (
  client: SanityClient,
): Promise<EventPreview[]> => {
  return await client.fetch(
    currentEventsPreview,
    {},
    {
      cache: 'no-store',
      next: { tags },
    },
  )
}

export const previousEventsPreview = groq`*[_type == 'event' &&  (isActive == '${EventActivitySate.inactive}' || (isActive == '${EventActivitySate.dateDependent}' && datetime < now()))]{image,externalLink, slug}`

export const getPreviousEventsPreview = async (
  client: SanityClient,
): Promise<EventPreview[]> => {
  return await client.fetch(
    previousEventsPreview,
    {},
    {
      cache: 'no-store',
      next: { tags },
    },
  )
}

export const currentEvents = groq`*[_type == 'event' && isActive == '${EventActivitySate.active}' || (isActive == '${EventActivitySate.dateDependent}' && datetime >= now())]{title, datetime, image, spotLink, externalLink, location, lecturer, slug, isActive}`

export const getCurrentEvents = async (
  client: SanityClient,
): Promise<EventFull[]> => {
  return await client.fetch(
    currentEvents,
    {},
    {
      cache: 'no-store',
      next: { tags },
    },
  )
}

export const previousEvents = groq`*[_type == 'event' && (isActive == '${EventActivitySate.inactive}' || (isActive == '${EventActivitySate.dateDependent}' && datetime < now()))]{title, datetime, image, description, spotLink, externalLink, exportLink, location, host, lecturer, slug, isActive}`

export const getPreviousEvents = async (
  client: SanityClient,
): Promise<EventFull[]> => {
  return await client.fetch(
    previousEvents,
    {},
    {
      cache: 'no-store',
      next: { tags },
    },
  )
}

export const getEventBySlug = async (
  client: SanityClient,
  slug: string,
): Promise<EventFull | undefined> => {
  try {
    const eventBySlug = groq`*[_type == 'event' && slug.current == '${slug}' ]{title, datetime, image, description, spotLink, externalLink, exportLink, location, host, lecturer, slug, isActive}`
    const response = await client.fetch(
      eventBySlug,
      {},
      {
        cache: 'no-store',
        next: { tags },
      },
    )

    if (Array.isArray(response)) {
      if (response.length > 0) {
        return response[0]
      }
      return undefined
    }
    return response
  } catch (e) {
    console.error(e)
  }
}
