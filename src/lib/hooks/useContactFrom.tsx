import { useEffect, useState } from 'react'
import { sendContactFrom } from '~/lib/api'
import {
  ContactFieldsValidity,
  ContactFormFields,
  validateField,
} from '~/utils/form-validation'

const contactFormLocalStorageID = 'contactFormLocalStorageID'

export const useContactForm = (
  formInitState: ContactFormFields,
  validityInitState: ContactFieldsValidity,
) => {
  const [formData, setFormData] = useState<ContactFormFields>(formInitState)
  const [validFields, setValidFields] =
    useState<ContactFieldsValidity>(validityInitState)
  const [isSuccess, setSuccess] = useState<boolean>(true)
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validForm, setValidForm] = useState<boolean>(false)

  const validateFields = (
    validateAll: boolean,
    fieldsToValidate?: string[],
  ) => {
    const data = localStorage.getItem(contactFormLocalStorageID)
    if (!data) {
      return
    }
    const fields: ContactFormFields = JSON.parse(data)
    if (validateAll) {
      setAllFormField(fields)
      return
    }
    if (fieldsToValidate) {
      validateSomeFields(fields, fieldsToValidate)
    }
  }

  const validateSomeFields = (
    fields: ContactFormFields,
    fieldsToValidate: string[],
  ) => {
    setFormData({ ...formData, ...fields })
    let fieldsValidity: ContactFieldsValidity = validityInitState
    fieldsToValidate.forEach(
      (field) => (fieldsValidity[field] = validateField(field, fields[field])),
    )
    setValidFields({ ...validFields, ...fieldsValidity })
  }

  useEffect(() => {
    setValidForm(Object.values(validFields).every(Boolean))
  }, [validFields])

  useEffect(() => {
    if (isSubmitted) {
      const timeoutId = setTimeout(() => {
        setSubmitted(false)
      }, 5000)
      return () => clearTimeout(timeoutId)
    }
  }, [isSubmitted])

  const setAllFormField = (initValues: ContactFormFields) => {
    setFormData({ ...formData, ...initValues })
    let fieldsValidity: ContactFieldsValidity = { ...validityInitState }
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
    setValidFields((current) => ({
      ...current,
      [id]: validateField(id, value),
    }))
  }

  const handleNext = async (submit: (() => void) | undefined) => {
    if (submit) {
      submit()
      localStorage.setItem(contactFormLocalStorageID, JSON.stringify(formData))
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await sendContactFrom(formData)
      setSuccess(true)
      setFormData(formInitState)
      setValidFields(validityInitState)
      localStorage.setItem(
        contactFormLocalStorageID,
        JSON.stringify(formInitState),
      )
    } catch (error) {
      setSuccess(false)
    } finally {
      setSubmitted(true)
      setIsLoading(false)
    }
  }

  return {
    formData,
    validFields,
    isSuccess,
    isSubmitted,
    isLoading,
    validForm,
    handleNext,
    updateFormField,
    handleSubmit,
    setAllFormField,
    validateFields,
  }
}
