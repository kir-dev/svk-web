import {
  EventApplicationFieldsValidity,
  EventApplicationFormFields,
} from '~/utils/form-validation'
import { useForm } from '~/lib/hooks/useFrom'

export const useEventApplicationForm = (
  formInitState: EventApplicationFormFields,
  validityInitState: EventApplicationFieldsValidity,
) => {
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
  } = useForm(formInitState, validityInitState, '')

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
