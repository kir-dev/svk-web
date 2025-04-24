import {ContactFormFields, EventApplicationFormFields, JoinUsFormFields} from '~/utils/form-validation'
import axios from 'axios'

export const sendForm = async (data: ContactFormFields | JoinUsFormFields | EventApplicationFormFields) =>
    axios.post('/api/form-submit', data).then((res) => {
    if (!res.status) {
      throw new Error('Failed to send contact')
    }
  })
