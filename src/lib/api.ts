import { ContactFormFields } from '~/utils/form-validation'
import axios from 'axios'

export const sendContactFrom = async (data: ContactFormFields) =>
  fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to send contact')
    }
    return res.json()
  })

export const submitForm = async (data) => {
  axios.post(`/api/form-submit`, data)
    .then(function (response) {
    console.log(response);
  })
    .catch(function (error) {
      console.log(error);
    });
}