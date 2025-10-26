import { EventSummary } from '~/lib/sanity.types'
import { EventTile } from '~/components/event-components/EventTile'

interface Props {
  currentEvents: EventSummary[]
}

export const LargeEventGrid = ({ currentEvents }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40 justify-items-center">
      {currentEvents.map((event, index) => (
        <EventTile key={index} event={event} />
      ))}
    </div>
  )
}
