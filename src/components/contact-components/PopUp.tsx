import React, { Fragment, useState } from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  children: React.ReactNode
  button: React.ReactNode
}

export const PopUp = ({ children, button }: Props) => {
  const tc = useTranslations('common.contact')

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Fragment>
      <button onClick={() => setIsOpen(!isOpen)}>{button}</button>
      <div
        className={`border-none bg-none w-max h-max ${isOpen ? 'visible' : 'invisible'}`}
      >
        <div
          className={`w-screen h-screen bg-black fixed inset-0 z-50 transition ease-out duration-300 ${isOpen ? 'bg-opacity-80' : 'bg-opacity-0'}`}
        >
          <div
            className={`w-full md:w-3/4 lg:w-1/2 max-h-screen h-auto bg-white fixed inset-x-0 mx-auto rounded-lg py-8 pb-32  md:pb-8 my-5 shadow-md text-white transition-all duration-500 overflow-y-auto ${isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
          >
            <h1 className="text-center text-4xl font-bold text-gray-600">
              {tc('mainTitle')}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
