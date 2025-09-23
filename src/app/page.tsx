import React from 'react'
import { getClient } from '~/lib/sanity.client'
import { getPartners } from '~/lib/queries/partner.queries'
import { ClientHomePage } from '~/app/client-page'
import Layout from '~/components/Layout'
import {
  getCurrentEventsPreview,
  getPreviousEventsPreview,
} from '~/lib/queries'
import { EventPreview, Partner } from '~/lib/sanity.types'
import { SanityClient } from 'next-sanity'

export default async function HomePage() {
  const minimumNumberOfEvents = 3
  const client = getClient()
  const partners: Partner[] = await getPartners(client)

  const populateEventsWithPreviousOnes = async (
    events: EventPreview[],
    client: SanityClient,
  ) => {
    const previousEvents = await getPreviousEventsPreview(client)
    const numberOfEventsNeeded: number = minimumNumberOfEvents - events.length
    for (let i = 0; i < numberOfEventsNeeded; i++) {
      if (i > previousEvents.length - 1) {
        break
      }
      events.push(previousEvents[i])
    }
    return events
  }

  const getEventsForCarousel = async (client) => {
    const events: EventPreview[] = await getCurrentEventsPreview(client)
    if (events.length < minimumNumberOfEvents) {
      return populateEventsWithPreviousOnes(events, client)
    }
    return events
  }

  const events: EventPreview[] = await getEventsForCarousel(client)

  return (
    <Layout>
      <ClientHomePage partners={partners} events={events} />
    </Layout>
  )
}
