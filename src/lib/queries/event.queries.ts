import { groq, SanityClient } from 'next-sanity'
import { EventFull, EventPreview, EventSummary } from '~/lib/sanity.types'

export const currentEventsPreview = groq`*[_type == event && datetime > now()] {title, datetime, image}`

export const getCurrentEventsPreview = async (
  client: SanityClient,
): Promise<EventPreview[]> => {
  return await client.fetch(currentEventsPreview)
}

export const currentEventsSummary = groq`*[_type == 'event' && datetime > now()]{_id,title,datetime,image,description,spotLink,externalLink,exportLink}`

export const getCurrentEventsSummary = async (
  client: SanityClient,
): Promise<EventSummary[]> => {
  return await client.fetch(currentEventsSummary)
}

export const previousEventsSummary = groq`*[_type == 'event' && datetime < now()]{_id,title,datetime,image,description,spotLink,externalLink,exportLink}`

export const getPreviousEventsSummary = async (
  client: SanityClient,
): Promise<EventSummary[]> => {
  return await client.fetch(previousEventsSummary)
}

export const currentEvents = groq`*[_type == 'event' && datetime > now()]{title,datetime,image,description,spotLink,externalLink,exportLink,location,host,lecturer}`

export const getCurrentEvents = async (
  client: SanityClient,
): Promise<EventFull[]> => {
  return await client.fetch(currentEvents)
}

export const previousEvents = groq`*[_type == 'event' && datetime < now()]{title,datetime,image,description,spotLink,externalLink,exportLink,location,host,lecturer}`

export const getPreviousEvents = async (
  client: SanityClient,
): Promise<EventFull[]> => {
  return await client.fetch(previousEvents)
}

export const eventSlugsQuery = groq`
*[_type == "event" && defined(slug.current)][].slug.current
`

export const getEventBySlug = async (
  client: SanityClient,
  slug: string,
): Promise<EventFull | undefined> => {
  try {
    const eventBySlug = groq`*[_type == 'event' && slug.current == '${slug}' ]{title,datetime,image,description,spotLink,externalLink,exportLink,location,host,lecturer}`
    const response = await client.fetch(eventBySlug)
    if (response.length > 0) {
      return response[0]
    }
    return response
  } catch (e) {
    console.error(e)
  }
}
