import { useCallback, useEffect, useState } from 'react'
import { ContactFormFields, validateField } from '~/utils/form-validation'

export const useForm = <
  TFormFields extends { [key: string]: string },
  TFieldsValidity extends { [key: string]: boolean },
>(
  formInitState: TFormFields,
  validityInitState: TFieldsValidity,
  localStorageID: string,
) => {
  const [formData, setFormData] = useState<TFormFields>(formInitState)
  const [validFields, setValidFields] =
    useState<TFieldsValidity>(validityInitState)
  const [isSuccess, setSuccess] = useState<boolean>(true)
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [validForm, setValidForm] = useState<boolean>(false)

  const validateSomeFields = useCallback(
    (fields: ContactFormFields, fieldsToValidate: string[]) => {
      setFormData((prevData) => ({ ...prevData, ...fields }))
      setValidFields((prevValidity) => {
        let fieldsValidity: Object = { ...prevValidity }
        fieldsToValidate.forEach((field) => {
          fieldsValidity[field] = validateField(field, fields[field])
        })
        return fieldsValidity as TFieldsValidity
      })
    },
    [],
  )

  const setAllFormField = useCallback((initValues: ContactFormFields) => {
    setFormData((prevData) => ({ ...prevData, ...initValues }))
    setValidFields((prevValidity) => {
      let fieldsValidity: Object = { ...prevValidity }
      Object.entries(initValues).forEach(([id, value]) => {
        fieldsValidity[id] = validateField(id, value)
      })
      return fieldsValidity as TFieldsValidity
    })
  }, [])

  const initFormFields = useCallback(
    (validateAll: boolean, fieldsToValidate?: string[]) => {
      const data = localStorage.getItem(localStorageID)
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
    [localStorageID, setAllFormField, validateSomeFields],
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
      localStorage.setItem(localStorageID, JSON.stringify(formData))
    }
  }

  const saveFormData = () => {
    localStorage.setItem(localStorageID, JSON.stringify(formData))
  }

  const handleSubmit = async (
    submit?: (fromData: TFormFields) => Promise<void>,
  ) => {
    try {
      setIsLoading(true)
      if (submit) {
        await submit(formData)
      }
      setSuccess(true)
      setFormData(formInitState)
      setValidFields(validityInitState)
      localStorage.setItem(localStorageID, JSON.stringify(formInitState))
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
