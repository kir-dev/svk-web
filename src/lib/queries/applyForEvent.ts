import { Applicant } from '~/lib/sanity.types'

export const applyForEvent = async (applicant: Applicant) => {
  try {
    const response = await fetch('/api/applyForEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(applicant),
    })

    if (!response.ok) {
      throw new Error('Failed to apply for event')
    }

    const data = await response.json()
    console.log('Event application successful:', data)
  } catch (error) {
    console.error('Error:', error)
  }
}
