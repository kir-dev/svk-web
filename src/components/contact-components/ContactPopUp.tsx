import { PopUp } from '~/components/contact-components/PopUp'
import { ContactForm } from '~/components/contact-components/ContactForm'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export const ContactPopUp = ({ children }: Props) => {
  return (
    <PopUp button={children}>
      <ContactForm
        closeModal={() => {
          //Todo
        }}
      />
    </PopUp>
  )
}
