import React from 'react'
import { getClient } from '~/lib/sanity.client'
import { getPartners } from '~/lib/queries/partner.queries'
import { ClientHomePage } from '~/app/client-page'
import Layout from '~/components/Layout'
import { getCurrentEventsPreview } from '~/lib/queries'
import { EventPreview, Partner } from '~/lib/sanity.types'

export default async function HomePage() {
  const client = getClient()
  const partners: Partner[] = await getPartners(client)
  const events: EventPreview[] = await getCurrentEventsPreview(client)

  return (
    <Layout>
      <ClientHomePage partners={partners} events={events} />
    </Layout>
  )
}
