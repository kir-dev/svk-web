import axios, { AxiosResponse } from 'axios'

interface fields {
  name: String
  email: String
  study: String
  activeSemesterCount: String
}

export const handler = async (req, res) => {
  const data: fields = req.body
  try {
    const axiosResponse: AxiosResponse = await axios.post(
      process.env['N8N_SHEETS_HTTP']!,
      JSON.stringify(data),
      {
        headers: {
          'x-api-key': process.env['X_API_KEY'],
          'Content-Type': 'application/json',
        },
      },
    )
    return res.status(axiosResponse.status).send(axiosResponse.data)
  } catch (error) {
    return {
      status: 500,
      message: 'Failed to submit form!',
    }
  }
}
