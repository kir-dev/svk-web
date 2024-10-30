import { ContactFormFields } from '~/utils/form-validation'
import axios, { AxiosResponse } from 'axios'

export const sendContactFrom = async (data: ContactFormFields) => {
  try {
    const axiosResponse: AxiosResponse = await axios.post<ContactFormFields>(
      '/api/contact',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return axiosResponse
  } catch (error) {
    return { status: 400, message: 'Contact form email submission failed!' }
  }
}
