import { NextApiRequest, NextApiResponse } from 'next'
import { applyForEvent } from '~/lib/queries/applicant.queries'
import { getClient } from '~/lib/sanity.client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const applicant = await req.body
      const token = process.env.SANITY_EDITOR_TOKEN
      if (!token) {
        return res
          .status(500)
          .json({ error: 'SANITY_EDITOR_TOKEN is not defined.' })
      }
      const client = getClient({ token })
      await applyForEvent(client, applicant)
      res.status(200).json({ message: 'Event application successful!' })
    } catch (error) {
      console.error('Failed to apply for event:', error)
      res.status(500).json({ error: 'Failed to apply for event' })
    }
  }
}
