import { TextInputField } from '~/components/formfileds/TextInputField'
import React, { ChangeEvent } from 'react'
import {
  EventApplicationFieldsValidity,
  EventApplicationFormFields,
} from '~/utils/form-validation'
import { useTranslations } from 'next-intl'
import { ContactSubmissionIndicator } from '~/components/pop-up-components/ContactSubmissionIndicator'
import { CircularProgress } from '@nextui-org/progress'
import { useEventApplicationForm } from '~/lib/hooks/useEventApplicationForm'
import { ToggleInputField } from '~/components/formfileds/ToggleInputField'

export interface ModalFormProps {
  closeModal?: (param: any) => void
}

export const EventApplicationForm: React.FC<ModalFormProps> = ({
  closeModal,
}: ModalFormProps) => {
  const formInitState: EventApplicationFormFields = {
    name: '',
    email: '',
    schDormResident: 'false',
    acceptTerms: 'false',
  }

  const validityInitState: EventApplicationFieldsValidity = {
    name: false,
    email: false,
    schDormResident: true,
    acceptTerms: false,
  }

  const t = useTranslations('events.form')
  const ti = useTranslations('common.invalidMessage')

  const {
    formData,
    isSuccess,
    isSubmitted,
    isLoading,
    validForm,
    updateFormField,
    handleSubmit,
  } = useEventApplicationForm(formInitState, validityInitState)

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => updateFormField(event.target)

  return (
    <form onSubmit={(e) => e.preventDefault()} className="my-5">
      <div
        className={`transition-opacity ${isSubmitted ? 'opacity-100' : 'opacity-0'}`}
      >
        <ContactSubmissionIndicator isSuccess={isSuccess} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <TextInputField
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
        <TextInputField
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
        <ToggleInputField
          title={t('schDormResident')}
          id="schDormResident"
          defaultValue={formData.schDormResident === 'true'}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => handleChange(event)}
        />
      </div>
      <div className="w-full">
        <ToggleInputField
          title={t('acceptTerms')}
          id="acceptTerms"
          defaultValue={formData.acceptTerms === 'true'}
          required={true}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => handleChange(event)}
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
          onClick={() =>
            handleSubmit(async () => {
              //Todo
              console.log('form field values:', formData)
            })
          }
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
