import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  title: string
  children: React.ReactNode
  button: React.ReactNode
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const PopUp = ({
  title,
  children,
  button,
  isOpen,
  setIsOpen,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>{button}</button>
      {isMounted &&
        createPortal(
          <div
            className={`border-none bg-none w-max h-max fixed inset-0 z-50 ${
              isOpen ? 'visible' : 'invisible'
            }`}
          >
            <div
              className={`w-screen h-screen bg-black fixed inset-0 transition ease-out duration-300 ${
                isOpen ? 'bg-opacity-80' : 'bg-opacity-0'
              }`}
              onClick={() => setIsOpen(false)}
            />
            <div
              className={`w-full md:w-3/4 lg:w-1/2 max-h-screen h-auto bg-slate-800 fixed inset-x-0 mx-auto rounded-lg py-8 pb-32 md:pb-8 my-5 text-white transition-all duration-500 overflow-y-auto ${
                isOpen
                  ? 'scale-100 opacity-100'
                  : 'scale-125 opacity-0 pointer-events-none'
              }`}
            >
              <h1 className="text-center text-4xl font-bold text-white">
                {title}
              </h1>
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
