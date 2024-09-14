import { groq, SanityClient } from 'next-sanity'
import { EventFull, EventPreview, EventSummary } from '~/lib/sanity.types'

export const eventsTitleAndID = groq`*[_type == 'event']{title, _id}`

export const getEventTitles = async (
  client: SanityClient,
): Promise<EventPreview[]> => {
  return await client.fetch(eventsTitleAndID)
}

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

export const events = groq`*[_type == 'event']{title,datetime,image,description,spotLink,externalLink,exportLink,location,host,lecturer->{name, title, image}}`

export const getEvents = async (client: SanityClient): Promise<EventFull[]> => {
  return await client.fetch(events)
}
