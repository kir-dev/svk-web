import { mailOptions, transporter } from '~/config/nodemailer'
import { ContactFormFields, validateField } from '~/utils/form-validation'

const CONTACT_MESSAGE_FIELDS = {
  name: 'Név',
  email: 'Email',
  reason: 'Megkeresés oka',
  source: 'Innen hallot az SVK-ról',
  money: 'Ráfordított összeg',
  employees: 'Alklamazottak száma',
}

const generateEmailContent = (data: ContactFormFields) => {
  const stringData = Object.entries(data).reduce(
    (str: string, [key, val]) =>
      str + `${CONTACT_MESSAGE_FIELDS[key]}:${val}\n`,
    '',
  )

  const htmlData = Object.entries(data).reduce(
    (str: string, [key, val]) =>
      str +
      `<h3 style="font-weight: normal">${CONTACT_MESSAGE_FIELDS[key]}: ${val}</h3>`,
    '',
  )

  return {
    text: stringData,
    html: `<!doctypehtml><html lang=en><meta charset=UTF-8><head><title>Megkeresés</title></head><body><h1 style="text-align: center">Megkeresés</h1><div style="padding: 5%">${htmlData}</div></body></html>`,
  }
}

export async function POST(req) {
  const data: ContactFormFields = req.body
  const entries = Object.entries(data)
  const valid =
    entries
      .map((field) => validateField(field[0], field[1]))
      .filter((valid) => valid).length == entries.length
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Incorrect form fields' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(data),
      subject: 'Megkeresés',
    })

    return new Response(JSON.stringify({ message: 'Successful request' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {

    const message = error?.response?.data?.message || error.message || 'Internal Server Error';
    return new Response(JSON.stringify({ error: message }), {
      status: error?.response?.status || 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
