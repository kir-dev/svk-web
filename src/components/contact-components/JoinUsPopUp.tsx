import { PopUp } from '~/components/contact-components/PopUp'
import React from 'react'
import { JoinUsFrom } from '~/components/contact-components/JoinUsForm'

interface Props {
  children: React.ReactNode
}

export const JoinUsPopUp = ({ children }: Props) => {
  return (
    <PopUp button={children}>
      <JoinUsFrom
        closeModal={() => {
          //Todo
        }}
      />
    </PopUp>
  )
}
