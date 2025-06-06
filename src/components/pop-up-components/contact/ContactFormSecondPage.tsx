import { TextInputField } from '~/components/formfileds/TextInputField'
import React, { ChangeEvent, useEffect } from 'react'
import { ContactFieldsValidity } from '~/utils/form-validation'
import { useTranslations } from 'next-intl'
import { ContactSubmissionIndicator } from '~/components/pop-up-components/ContactSubmissionIndicator'
import { CircularProgress } from '@nextui-org/progress'
import { FormRadioGroup } from '~/components/formfileds/FormRadioGroup'
import { DropdownFormField } from '~/components/formfileds/DropdownFormField'
import { useContactForm } from '~/lib/hooks/useContactFrom'
import { sendForm } from '~/lib/api'

export interface ModalFormProps {
  closeModal: () => void
}

export const ContactFormSecondPage: React.FC<ModalFormProps> = ({
  closeModal,
}: ModalFormProps) => {
  const validityInitState: ContactFieldsValidity = {
    name: true,
    email: true,
    reason: false,
    source: false,
    money: false,
    employees: false,
  }

  const t = useTranslations('common.contact.form')
  const ti = useTranslations('common.invalidMessage')

  const {
    formData,
    isSuccess,
    isSubmitted,
    isLoading,
    validForm,
    handleSubmit,
    updateFormField,
    saveFormData,
    validateFields,
  } = useContactForm(validityInitState)

  useEffect(() => {
    validateFields(true)
  }, [validateFields])

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    updateFormField(event.target)
  }

  return (
    <form onSubmit={(event) => event.preventDefault()} className="my-5">
      <div
        className={`transition-opacity ${isSubmitted ? 'opacity-100' : 'opacity-0'}`}
      >
        <ContactSubmissionIndicator isSuccess={isSuccess} />
      </div>
      <div>
        <TextInputField
          title={t('reason')}
          type="text"
          id="reason"
          placeHolder={t('exampleReason')}
          value={formData.reason}
          invalidMessage={ti('required')}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <div className="flex flex-col justify-between md:flex-row col-span-2 md:col-span-1">
          <FormRadioGroup
            id="employees"
            title={t('employeeNumber')}
            elements={['1 - 10', '11 - 50', '51 - 250', '250+']}
            onChange={(id, value) => updateFormField({ id, value })}
            value={formData.employees}
          />
          <FormRadioGroup
            id="money"
            title={t('translatedAmount')}
            value={formData.money}
            elements={['0.5M - 1M', '1M - 2M', '2M - 3M', '3M+']}
            onChange={(id, value) => updateFormField({ id, value })}
          />
        </div>
        <DropdownFormField
          title={t('source')}
          id="source"
          value={formData.source}
          onChange={(event) => {
            handleChange(event)
          }}
          options={[t('sourceFromAcquaintance'), 'Facebook', 'LinkedIn']}
        />
      </div>
      <div className="flex justify-around w-full">
        <button
          type="button"
          onClick={() => {
            saveFormData()
            closeModal()
          }}
          className="rounded-lg p-3 bg-white border-red-600 border-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
        >
          {t('back')}
        </button>
        <button
          type="submit"
          className="rounded-lg p-3 bg-white border-blue-500 border-2 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors disabled:border-gray-600 disabled:text-gray-600 disabled:bg-white"
          onClick={() => handleSubmit(async () =>
              await sendForm({ sheet: "contact", ...formData })
          )}
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
