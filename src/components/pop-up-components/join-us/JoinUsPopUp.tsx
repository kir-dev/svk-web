import { PopUp } from '~/components/pop-up-components/PopUp'
import React from 'react'
import { JoinUsFrom } from '~/components/pop-up-components/join-us/JoinUsForm'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { usePopUpControl } from '~/lib/hooks/usePopUpControl'

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
  const searchParams = useSearchParams()

  const t = useTranslations('common.joinUs')

  const { isOpen, setIsOpen } = usePopUpControl({
    isOpenInit: isOpenInit,
    onIsOpenChange: onIsOpenChange,
  })

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
