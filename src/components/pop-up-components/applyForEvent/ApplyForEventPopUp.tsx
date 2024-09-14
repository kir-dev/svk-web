import { PopUp } from '~/components/pop-up-components/PopUp'
import React, { useState } from 'react'
import { ApplyForEventForm } from '~/components/pop-up-components/applyForEvent/ApplyForEventForm'

interface Props {
  children: React.ReactNode
  eventID: string
}

export const ApplyForEventPopUp = ({ children, eventID }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PopUp
      button={children}
      title="Jelentkezés"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <ApplyForEventForm
        closeModal={() => setIsOpen(false)}
        eventID={eventID}
      />
    </PopUp>
  )
}
