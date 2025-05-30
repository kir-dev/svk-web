import { PopUp } from '~/components/pop-up-components/PopUp'
import React from 'react'
import { useTranslations } from 'next-intl'
import { useModalIsOpen } from '~/lib/hooks/useModalIsOpen'
import { EventApplicationForm } from '~/components/pop-up-components/event-application/EventApplicationForm'

interface Props {
  isOpenOuter?: boolean
  onIsOpenChange?: (isOpen: boolean) => void
  eventName: string
}

export const EventApplicationPopUp = ({
  isOpenOuter = false,
  onIsOpenChange,
  eventName,
}: Props) => {
  const t = useTranslations('events.form')

  const { isOpen, setIsOpen } = useModalIsOpen(isOpenOuter, onIsOpenChange)

  return (
    <PopUp title={t('mainTitle')} isOpenOuter={isOpen}>
      <EventApplicationForm
        closeModal={() => {
          setIsOpen(false)
        }}
        eventName={eventName}
      />
    </PopUp>
  )
}
