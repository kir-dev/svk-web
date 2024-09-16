import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const clientId = process.env.CLIENT_ID
  return res.status(200).json({
    url: `https://auth.sch.bme.hu/site/login?response_type=code&client_id=${clientId}&scope=pek.sch.bme.hu:profile`,
  })
}
