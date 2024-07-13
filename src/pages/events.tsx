import Layout from '~/components/Layout'
import {
  getCurrentEventsSummary,
  getPreviousEventsSummary,
} from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import { InferGetStaticPropsType } from 'next'
import { EventTile } from '~/components/event-components/EventTile'

export const getStaticProps = async ({ locale }) => {
  const client = getClient()
  const currentEvents = await getCurrentEventsSummary(client)
  const previousEvents = await getPreviousEventsSummary(client)
  return {
    props: {
      currentEvents: currentEvents,
      previousEvents: previousEvents,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function EventsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const currentEvents = props.currentEvents
  const previousEvents = props.previousEvents
  return (
    <Layout>
      <div className="w-screen justify-items-center sm:w-3/4 mx-auto">
        <h1 className="text-white text-2xl my-8">Aktuális eseményeink</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40 justify-items-center">
          {currentEvents.map((event) => (
            <EventTile key={event._id} eventSummary={event} />
          ))}
        </div>
        <h1 className="text-white text-2xl my-10">Korábbi eseményeink</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
          {previousEvents.map((event) => (
            <EventTile key={event._id} eventSummary={event} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
