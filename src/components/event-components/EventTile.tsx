import { EventFull } from '~/lib/sanity.types'
import { EventCoverPicture } from '~/components/event-components/EventCoverPicture'
import { CalendarIcon } from '~/components/svg-components/CalendarIcon'
import { PictureIcon } from '~/components/svg-components/PictureIcon'
import { DocumentIcon } from '~/components/svg-components/DocumentIcon'
import { IconBox } from '~/components/event-components/IconBox'
import { CalendarAndClockIcon } from '~/components/svg-components/CalendarAndClockIcon'
import { LocationIcon } from '~/components/svg-components/LocationIcon'
import { LecturerIcon } from '~/components/svg-components/LecturerIcon'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import { DateTime } from 'groq-js'
import { ApplyForEventPopUp } from '~/components/pop-up-components/applyForEvent/ApplyForEventPopUp'
import { FC, useState } from 'react'

interface Props {
  eventFull: EventFull
  active: boolean
}

export const EventTile: FC<Props> = ({ eventFull, active }) => {
  const [hovered, setHovered] = useState<boolean>(false)

  function formatDateTime(datetime: DateTime): String {
    return datetime
      .toString()
      .substring(0, 16)
      .replace('T', ' ')
      .replaceAll('-', '.')
  }

  return (
    <div
      className={`relative transition-all bg-gray-900  rounded-md max-w-2xl overflow-hidden ${hovered ? 'md:scale-105 ' : ''} `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {eventFull.image && (
        <div
          className={`transition-all relative z-10 ${hovered ? '-translate-y-[105%]' : ''}`}
        >
          <EventCoverPicture image={eventFull.image} title={eventFull.title} />
          <div className="absolute bottom-0 right-0 left-0 w-full">
            <ChevronUpIcon className="w-10 mx-auto" />
          </div>
        </div>
      )}

      <div
        className={`absolute transition-all bottom-0 left-0 top-0 right-0 ${hovered ? 'px-10' : 'px-0'} `}
      >
        <h1
          className={`transition-all  my-5 text-center ${hovered ? 'text-xl' : 'text-sm'} `}
        >
          {eventFull.title}
        </h1>
        {eventFull.datetime && (
          <div className="flex flex-nowrap justify-between my-2">
            <div>
              <CalendarAndClockIcon />
            </div>
            <div>
              <span className="text-lg mt-5">
                {formatDateTime(eventFull.datetime)}
              </span>
            </div>
          </div>
        )}
        {eventFull.location && (
          <div className="flex flex-nowrap justify-between my-2">
            <div>
              <LocationIcon />
            </div>
            <div>
              <span className=" text-lg mt-5">{eventFull.location}</span>
            </div>
          </div>
        )}

        {eventFull.lecturer?.name && (
          <div className="flex flex-nowrap justify-between my-2">
            <div>
              <LecturerIcon />
            </div>
            <div>
              <span className="text-lg mt-5">{eventFull.lecturer.name}</span>
            </div>
          </div>
        )}
      </div>

      <div
        className={`transition-all grid grid-cols-[80%_20%]  text-white p-4`}
      >
        <div>
          <p className="text-justify">{eventFull.description}</p>
        </div>
        <div className="grid grid-rows-3 gap-2 p-2 lg:px-0 justify-self-end">
          {eventFull.externalLink && (
            <IconBox title="Link az esményre" url={eventFull.externalLink}>
              <CalendarIcon />
            </IconBox>
          )}
          {eventFull.spotLink && (
            <IconBox title="Link a Spot albumhoz" url={eventFull.spotLink}>
              <PictureIcon />
            </IconBox>
          )}
          {eventFull.exportLink && (
            <IconBox title="ICS export" url={eventFull.exportLink}>
              <DocumentIcon />
            </IconBox>
          )}
        </div>
      </div>
      <div
        className={`transition-all flex justify-center mb-5 ${hovered ? 'scale-x-100 opacity-100' : '-scale-x-75 opacity-0'}`}
      >
        {active && (
          <ApplyForEventPopUp eventID={eventFull._id}>
            <h1
              className={`rounded p-2 ${hovered ? 'bg-cyan-700' : 'bg-gray-900'}`}
            >
              Jelentkezés
            </h1>
          </ApplyForEventPopUp>
        )}
      </div>
    </div>
  )
}
