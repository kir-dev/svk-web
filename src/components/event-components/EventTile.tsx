import { EventFull } from '~/lib/sanity.types'
import React, { FC, useState } from 'react'
import { EventCoverPicture } from '~/components/event-components/EventCoverPicture'
import { CalendarIcon } from '~/components/svg-components/CalendarIcon'
import { LocationIcon } from '~/components/svg-components/LocationIcon'
import { LecturerIcon } from '~/components/svg-components/LecturerIcon'
import { formatDateTime } from '~/utils/format-date-time'
import { PictureIcon } from '~/components/svg-components/PictureIcon'
import { useRouter } from 'next/navigation'

interface Props {
  event: EventFull
}

export const EventTile: FC<Props> = ({ event }) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const router = useRouter()
  const iconSize = 25

  return (
    <div
      className="relative transition-transform bg-gray-900 rounded-md max-w-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        const path = event.externalLink || '/event/' + event.slug.current
        router.push(path)
      }}
    >
      {event.image && (
        <div className="relative h-full">
          <div
            className={`transition-transform ${
              hovered ? '-translate-y-[40%]' : ''
            }`}
          >
            <EventCoverPicture image={event.image} title={event.title} />
            <h1 className="my-5 mx-3 text-2xl">{event.title}</h1>
          </div>

          {event.spotLink && (
            <div
              className={`absolute bottom-0 right-0 m-4 w-fit z-10 transition-transform ${hovered ? '-translate-y-[40%]' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                window.open(event.spotLink!!, '_blank')
              }}
            >
              <PictureIcon color="#3DCAB1" />
            </div>
          )}

          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-transform ${
              hovered ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="flex flex-col space-y-2">
              {event.datetime && (
                <div className="flex flex-row flex-nowrap space-x-2">
                  <CalendarIcon
                    width={iconSize}
                    height={iconSize}
                    color="#3DCAB1"
                  />
                  <h2>{formatDateTime(event.datetime)}</h2>
                </div>
              )}
              {event.location && (
                <div className="flex flex-row flex-nowrap space-x-2">
                  <LocationIcon width={iconSize} height={iconSize} />
                  <h2 className="text-sm">{event.location}</h2>
                </div>
              )}
              {event.lecturer && (
                <div className="flex flex-row flex-nowrap space-x-2">
                  <LecturerIcon width={iconSize} height={iconSize} />
                  <h2>{event.lecturer}</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
