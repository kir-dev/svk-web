import { FormField } from '~/components/pop-up-components/FormField'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { sendContactFrom } from '~/lib/api'
import {
  ContactFieldsValidity,
  ContactFormFields,
  validateField,
} from '~/utils/form-validation'
import { useTranslations } from 'next-intl'
import { ContactSubmissionIndicator } from '~/components/pop-up-components/ContactSubmissionIndicator'
import { CircularProgress } from '@nextui-org/progress'

export interface ModalFormProps {
  closeModal: () => void
}

export const ContactFormSecondPage: React.FC<ModalFormProps> = ({
  closeModal,
}: ModalFormProps) => {
  const formInitState: ContactFormFields = {
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    title: '',
    message: '',
  }

  //Todo look for a better place for this variable
  const contactFormLocalStorageID: string = 'contactFormLocalStorageID'

  const validityInitState: ContactFieldsValidity = {
    name: true,
    email: true,
    phoneNumber: false,
    companyName: false,
    title: false,
    message: false,
  }

  const t = useTranslations('common.contact.form')
  const ti = useTranslations('common.invalidMessage')

  const [validForm, setValidForm] = useState<boolean>(false)
  const [formData, setFormData] = useState<ContactFormFields>(formInitState)
  const [validFields, setValidFields] =
    useState<ContactFieldsValidity>(validityInitState)
  const [isSuccess, setSuccess] = useState<boolean>(true)
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem(contactFormLocalStorageID)
    if (data) {
      const fields = JSON.parse(data)
      setAllFormField(fields)
    } else {
      //Todo error message
    }
  }, [])

  useEffect(() => {
    setValidForm(Object.values(validFields).every(Boolean))
  }, [validFields])

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }
  }, [isSubmitted])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateFormField(event.target)
  }

  const setAllFormField = (initValues: ContactFormFields) => {
    setFormData({ ...formData, ...initValues })
    let fieldsValidity: ContactFieldsValidity = validityInitState
    Object.entries(initValues).forEach(([id, value]) => {
      fieldsValidity[id] = validateField(id, value)
    })
    setValidFields(fieldsValidity)
  }

  const updateFormField = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    })
    setValidFields((validFields) => ({
      ...validFields,
      [id]: validateField(id, value),
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await sendContactFrom(formData)
      setSuccess(true)
      setFormData(formInitState)
      setValidFields(validityInitState)
      localStorage.removeItem(contactFormLocalStorageID)
    } catch (error) {
      setSuccess(false)
    } finally {
      setSubmitted(true)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="my-5">
      <div
        className={`transition-opacity ${isSubmitted ? 'opacity-100' : 'opacity-0'}`}
      >
        <ContactSubmissionIndicator isSuccess={isSuccess} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <FormField
          title={t('phoneNumber')}
          type="tel"
          id="phoneNumber"
          placeHolder="06012345678"
          value={formData.phoneNumber}
          pattern="^(?:\+36|06)?\s?[1-9]\d\s?\d{3}\s?\d{3,4}$|^(?:\+36|06)?\s?((1|20|30|31|50|70|90)\d)\s?\d{3}\s?\d{3,4}$"
          invalidMessage={ti('required') + '\n' + ti('phone')}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <FormField
          title={t('companyName')}
          type="text"
          id="companyName"
          placeHolder={t('exampleCompanyName')}
          invalidMessage={ti('required')}
          value={formData.companyName}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <FormField
          title={t('title')}
          type="text"
          id="title"
          placeHolder={t('exampleTitle')}
          invalidMessage={ti('required')}
          value={formData.title}
          onChange={(event) => {
            handleChange(event)
          }}
        />
      </div>
      <div className="flex justify-around w-full">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(
              contactFormLocalStorageID,
              JSON.stringify(formData),
            )
            closeModal()
          }}
          className="rounded-lg p-3 bg-white border-red-600 border-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
        >
          {t('back')}
        </button>
        <button
          type="submit"
          className="rounded-lg p-3 bg-white border-blue-500 border-2 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors disabled:border-gray-600 disabled:text-gray-600 disabled:bg-white"
          onClick={handleSubmit}
          disabled={!validForm}
        >
          {isLoading ? (
            <CircularProgress color="default" aria-label="Loading..." />
          ) : (
            t('submit')
          )}
        </button>
      </div>
    </form>
  )
}