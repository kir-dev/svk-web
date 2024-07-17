import { mailOptions, transporter } from '~/config/nodemailer'
import {
  FormFields,
  validateField,
} from '~/components/contact-components/ContactFormValidation'

const CONTACT_MESSAGE_FIELDS = {
  name: 'Név',
  email: 'Email',
  phoneNumber: 'Telefonszám',
  companyName: 'Cég neve',
  title: 'Titulus',
  message: 'Üzenet',
}

const generateEmailContent = (data: FormFields) => {
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

const handler = async (req, res) => {
  const data: FormFields = req.body
  const entries = Object.entries(data)
  const valid =
    entries
      .map((field) => validateField(field[0], field[1]))
      .filter((valid) => valid).length == entries.length
  if (!valid) {
    return res.status(400).send({ message: 'Incorrect form fields' })
  }
  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(data),
      subject: 'Megkeresés',
    })
    return res.status(200).send({ message: 'Successful request' })
  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
}

export default handler
