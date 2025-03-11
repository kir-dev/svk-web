import { getClient } from '~/lib/sanity.client'
import { getCurrentEvents, getPreviousEvents } from '~/lib/queries'
import { EventsPageContent } from '~/app/events/client-page'
import Layout from '~/components/Layout'

export default async function EventsPage() {
  const client = getClient()
  const currentEvents = await getCurrentEvents(client)
  const previousEvents = await getPreviousEvents(client)

  return (
    <Layout>
      <div className="w-screen justify-items-center sm:w-3/4 mx-auto">
        <EventsPageContent
          currentEvents={currentEvents}
          previousEvents={previousEvents}
        />
      </div>
    </Layout>
  )
}
