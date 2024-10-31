import { PopUp } from '~/components/pop-up-components/PopUp'
import { ContactFormFirstPage } from '~/components/pop-up-components/contact/ContactFormFirstPage'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ContactFormSecondPage } from '~/components/pop-up-components/contact/ContactFormSecondPage'
import { useModalIsOpen } from '~/lib/hooks/useModalIsOpen'

interface Props {
  isOpenOuter?: boolean
  onIsOpenChange?: (isOpen: boolean) => void
}

enum FormStates {
  Closed,
  FirstPageOpen,
  SecondPageOpen,
}

export const ContactPopUp = ({
  isOpenOuter = false,
  onIsOpenChange,
}: Props) => {
  const t = useTranslations('common.contact')
  const [modalState, setModalState] = useState<FormStates>(
    FormStates.FirstPageOpen,
  )

  const { isOpen, setIsOpen } = useModalIsOpen(isOpenOuter, onIsOpenChange)

  return (
    <PopUp title={t('mainTitle')} isOpenOuter={isOpen}>
      <div className="overflow-x-hidden">
        <div
          className={`overflow-y-hidden transition-transform duration-1000 ease-in-out " ${
            modalState === FormStates.FirstPageOpen
              ? ''
              : 'h-0 -translate-x-[100%]'
          }`}
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
        </div>
        <div
          className={`overflow-y-hidden transition-transform duration-1000 ease-in-o " ${
            modalState === FormStates.SecondPageOpen
              ? ''
              : 'h-0 translate-x-[100%]'
          }`}
        >
          {modalState === FormStates.SecondPageOpen && (
            <ContactFormSecondPage
              closeModal={() => {
                setModalState(FormStates.FirstPageOpen)
              }}
            />
          )}
        </div>
      </div>
    </PopUp>
  )
}
