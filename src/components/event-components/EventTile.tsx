import { Applicant, EventSummary } from '~/lib/sanity.types'
import { EventCoverPicture } from '~/components/event-components/EventCoverPicture'
import { CalendarIcon } from '~/components/svg-components/CalendarIcon'
import { PictureIcon } from '~/components/svg-components/PictureIcon'
import { DocumentIcon } from '~/components/svg-components/DocumentIcon'
import { IconBox } from '~/components/event-components/IconBox'
import { Button } from '@nextui-org/react'

interface Props {
  eventSummary: EventSummary
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

export const EventTile = ({ eventSummary }) => {
  return (
    <div className="bg-blue-950 rounded-md max-w-2xl ">
      {eventSummary.image && (
        <EventCoverPicture
          image={eventSummary.image}
          title={eventSummary.title}
        />
      )}
      <div className="grid grid-cols-[80%_20%] text-white p-4">
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
      <Button onClick={() => handleApplyForEvent(eventSummary)}>
        Jelentkezés
      </Button>
    </div>
  )
}
