import axios, { AxiosResponse } from 'axios'

export async function POST(request) {
  const data = await request.json()
  console.log(data)
  try {
    const axiosResponse: AxiosResponse = await axios.post(
      process.env['N8N_SHEETS_HTTP']!,
      data,
      {
        headers: {
          'x-api-key': process.env['X_API_KEY'],
          'Content-Type': 'application/json',
        },
      },
    )
    return new Response(JSON.stringify(axiosResponse.data), {
      status: axiosResponse.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {

    const message = error?.response?.data?.message || error.message || 'Internal Server Error';

    return new Response(JSON.stringify({ error: message }), {
      status: error?.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}