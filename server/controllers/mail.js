const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const { FROM, PASS, TO } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: FROM,
    pass: PASS
  }
})

const mailOptions = {
  to: TO,
  subject: 'Contact with MICHAEL POMATA'
}

const sendMail = (content) => transporter.sendMail({ ...mailOptions, text: content }, function (error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})

module.exports = sendMail
