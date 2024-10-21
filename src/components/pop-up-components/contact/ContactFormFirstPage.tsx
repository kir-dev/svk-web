import { FormField } from '~/components/pop-up-components/FormField'
import React, { ChangeEvent, useEffect } from 'react'
import {
  ContactFieldsValidity,
  ContactFormFields,
} from '~/utils/form-validation'
import { useTranslations } from 'next-intl'
import { ContactSubmissionIndicator } from '~/components/pop-up-components/ContactSubmissionIndicator'
import { CircularProgress } from '@nextui-org/progress'
import { useContactForm } from '~/lib/hooks/useContactFrom'

export interface ModalFormProps {
  closeModal: () => void
  submit?: () => void
}

export const ContactFormFirstPage: React.FC<ModalFormProps> = ({
  closeModal,
  submit,
}: ModalFormProps) => {
  const formInitState: ContactFormFields = {
    name: '',
    email: '',
    reason: '',
    money: '',
    employees: '',
    source: '',
  }

  const validityInitState: ContactFieldsValidity = {
    name: false,
    email: false,
    reason: true,
    source: true,
    money: true,
    employees: true,
  }

  //Todo look for a better place for this variable
  const contactFormLocalStorageID: string = 'contactFormLocalStorageID'

  const t = useTranslations('common.contact.form')
  const ti = useTranslations('common.invalidMessage')

  const {
    formData,
    isSuccess,
    isSubmitted,
    isLoading,
    validForm,
    handleNext,
    updateFormField,
    validateFields,
  } = useContactForm(formInitState, validityInitState)

  useEffect(() => {
    validateFields(false, ['name', 'email'])
  }, [])

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    updateFormField(event.target)
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
          title={t('name')}
          type="text"
          id="name"
          placeHolder={t('exampleName')}
          invalidMessage={ti('required')}
          value={formData.name}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <FormField
          title={t('email')}
          type="email"
          id="email"
          placeHolder={t('exampleEmail')}
          invalidMessage={ti('required') + '\n' + ti('email')}
          value={formData.email}
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
          onClick={() => handleNext(submit)}
          disabled={!validForm}
        >
          {isLoading ? (
            <CircularProgress color="default" aria-label="Loading..." />
          ) : (
            t('next')
          )}
        </button>
      </div>
    </form>
  )
}
