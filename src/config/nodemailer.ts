import nodemailer from 'nodemailer'
import * as process from 'node:process'

const email = process.env.EMAIL
const password = process.env.EMAIL_PASSWORD

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password,
  },
})

export const mailOptions = {
  from: email,
  to: email,
}
