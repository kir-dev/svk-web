import React, { Fragment, useEffect, useState } from 'react'
import { ConnectWithUsFormField } from '~/components/connect-with-us-components/ConnectWithUsFormField'

export const ConnectWithUsPopUp = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [formData, setFormData] = useState<string[]>([])

  const [validFields, setValidFields] = useState<{ [key: string]: boolean }>({
    name: false,
    email: false,
    phoneNumber: false,
    companyName: false,
    title: false,
    message: false,
  })

  const fieldValidationFunctions: { [key: string]: () => void } = {
    name: () => validateName,
    email: () => validateEmail,
    phoneNumber: () => validatePhoneNumber,
    companyName: () => validateCompanyName,
    title: () => validateTitle,
    message: () => validateMessage,
  }

  const [validForm, setValidForm] = useState<boolean>(false)

  useEffect(() => {
    setValidForm(Object.values(validFields).every(Boolean))
    console.log(validFields)
  }, [validFields])

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData({ ...formData, [id]: value })
  }

  const validateName = (name: string) => {
    setValidFields((validFields) => ({
      ...validFields,
      name: !(!name && !name.trim()),
    }))
  }

  const validateEmail = (email: string) => {
    const emailRegexp =
      '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'
    setValidFields((validFields) => ({
      ...validFields,
      email: !(!email || !email.trim() || !email.match(emailRegexp)),
    }))
  }

  const validatePhoneNumber = (phoneNumber: string) => {
    console.log(phoneNumber)
    const phoneNumberRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
    setValidFields((validFields) => ({
      ...validFields,
      phoneNumber: !(
        !phoneNumber ||
        !phoneNumber.trim() ||
        !phoneNumber.match(phoneNumberRegexp)
      ),
    }))
  }

  const validateCompanyName = (companyName: string) => {
    setValidFields((validFields) => ({
      ...validFields,
      companyName: !(!companyName || !companyName.trim()),
    }))
  }
  const validateTitle = (title: string) => {
    setValidFields((validFields) => ({
      ...validFields,
      title: !(!title || !title.trim()),
    }))
  }

  const validateMessage = (message: string) => {
    setValidFields((validFields) => ({
      ...validFields,
      message: !(!message || !message.trim()),
    }))
  }

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
            <h1 className="text-center text-4xl font-bold text-gray-600">
              Kapcsolat
            </h1>
            <form onSubmit={(e) => e.preventDefault()} className="my-5">
              <div className="grid grid-cols-2">
                <ConnectWithUsFormField
                  title="Név"
                  type="text"
                  id="name"
                  onChange={(event) => {
                    handleChange(event)
                    validateName(event.target.value)
                  }}
                />
                <ConnectWithUsFormField
                  title="Email"
                  type="email"
                  id="email"
                  onChange={(event) => {
                    handleChange(event)
                    validateEmail(event.target.value)
                  }}
                />
                <ConnectWithUsFormField
                  title="Telefonszám"
                  type="text"
                  id="phoneNumber"
                  pattern="^(?:\+36|06)?\s?[1-9]\d\s?\d{3}\s?\d{3,4}$|^(?:\+36|06)?\s?((1|20|30|31|50|70|90)\d)\s?\d{3}\s?\d{3,4}$"
                  onChange={(event) => {
                    handleChange(event)
                    validatePhoneNumber(event.target.value)
                  }}
                />
                <ConnectWithUsFormField
                  title="Cég neve"
                  type="text"
                  id="companyName"
                  onChange={(event) => {
                    handleChange(event)
                    validateCompanyName(event.target.value)
                  }}
                />
                <ConnectWithUsFormField
                  title="Titulus"
                  type="text"
                  id="title"
                  onChange={(event) => {
                    handleChange(event)
                    validateTitle(event.target.value)
                  }}
                />
              </div>
              <div className="p-3 px-6 w-full">
                <label
                  htmlFor="message"
                  className="text-md block uppercase text-gray-600"
                >
                  Üzenet
                </label>
                <textarea
                  required={true}
                  id="message"
                  className="w-full h-20 rounded text-gray-600 invalid:border-red-600 border-1 valid:border-blue-500 p-1"
                  onChange={(event) => {
                    handleChange(event)
                    validateMessage(event.target.value)
                  }}
                />
              </div>
              <div className="flex justify-around w-full">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-3 bg-white border-red-600 border-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Mégse
                </button>
                <button
                  type="submit"
                  className="rounded-lg p-3 bg-white border-blue-500 border-2 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors disabled:border-gray-600 disabled:text-gray-600 disabled:bg-white"
                  onClick={() => setIsOpen(!isOpen)}
                  disabled={!validForm}
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
