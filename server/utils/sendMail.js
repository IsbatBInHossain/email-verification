import nodemailer from 'nodemailer'

export default async ({ subject, message, sendTo, sentFrom, replyTo }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const options = {
    to: sendTo,
    from: sentFrom,
    subject,
    html: message,
    replyTo,
  }

  try {
    const info = await transporter.sendMail(options)
    console.log(info)
  } catch (err) {
    console.error(err)
  }
}
