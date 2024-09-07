import { PopUp } from '~/components/pop-up-components/PopUp'
import { ContactForm } from '~/components/pop-up-components/contact/ContactForm'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  children: React.ReactNode
}

export const ContactPopUp = ({ children }: Props) => {
  const t = useTranslations('common.contact')
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PopUp
      button={children}
      title={t('mainTitle')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <ContactForm
        closeModal={() => {
          setIsOpen(false)
        }}
      />
    </PopUp>
  )
}
