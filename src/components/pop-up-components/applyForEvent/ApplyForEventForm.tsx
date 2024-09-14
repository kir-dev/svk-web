import { FormField } from '~/components/pop-up-components/FormField'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  ApplyForEventFormFields,
  ApplyForEventValidity,
  validateField,
} from '~/utils/form-validation'
import { ContactSubmissionIndicator } from '~/components/pop-up-components/ContactSubmissionIndicator'
import { CircularProgress } from '@nextui-org/progress'
import { Applicant } from '~/lib/sanity.types'
import { applyForEvent } from '~/lib/queries/applyForEvent'

export interface ApplyForEventFormProps {
  closeModal?: (param: any) => void
  eventID: string
}

export const ApplyForEventForm: React.FC<ApplyForEventFormProps> = ({
  closeModal,
  eventID,
}: ApplyForEventFormProps) => {
  const formInitState: ApplyForEventFormFields = {
    name: '',
    email: '',
  }

  const validityInitState: ApplyForEventValidity = {
    name: false,
    email: false,
  }

  const [validForm, setValidForm] = useState<boolean>(false)
  const [formData, setFormData] =
    useState<ApplyForEventFormFields>(formInitState)
  const [validFields, setValidFields] =
    useState<ApplyForEventValidity>(validityInitState)
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
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      const applicant: Applicant = {
        _type: 'applicant',
        eventID: eventID,
        name: formData.name,
        email: formData.email,
      }
      await applyForEvent(applicant)
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
        <FormField
          title={'Név'}
          type="text"
          id="name"
          placeHolder={'Név'}
          value={formData.name}
          onChange={(event) => {
            handleChange(event)
          }}
        />
        <FormField
          title={'Email'}
          type="email"
          id="email"
          placeHolder={'Email'}
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
          {'Vissza'}
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
            'Jelentkezés'
          )}
        </button>
      </div>
    </form>
  )
}
