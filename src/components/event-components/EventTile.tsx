import { EventSummary } from '~/lib/sanity.types'
import { FC } from 'react'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import { EventCoverPicture } from '~/components/event-components/EventCoverPicture'

interface Props {
  eventSummary: EventSummary
}

export const EventTile: FC<Props> = ({ eventSummary }) => {
  return (
    <div className="bg-blue-950 rounded-md max-w-2xl ">
      {eventSummary.image && (
        <EventCoverPicture
          image={eventSummary.image}
          title={eventSummary.title}
        />
      )}
      <div className="grid grid-cols-[80%_20%] px-5 py-6 text-white">
        <div>
          <p className="text-justify">{eventSummary.description}</p>
        </div>
        <div className="p-2 justify-self-end justify-items-center">
          <ul>
            <li>
              {eventSummary.externalLink && (
                <a href={eventSummary.externalLink}>Icon1</a>
              )}
            </li>
            <li>
              {eventSummary.spotLink && (
                <a href={eventSummary.spotLink}>Icon2</a>
              )}
            </li>
            <li>
              {eventSummary.exportLink && (
                <a href={eventSummary.exportLink}>Icon3</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
