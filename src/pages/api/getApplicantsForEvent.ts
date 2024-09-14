import { NextApiRequest, NextApiResponse } from 'next'
import { getApplicantsForEvent } from '~/lib/queries/applicant.queries'
import { getClient } from '~/lib/sanity.client'
import { Applicant } from '~/lib/sanity.types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const { eventID } = req.query
      if (!eventID || typeof eventID !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing eventID' })
      }
      const client = getClient()
      const applicants: Applicant[] = await getApplicantsForEvent(
        client,
        eventID,
      )
      return res.status(200).json({
        message: 'Event application successful!',
        applicants: applicants,
      })
    } catch (error) {
      console.error('Failed to apply for event:', error)
      res.status(500).json({ error: 'Failed to apply for event' })
    }
  }
}
