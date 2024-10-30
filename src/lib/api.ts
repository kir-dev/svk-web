import { ContactFormFields } from '~/utils/form-validation'
import axios from 'axios'

export const sendContactFrom = async (data: ContactFormFields) =>
  axios.post('/api/contact', data).then((res) => {
    if (!res.status) {
      throw new Error('Failed to send contact')
    }
  })
