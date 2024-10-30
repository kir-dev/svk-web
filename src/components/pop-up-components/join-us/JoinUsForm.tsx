import { TextInputField } from '~/components/formfileds/TextInputField'
import React, { ChangeEvent } from 'react'
import { JoinUsFieldsValidity, JoinUsFormFields } from '~/utils/form-validation'
import { useTranslations } from 'next-intl'
import { ContactSubmissionIndicator } from '~/components/pop-up-components/ContactSubmissionIndicator'
import { CircularProgress } from '@nextui-org/progress'
import { DropdownFormField } from '~/components/formfileds/DropdownFormField'
import { useJoinUsFrom } from '~/lib/hooks/useJoinUsFrom'

export interface ModalFormProps {
  closeModal?: (param: any) => void
}

export const JoinUsFrom: React.FC<ModalFormProps> = ({
  closeModal,
}: ModalFormProps) => {
  const formInitState: JoinUsFormFields = {
    name: '',
    email: '',
    study: '',
    activeSemesterCount: '',
  }

  const validityInitState: JoinUsFieldsValidity = {
    name: false,
    email: false,
    study: false,
    activeSemesterCount: false,
  }

  const t = useTranslations('common.joinUs.form')
  const ti = useTranslations('common.invalidMessage')

  const {
    formData,
    isSuccess,
    isSubmitted,
    isLoading,
    validForm,
    updateFormField,
    handleSubmit,
  } = useJoinUsFrom(formInitState, validityInitState)

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
        <DropdownFormField
          id="study"
          title={t('study')}
          options={t('studyOptions').split(';')}
          value={formData.study}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <DropdownFormField
          id="activeSemesterCount"
          title={t('activeSemesterCount')}
          options={['1', '2', '3', '4', '5', '6', '7', '7+']}
          value={formData.activeSemesterCount}
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
          onClick={() =>
            handleSubmit(async () => {
              //Todo
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
