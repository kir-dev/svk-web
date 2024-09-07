import { ContactFormField } from '~/components/contact-components/ContactFormField'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { sendContactFrom } from '~/lib/api'
import {
  FieldsValidity,
  FormFields,
  validateField,
} from '~/utils/contact-form-validation'
import { useTranslations } from 'next-intl'
import { ContactSubmissionIndicator } from '~/components/contact-components/ContactSubmissionIndicator'
import { CircularProgress } from '@nextui-org/progress'

export interface ModalFormProps {
  closeModal: () => void
}

export const ContactForm: React.FC<ModalFormProps> = ({
  closeModal,
}: ModalFormProps) => {
  const formInitState: FormFields = {
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    title: '',
    message: '',
  }

  const validityInitState: FieldsValidity = {
    name: false,
    email: false,
    phoneNumber: false,
    companyName: false,
    title: false,
    message: false,
  }

  const t = useTranslations('common.contact.form')

  const [validForm, setValidForm] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormFields>(formInitState)
  const [validFields, setValidFields] =
    useState<FieldsValidity>(validityInitState)
  const [isSuccess, setSuccess] = useState<boolean>(true)
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

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
    const { id, value } = event.target
    setFormData({ ...formData, [id]: value })
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
        <ContactFormField
          title={t('name')}
          type="text"
          id="name"
          placeHolder={t('exampleName')}
          value={formData.name}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <ContactFormField
          title={t('email')}
          type="email"
          id="email"
          placeHolder={t('exampleEmail')}
          value={formData.email}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <ContactFormField
          title={t('phoneNumber')}
          type="tel"
          id="phoneNumber"
          placeHolder="06012345678"
          value={formData.phoneNumber}
          pattern="^(?:\+36|06)?\s?[1-9]\d\s?\d{3}\s?\d{3,4}$|^(?:\+36|06)?\s?((1|20|30|31|50|70|90)\d)\s?\d{3}\s?\d{3,4}$"
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <ContactFormField
          title={t('companyName')}
          type="text"
          id="companyName"
          placeHolder={t('exampleCompanyName')}
          value={formData.companyName}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <ContactFormField
          title={t('title')}
          type="text"
          id="title"
          placeHolder={t('exampleTitle')}
          value={formData.title}
          onChange={(event) => {
            handleChange(event)
          }}
        />
      </div>
      <div className="p-3 px-6 w-full">
        <label
          htmlFor="message"
          className="text-md block uppercase text-gray-600"
        >
          {t('message')}
        </label>
        <textarea
          required={true}
          id="message"
          value={formData.message}
          placeholder={t('exampleMessage')}
          className="w-full h-20 rounded bg-white text-gray-600 invalid:border-red-600 border-2 valid:border-blue-500 p-1"
          onChange={(event) => {
            handleChange(event)
          }}
        />
      </div>
      <div className="flex justify-around w-full">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-lg p-3 bg-white border-red-600 border-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
        >
          {t('cancel')}
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
