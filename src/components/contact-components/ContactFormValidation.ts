const emailRegexp =
  /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/

const phoneNumberRegexp = /^[+]*[(]?[0-9]{1,4}[)]?[-\s.\/0-9]*$/

export interface FormFields {
  name: string
  email: string
  phoneNumber: string
  companyName: string
  title: string
  message: string
}

export interface FieldsValidity {
  name: boolean
  email: boolean
  phoneNumber: boolean
  companyName: boolean
  title: boolean
  message: boolean
}

const validateRequired = (text: string): boolean => !(!text || !text.trim())

const validateEmail = (email: string): boolean =>
  !(!email || !email.trim() || !email.match(emailRegexp))

const validatePhoneNumber = (phoneNumber: string): boolean =>
  !(
    !phoneNumber ||
    !phoneNumber.trim() ||
    !phoneNumber.match(phoneNumberRegexp)
  )

export const validateField = (field: string, value: string): boolean => {
  switch (field) {
    case 'name':
    case 'companyName':
    case 'title':
    case 'message':
      return validateRequired(value)
    case 'email':
      return validateEmail(value)
    case 'phoneNumber':
      return validatePhoneNumber(value)
    default:
      return false
  }
}
