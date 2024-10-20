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
    return null
  }

  return (
    <PopUp
      button={children}
      title={t('mainTitle')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="overflow-x-hidden">
        <div
          className={`overflow-y-hidden transition-transform duration-1000 ease-in-out " ${
            modalState === FormStates.FirstPageOpen
              ? ''
              : 'h-0 -translate-x-[100%]'
          }`}
        >
          <ContactFormFirstPage
            closeModal={() => {
              setIsOpen(false)
            }}
            submit={() => {
              setModalState(FormStates.SecondPageOpen)
            }}
          />
        </div>
        <div
          className={`overflow-y-hidden transition-transform duration-1000 ease-in-o " ${
            modalState === FormStates.SecondPageOpen
              ? ''
              : 'h-0 translate-x-[100%]'
          }`}
        >
          <ContactFormSecondPage
            closeModal={() => {
              setModalState(FormStates.FirstPageOpen)
            }}
          />
        </div>
      </div>
    </PopUp>
  )
}
