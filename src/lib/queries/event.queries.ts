import { groq, SanityClient } from 'next-sanity'
import { EventFull, EventPreview, EventSummary } from '~/lib/sanity.types'

export const currentEventsPreview = groq`*[_type == event && datetime > now()] {title, datetime, image,slug}`

const tags: string[] = ['event']

export const getCurrentEventsPreview = async (
  client: SanityClient,
): Promise<EventPreview[]> => {
  return await client.fetch(
    currentEventsPreview,
    {},
    { cache: 'force-cache', next: { tags } },
  )
}

export const currentEventsSummary = groq`*[_type == 'event' && datetime > now()]{_id, title, datetime, image, spotLink, externalLink, slug}`

export const getCurrentEventsSummary = async (
  client: SanityClient,
): Promise<EventSummary[]> => {
  return await client.fetch(
    currentEventsSummary,
    {},
    { cache: 'force-cache', next: { tags } },
  )
}

export const previousEventsSummary = groq`*[_type == 'event' && datetime < now()]{_id, title, datetime, image, spotLink, externalLink, slug}`

export const getPreviousEventsSummary = async (
  client: SanityClient,
): Promise<EventSummary[]> => {
  return await client.fetch(
    previousEventsSummary,
    {},
    { cache: 'force-cache', next: { tags } },
  )
}

export const currentEvents = groq`*[_type == 'event' && datetime > now()]{title, datetime, image, spotLink, externalLink, location, lecturer, slug}`

export const getCurrentEvents = async (
  client: SanityClient,
): Promise<EventFull[]> => {
  return await client.fetch(
    currentEvents,
    {},
    { cache: 'force-cache', next: { tags } },
  )
}

export const previousEvents = groq`*[_type == 'event' && datetime < now()]{title, datetime, image, description, spotLink, externalLink, exportLink, location, host, lecturer, slug}`

export const getPreviousEvents = async (
  client: SanityClient,
): Promise<EventFull[]> => {
  return await client.fetch(
    previousEvents,
    {},
    { cache: 'force-cache', next: { tags } },
  )
}

export const eventSlugsQuery = groq`
*[_type == "event" && defined(slug.current)][].slug.current
`

export const getEventBySlug = async (
  client: SanityClient,
  slug: string,
): Promise<EventFull | undefined> => {
  try {
    const eventBySlug = groq`*[_type == 'event' && slug.current == '${slug}' ]{title, datetime, image, description, spotLink, externalLink, exportLink, location, host, lecturer, slug}`
    const response = await client.fetch(
      eventBySlug,
      {},
      { cache: 'force-cache', next: { tags } },
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
