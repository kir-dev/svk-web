import React, { Fragment, useState } from 'react'
import { ConnectWithUsFormField } from '~/components/connect-with-us-components/ConnectWithUsFormField'

export const ConnectWithUsPopUp = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Fragment>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-teal-300 text-white p-3"
      >
        Kapcsolat
      </button>
      <div
        className={`border-none bg-none w-max h-max ${isOpen ? 'visible' : 'invisible'}`}
      >
        <div
          className={`w-screen h-screen backdrop-blur-2xl fixed inset-0 transition ease-out duration-300 ${isOpen ? 'bg-opacity-25' : 'bg-opacity-0'}`}
        >
          <div
            className={`w-full md:w-3/4 lg:w-1/2 h-fit bg-cyan-700 fixed top-16 inset-x-0 mx-auto rounded-lg pt-8 my-5 shadow-md text-white transition-all duration-500 ${isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
          >
            <h1 className="text-center text-4xl font-bold">Kapcsolat</h1>
            <form onSubmit={(e) => e.preventDefault()} className="my-5">
              <div className="grid grid-cols-2">
                <ConnectWithUsFormField title="Név" type="text" id="name" />
                <ConnectWithUsFormField title="Email" type="email" id="email" />
                <ConnectWithUsFormField
                  title="Telefonszám"
                  type="text"
                  id="phoneNumber"
                />
                <ConnectWithUsFormField
                  title="Cég neve"
                  type="text"
                  id="companyName"
                />
                <ConnectWithUsFormField
                  title="Titulus"
                  type="text"
                  id="title"
                />
              </div>
              <div className="p-3 px-6 w-full">
                <label htmlFor="message" className="text-md block uppercase">
                  Üzenet
                </label>
                <textarea id="message" className="w-full h-20 rounded" />
              </div>
              <div className="flex justify-around w-full">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-3 bg-white text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Mégse
                </button>
                <button
                  type="submit"
                  className="rounded-lg p-3 bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Küldés
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
