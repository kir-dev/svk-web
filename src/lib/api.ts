import { ContactFormFields } from '~/utils/form-validation'
import axios, { AxiosResponse } from 'axios'

export const sendContactFrom = async (data: ContactFormFields) => {
  fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  }).then((res) => {
    if (!res.ok) {
      console.log(res)
      throw new Error('Failed to send form')
    }
    return res.json()
  })
}

export const submitForm = async (data) => {
  try {
    const axiosResponse: AxiosResponse = await axios.post(
      `/api/form-submit`,
      data,
    )
    if (axiosResponse.status === 200) {
      return axiosResponse.status
    } else {
      throw new Error('Failed to send form')
    }
  } catch (e) {
    throw new Error('Failed to send form')
  }
}
