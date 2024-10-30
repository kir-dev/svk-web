import {
  ContactFieldsValidity,
  ContactFormFields,
} from '~/utils/form-validation'
import { useForm } from '~/lib/hooks/useFrom'

const contactFormLocalStorageID = 'contactFormLocalStorageID'

const formInitState: ContactFormFields = {
  name: '',
  email: '',
  reason: '',
  source: '',
  money: '',
  employees: '',
}

export const useContactForm = (validityInitState: ContactFieldsValidity) => {
  const {
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
    validateFields,
  } = useForm(formInitState, validityInitState, contactFormLocalStorageID)

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
    validateFields,
  }
}
