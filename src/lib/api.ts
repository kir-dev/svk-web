import { FormFields } from '~/utils/contact-form-validation'

export const sendContactFrom = async (data: FormFields) =>
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
