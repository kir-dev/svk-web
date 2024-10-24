import { useCallback, useEffect, useState } from 'react'
import { submitForm } from '~/lib/api'
import { ContactFieldsValidity, ContactFormFields, validateField } from '~/utils/form-validation'
import { convertToString, Sheets } from '~/utils/google-sheets'

const contactFormLocalStorageID = 'contactFormLocalStorageID'

const formInitState: ContactFormFields = {
  sheet: convertToString(Sheets.CONTACT),
  name: '',
  email: '',
  reason: '',
  source: '',
  money: '',
  employees: '',
}

export const useContactForm = (validityInitState: ContactFieldsValidity) => {
  const [formData, setFormData] = useState<ContactFormFields>(formInitState)
  const [validFields, setValidFields] =
    useState<ContactFieldsValidity>(validityInitState)
  const [isSuccess, setSuccess] = useState<boolean>(true)
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validForm, setValidForm] = useState<boolean>(false)

  const validateSomeFields = useCallback(
    (fields: ContactFormFields, fieldsToValidate: string[]) => {
      setFormData((prevData) => ({ ...prevData, ...fields }))
      setValidFields((prevValidity) => {
        const fieldsValidity = { ...prevValidity }
        fieldsToValidate.forEach((field) => {
          fieldsValidity[field] = validateField(field, fields[field])
        })
        return fieldsValidity
      })
    },
    [],
  )

  const setAllFormField = useCallback((initValues: ContactFormFields) => {
    setFormData((prevData) => ({ ...prevData, ...initValues }))
    setValidFields((prevValidity) => {
      const fieldsValidity = { ...prevValidity }
      Object.entries(initValues).forEach(([id, value]) => {
        fieldsValidity[id] = validateField(id, value)
      })
      return fieldsValidity
    })
  }, [])

  const initFormFields = useCallback(
    (validateAll: boolean, fieldsToValidate?: string[]) => {
      const data = localStorage.getItem(contactFormLocalStorageID)
      if (!data) {
        return
      }
      const fields: ContactFormFields = JSON.parse(data)
      if (validateAll) {
        setAllFormField(fields)
      } else if (fieldsToValidate) {
        validateSomeFields(fields, fieldsToValidate)
      }
    },
    [setAllFormField, validateSomeFields],
  )

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

  const updateFormField = ({ id, value }) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
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

  const saveFormData = () => {
    localStorage.setItem(contactFormLocalStorageID, JSON.stringify(formData))
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      // Email V
      //await sendContactFrom(formData)
      // Sheet V
      await submitForm(formData)
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
    saveFormData,
    setAllFormField,
    validateFields: initFormFields,
  }
}
