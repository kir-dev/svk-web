import { groq, SanityClient } from 'next-sanity'
import { client } from '../../../sanity/lib/client'
import { EventFull, EventPreview, EventSummary } from '~/lib/sanity.types'

export const currentEventsPreview = groq`*[_type == event && datetime > now()] {title, datetime, image}`

export const getCurrentEventsPreview = async (
  client: SanityClient,
): Promise<EventPreview[]> => {
  return await client.fetch(currentEventsPreview)
}

export const currentEventsSummary = groq`*[_type == 'event' && datetime > now()]{title,datetime,image,description,spotLink,externalLink,exportLink}`

export const getCurrentEventsSummary = async (
  client: SanityClient,
): Promise<EventSummary[]> => {
  return await client.fetch(currentEventsSummary)
}

export const events = groq`*[_type == 'event']{title,datetime,image,description,spotLink,externalLink,exportLink,location,host,lecturer->{name, title, image}}`

export const getEvents = async (client: SanityClient): Promise<EventFull[]> => {
  return await client.fetch(events)
}
