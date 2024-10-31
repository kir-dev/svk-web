import React from 'react'

interface Props {
  title: string
  children: React.ReactNode
  isOpenOuter: boolean
}

export const PopUp = ({ title, children, isOpenOuter }: Props) => {
  return (
    <div
      className={`border-none bg-none w-max h-max ${isOpenOuter ? 'visible' : 'invisible'}`}
    >
      <div
        className={`w-screen h-screen bg-black fixed inset-0 z-50 transition ease-out duration-300 ${isOpenOuter ? 'bg-opacity-80' : 'bg-opacity-0'}`}
      >
        <div
          className={`w-full md:w-3/4 lg:w-1/2 max-h-screen h-auto bg-slate-800 fixed inset-x-0 mx-auto rounded-lg py-8 pb-32  md:pb-8 my-5 text-white transition-all duration-500 overflow-y-auto ${isOpenOuter ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        >
          <h1 className="text-center text-4xl font-bold text-white">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}
