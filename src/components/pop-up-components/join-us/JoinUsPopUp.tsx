import { PopUp } from '~/components/pop-up-components/PopUp'
import React, { useEffect, useState } from 'react'
import { JoinUsFrom } from '~/components/pop-up-components/join-us/JoinUsForm'
import { useTranslations } from 'next-intl'

interface Props {
  children: React.ReactNode
  isOpenInit?: boolean
  onIsOpenChange?: (isOpen: boolean) => void
}

export const JoinUsPopUp = ({
  children,
  isOpenInit = false,
  onIsOpenChange,
}: Props) => {
  const t = useTranslations('common.joinUs')

  const [isOpen, setIsOpen] = useState<boolean>(isOpenInit)

  useEffect(() => {
    setIsOpen(isOpenInit)
  }, [isOpenInit])

  useEffect(() => {
    if (onIsOpenChange) {
      onIsOpenChange(isOpen)
    }
  }, [isOpen, onIsOpenChange])

  return (
    <PopUp
      button={children}
      title={t('mainTitle')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <JoinUsFrom
        closeModal={() => {
          setIsOpen(false)
        }}
      />
    </PopUp>
  )
}
