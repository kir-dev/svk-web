import { JoinUsFieldsValidity, JoinUsFormFields } from '~/utils/form-validation'
import { useForm } from '~/lib/hooks/useFrom'

export const useJoinUsFrom = (
  formInitState: JoinUsFormFields,
  validityInitState: JoinUsFieldsValidity,
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
