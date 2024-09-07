import { PopUp } from '~/components/contact-components/PopUp'
import { ContactForm } from '~/components/contact-components/ContactForm'
import React from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  children: React.ReactNode
}

export const ContactPopUp = ({ children }: Props) => {
  const t = useTranslations('common.contact')
  return (
    <PopUp button={children} title={t('mainTitle')}>
      <ContactForm
        closeModal={() => {
          //Todo
        }}
      />
    </PopUp>
  )
}
