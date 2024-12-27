import { PopUp } from '~/components/pop-up-components/PopUp'
import React from 'react'
import { JoinUsFrom } from '~/components/pop-up-components/join-us/JoinUsForm'
import { useTranslations } from 'next-intl'
import { useModalIsOpen } from '~/lib/hooks/useModalIsOpen'

interface Props {
  isOpenOuter?: boolean
  onIsOpenChange?: (isOpen: boolean) => void
}

export const JoinUsPopUp = ({ isOpenOuter = false, onIsOpenChange }: Props) => {
  const t = useTranslations('common.joinUs')

  const { isOpen, setIsOpen } = useModalIsOpen(isOpenOuter, onIsOpenChange)

  return (
    <PopUp title={t('mainTitle')} isOpenOuter={isOpen}>
      <JoinUsFrom
        closeModal={() => {
          setIsOpen(false)
        }}
      />
    </PopUp>
  )
}
