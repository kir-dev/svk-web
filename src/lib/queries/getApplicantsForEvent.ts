import { Applicant } from '~/lib/sanity.types'

export const handleGetApplicantsForEvent = async (
  eventID: string,
): Promise<Applicant[] | undefined> => {
  try {
    const response = await fetch(
      `/api/getApplicantsForEvent?eventID=${eventID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to apply for event')
    }

    const data = await response.json()
    return data.applicants as Applicant[]
  } catch (error) {
    console.error('Error:', error)
  }
}
