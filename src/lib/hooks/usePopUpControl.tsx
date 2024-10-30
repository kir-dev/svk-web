import { useEffect, useState } from 'react'

interface Props {
  isOpenInit?: boolean
  onIsOpenChange?: (isOpen: boolean) => void
}

export const usePopUpControl = ({
  isOpenInit = false,
  onIsOpenChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenInit)

  useEffect(() => {
    setIsOpen(isOpenInit)
  }, [isOpenInit])

  useEffect(() => {
    if (onIsOpenChange) {
      onIsOpenChange(isOpen)
    }
  }, [isOpen])

  return {
    isOpen,
    setIsOpen,
  }
}
