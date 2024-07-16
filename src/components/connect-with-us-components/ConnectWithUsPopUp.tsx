import React, { Fragment, useState } from 'react'
import { ConnectWithUsForm } from '~/components/connect-with-us-components/ConnectWithUsForm'
import { ContactSubmissionIndicator } from '~/components/connect-with-us-components/ContactSubmissionIndicator'

export const ConnectWithUsPopUp = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(true)

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
          className={`w-screen h-screen backdrop-blur-2xl bg-gray-500 fixed inset-0 transition ease-out duration-300 ${isOpen ? 'bg-opacity-25' : 'bg-opacity-0'}`}
        >
          <div
            className={`w-full md:w-3/4 lg:w-1/2 h-fit bg-white fixed top-16 inset-x-0 mx-auto rounded-lg pt-8 my-5 shadow-md text-white transition-all duration-500 ${isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
          >
            <div className={`${isSubmitted ? 'opacity-100' : 'opacity-0'}`}>
              <ContactSubmissionIndicator isSuccess={isSuccess} />
            </div>

            <h1 className="text-center text-4xl font-bold text-gray-600">
              Kapcsolat
            </h1>
            <ConnectWithUsForm
              closeModal={() => setIsOpen(false)}
              setSuccess={setIsSuccess}
              setSubmitted={setIsSubmitted}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
