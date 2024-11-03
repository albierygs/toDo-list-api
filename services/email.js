const nodemailer = require('nodemailer');
const { GMAIL_ACCOUNT, GMAIL_PASSWORD } = require('../utils/config')

const sendEMail = async (email, htmlmessage, title) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_ACCOUNT,
      pass: GMAIL_PASSWORD
    }
  })
  
  const mailOptions = {
    from: GMAIL_ACCOUNT,
    to: email,
    subject: title,
    html: htmlmessage
  };
  
  await transporter.sendMail(mailOptions)

  console.log('Email enviado com sucesso');
}


module.exports = {
  sendEMail
}