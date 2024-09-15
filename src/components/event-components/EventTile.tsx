import { EventSummary } from '~/lib/sanity.types'
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
import { Button } from '@nextui-org/react'
import { ApplyForEventPopUp } from '~/components/pop-up-components/applyForEvent/ApplyForEventPopUp'
import { ApplyForEventPopUp } from '~/components/pop-up-components/applyForEvent/ApplyForEventPopUp'

interface Props {
  eventSummary: EventFull
}

const handleApplyForEvent = async (eventSummary: EventSummary) => {
  try {
    const applicant: Applicant = {
      eventID: eventSummary._id,
      name: 'random person',
      _type: 'applicant',
    }
    const response = await fetch('/api/applyForEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(applicant),
    })

    if (!response.ok) {
      throw new Error('Failed to apply for event')
    }

    const data = await response.json()
    console.log('Event application successful:', data)
  } catch (error) {
    console.error('Error:', error)
  }
}

export const EventTile: FC<Props> = ({ eventSummary }) => {
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
      className={`relative transition-all bg-gray-900  rounded-md max-w-2xl overflow-y-hidden ${hovered ? 'md:scale-105 ' : ''} `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {eventSummary.image && (
        <div
          className={`transition-all relative z-10 ${hovered ? '-translate-y-[105%]' : ''}`}
        >
          <EventCoverPicture
            image={eventSummary.image}
            title={eventSummary.title}
          />
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
          {eventSummary.title}
        </h1>
        {eventSummary.datetime && (
          <div className="flex flex-nowrap justify-between my-2">
            <div>
              <CalendarAndClockIcon />
            </div>
            <div>
              <span className="text-lg mt-5">
                {formatDateTime(eventSummary.datetime)}
              </span>
            </div>
          </div>
        )}
        {eventSummary.location && (
          <div className="flex flex-nowrap justify-between my-2">
            <div>
              <LocationIcon />
            </div>
            <div>
              <span className=" text-lg mt-5">{eventSummary.location}</span>
            </div>
          </div>
        )}

        {eventSummary.lecturer?.name && (
          <div className="flex flex-nowrap justify-between my-2">
            <div>
              <LecturerIcon />
            </div>
            <div>
              <span className="text-lg mt-5">{eventSummary.lecturer.name}</span>
            </div>
          </div>
        )}
      </div>

      <div
        className={`transition-all grid grid-cols-[80%_20%]  text-white p-4`}
      >
        <div>
          <p className="text-justify">{eventSummary.description}</p>
        </div>
        <div className="grid grid-rows-3 gap-2 p-2 lg:px-0 justify-self-end">
          {eventSummary.externalLink && (
            <IconBox title="Link az esményre" url={eventSummary.externalLink}>
              <CalendarIcon />
            </IconBox>
          )}
          {eventSummary.spotLink && (
            <IconBox title="Link a Spot albumhoz" url={eventSummary.spotLink}>
              <PictureIcon />
            </IconBox>
          )}
          {eventSummary.exportLink && (
            <IconBox title="ICS export" url={eventSummary.exportLink}>
              <DocumentIcon />
            </IconBox>
          )}
        </div>
      </div>
      <ApplyForEventPopUp eventID={eventSummary._id}>
        <h1>Jelentkezés</h1>
      </ApplyForEventPopUp>
    </div>
  )
}
