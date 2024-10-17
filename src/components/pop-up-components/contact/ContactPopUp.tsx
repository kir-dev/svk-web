import { PopUp } from '~/components/pop-up-components/PopUp'
import { ContactFormFirstPage } from '~/components/pop-up-components/contact/ContactFormFirstPage'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ContactFormSecondPage } from '~/components/pop-up-components/contact/ContactFormSecondPage'

interface Props {
  children: React.ReactNode
}

enum FormStates {
  Closed,
  FirstPageOpen,
  SecondPageOpen,
}

export const ContactPopUp = ({ children }: Props) => {
  const t = useTranslations('common.contact')
  const [isOpen, setIsOpen] = useState(false)
  const [modalState, setModalState] = useState<FormStates>(
    FormStates.FirstPageOpen,
  )

  useEffect(() => {
    if (modalState === FormStates.Closed) {
      setIsOpen(false)
    }
  }, [modalState])

  if (modalState === FormStates.Closed) {
    return
  }

  return (
    <PopUp
      button={children}
      title={t('mainTitle')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {modalState === FormStates.FirstPageOpen && (
        <ContactFormFirstPage
          closeModal={() => {
            setIsOpen(false)
          }}
          submit={() => {
            setModalState(FormStates.SecondPageOpen)
          }}
        />
      )}
      {modalState === FormStates.SecondPageOpen && (
        <ContactFormSecondPage
          closeModal={() => {
            setModalState(FormStates.FirstPageOpen)
          }}
        />
      )}
    </PopUp>
  )
}
