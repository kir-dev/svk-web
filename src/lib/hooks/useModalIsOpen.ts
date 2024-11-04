import { useEffect, useState } from 'react'

export const useModalIsOpen = (
  isOpenOuter: boolean,
  onIsOpenChange?: (isOpen: boolean) => void,
) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenOuter)

  useEffect(() => {
    if (onIsOpenChange) {
      onIsOpenChange(isOpen)
    }
  }, [isOpen, onIsOpenChange])

  useEffect(() => {
    setIsOpen(isOpenOuter)
  }, [isOpenOuter])

  return {
    isOpen,
    setIsOpen,
  }
}
