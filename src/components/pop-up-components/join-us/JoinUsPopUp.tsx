import { PopUp } from '~/components/pop-up-components/PopUp'
import React, { useState } from 'react'
import { JoinUsFrom } from '~/components/pop-up-components/join-us/JoinUsForm'
import { useTranslations } from 'next-intl'

interface Props {
  children: React.ReactNode
}

export const JoinUsPopUp = ({ children }: Props) => {
  const t = useTranslations('common.joinUs')
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PopUp
      button={children}
      title={t('mainTitle')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <JoinUsFrom closeModal={() => setIsOpen(false)} />
    </PopUp>
  )
}
