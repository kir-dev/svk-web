import { PopUp } from '~/components/pop-up-components/PopUp'
import React, { useState } from 'react'
import { JoinUsFrom } from '~/components/pop-up-components/join-us/JoinUsForm'

interface Props {
  children: React.ReactNode
}

export const JoinUsPopUp = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PopUp
      button={children}
      title={'Csatlakozás'}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <JoinUsFrom closeModal={() => setIsOpen(false)} />
    </PopUp>
  )
}
