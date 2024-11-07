import Layout from '~/components/Layout'
import { getCurrentEvents, getPreviousEvents } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import { InferGetStaticPropsType } from 'next'
import { EventTile } from '~/components/event-components/EventTile'
import { LargeEventGrid } from '~/components/event-components/LargeEventGrid'
import { useTranslations } from 'next-intl'

export const getStaticProps = async ({ locale }) => {
  const client = getClient()
  const currentEvents = await getCurrentEvents(client)
  const previousEvents = await getPreviousEvents(client)
  return {
    props: {
      currentEvents: currentEvents,
      previousEvents: previousEvents,
      messages: (await import(`../../messages/${locale}.json`)).default,
      revalidate: 60,
    },
  }
}

export default function EventsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const currentEvents = props.currentEvents
  const previousEvents = props.previousEvents
  const t = useTranslations('Events')

  return (
    <Layout>
      <div className="w-screen justify-items-center sm:w-3/4 mx-auto">
        <h1 className="text-2xl my-8">{t('current')}</h1>
        {currentEvents.length > 0 ? (
          <LargeEventGrid currentEvents={currentEvents} />
        ) : (
          <h1 className="text-center text-2xl">{t('none')}</h1>
        )}
        <h1 className="text-2xl my-10">{t('past')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-sm mb-[10%]">
          {previousEvents.map((event) => (
            <EventTile key={event._id} eventSummary={event} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
