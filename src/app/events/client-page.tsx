'use client'

import { useTranslations } from 'next-intl'
import { LargeEventGrid } from '~/components/event-components/LargeEventGrid'
import { EventTile } from '~/components/event-components/EventTile'

export const EventsPageContent = ({ currentEvents, previousEvents }) => {
  const t = useTranslations('events')

  return (
    <>
      <h1 className="text-2xl my-8">{t('current')}</h1>
      {currentEvents.length > 0 ? (
        <LargeEventGrid currentEvents={currentEvents} />
      ) : (
        <h1 className="text-center text-2xl">{t('none')}</h1>
      )}
      <h1 className="text-2xl my-10">{t('past')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-sm mb-[10%]">
        {previousEvents.map((event) => (
          <EventTile key={event._id} event={event} />
        ))}
      </div>
    </>
  )
}
