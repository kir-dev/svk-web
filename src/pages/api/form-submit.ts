import axios from 'axios'

interface fields {
  name: String,
  email: String,
  study: String,
  activeSemesterCount: String,
}

const handler = async (req, res) => {
  const data: fields = req.body
  axios.post(
    process.env['N8N_SHEETS_HTTP']!,
    JSON.stringify(data),
    { headers : {
        'x-api-key': process.env['X_API_KEY'],
        'Content-Type': 'application/json'
    }}
    ).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}

export default handler