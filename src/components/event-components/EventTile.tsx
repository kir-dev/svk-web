import { EventFull } from '~/lib/sanity.types'
import React, { FC, useRef, useState } from 'react'
import { EventCoverPicture } from '~/components/event-components/EventCoverPicture'
import { CalendarIcon } from '~/components/svg-components/CalendarIcon'
import { LocationIcon } from '~/components/svg-components/LocationIcon'
import { LecturerIcon } from '~/components/svg-components/LecturerIcon'
import { formatDateTime } from '~/utils/format-date-time'
import { PictureIcon } from '~/components/svg-components/PictureIcon'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { getLocalizedText } from '~/utils/getLocalizedText'
import { HamburgerIcon } from '~/components/svg-components/HamburgerIcon'
import { useIsTouchDevice } from '~/utils/hooks/useIsTouchDevice'

interface Props {
  event: EventFull
}

export const EventTile: FC<Props> = ({ event }) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const router = useRouter()
  const iconSize = 25

  const locale = useLocale()

  const title = getLocalizedText(locale, event.title, event.englishTitle)
  const lecturer = getLocalizedText(
    locale,
    event.lecturer,
    event.englishLecturer,
  )

  const isTouch = useIsTouchDevice()
  const debounceRef = useRef(false)

  return (
    <div
      className="relative transition-transform bg-black/70 rounded-md max-w-2xl overflow-hidden backdrop-blur-sm"
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => !isTouch && setHovered(false)}
    >
      {event.image && (
        <div className="relative h-full">
          <div
            className={`transition-transform cursor-pointer ${
              hovered ? '-translate-y-[40%]' : ''
            }`}
            onClick={() => {
              const path = event.externalLink || '/event/' + event.slug.current
              router.push(path)
            }}
          >
            <EventCoverPicture image={event.image} title={title} />
          </div>

          {(event.spotLink || isTouch) && (
            <div
              className={`flex items-center justify-between absolute bottom-0 right-0 m-4 gap-2 w-fit z-20 transition-transform cursor-pointer ${
                hovered ? '-translate-y-[40%]' : ''
              }`}
            >
              {event.spotLink && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(event.spotLink!!, '_blank')
                  }}
                >
                  <PictureIcon color="#3DCAB1" />
                </div>
              )}
              {isTouch && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (debounceRef.current) return
                    debounceRef.current = true

                    setHovered((prev) => !prev)

                    setTimeout(() => {
                      debounceRef.current = false
                    }, 250) // Adjust the delay to match your animation duration
                  }}
                >
                  <HamburgerIcon className={'w-[40px] h-[40px]'} />
                </button>
              )}
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
                  <h2>{lecturer}</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
