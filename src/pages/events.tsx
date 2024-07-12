import Layout from '~/components/Layout'
import { Button } from '@nextui-org/react'
import { getCurrentEventsSummary, getEvents } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import { InferGetStaticPropsType } from 'next'
import { EventTile } from '~/components/event-components/EventTile'

export const getStaticProps = async ({ locale }) => {
  const client = getClient()
  const events = await getCurrentEventsSummary(client)
  return {
    props: {
      events: events,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function EventsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const events = props.events
  return (
    <Layout>
      <h1>Aktualis Esemenyek</h1>
      <div className="flex flex-wrap justify-center p-5 gap-5">
        <Button>Esemeny</Button>
        <Button>Esemeny</Button>
      </div>
      <h1>Korabbi Esemenyek</h1>
      <div className="flex flex-wrap justify-center p-5 gap-5">
        {events.map((event) => (
          <EventTile key={event._id} eventSummary={event} />
        ))}
      </div>
    </Layout>
  )
}
