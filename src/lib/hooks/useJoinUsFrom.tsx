import { useEffect, useState } from 'react'
import {
  JoinUsFieldsValidity,
  JoinUsFormFields,
  validateField,
} from '~/utils/form-validation'

export const useJoinUsFrom = (
  formInitState: JoinUsFormFields,
  validityInitState: JoinUsFieldsValidity,
) => {
  const [validForm, setValidForm] = useState<boolean>(false)
  const [formData, setFormData] = useState<JoinUsFormFields>(formInitState)
  const [validFields, setValidFields] =
    useState<JoinUsFieldsValidity>(validityInitState)
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

  const updateFormField = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    })
    setValidFields((current) => ({
      ...current,
      [id]: validateField(id, value),
    }))
  }

  const handleSubmit = async (submit: () => void) => {
    try {
      setIsLoading(true)
      submit()
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

  return {
    validForm,
    formData,
    validFields,
    isSuccess,
    isSubmitted,
    isLoading,
    handleSubmit,
    updateFormField,
  }
}
