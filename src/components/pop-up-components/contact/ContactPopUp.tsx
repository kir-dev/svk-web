import { PopUp } from '~/components/pop-up-components/PopUp'
import { ContactFormFirstPage } from '~/components/pop-up-components/contact/ContactFormFirstPage'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ContactFormSecondPage } from '~/components/pop-up-components/contact/ContactFormSecondPage'
import { usePopUpControl } from '~/lib/hooks/usePopUpControl'

interface Props {
  children: React.ReactNode
  isOpenInit?: boolean
  onIsOpenChange?: (isOpen: boolean) => void
}

enum FormStates {
  Closed,
  FirstPageOpen,
  SecondPageOpen,
}

export const ContactPopUp = ({
  children,
  isOpenInit = false,
  onIsOpenChange,
}: Props) => {
  const t = useTranslations('common.contact')
  const [modalState, setModalState] = useState<FormStates>(
    FormStates.FirstPageOpen,
  )

  const { isOpen, setIsOpen } = usePopUpControl({
    isOpenInit: isOpenInit,
    onIsOpenChange: onIsOpenChange,
  })

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
