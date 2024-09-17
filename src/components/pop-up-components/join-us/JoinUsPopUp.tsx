import { PopUp } from '~/components/pop-up-components/PopUp'
import React, { useEffect, useState } from 'react'
import { JoinUsFrom } from '~/components/pop-up-components/join-us/JoinUsForm'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export const JoinUsPopUp = ({ children }: Props) => {
  const searchParams = useSearchParams()

  const t = useTranslations('common.joinUs')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!searchParams || typeof window === 'undefined') {
      return
    }
    const modalParams = searchParams.get('modal')
    if (!isOpen && modalParams == 'joinus') {
      setIsOpen(true)
    }
  }, [isOpen, searchParams])

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
