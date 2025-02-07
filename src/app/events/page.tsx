import { getClient } from '~/lib/sanity.client'
import { getCurrentEvents, getPreviousEvents } from '~/lib/queries'
import { EventsPageContent } from '~/app/events/client-page'

export default async function EventsPage() {
  const client = getClient()
  const currentEvents = await getCurrentEvents(client)
  const previousEvents = await getPreviousEvents(client)

  return <EventsPageContent currentEvents={currentEvents} previousEvents={previousEvents} />
}

