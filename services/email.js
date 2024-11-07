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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return new Error('Erro ao enviar o email')
    }
    console.log(`E-mail enviado para ${email}: ` + info.response);
  })
}


module.exports = {
  sendEMail
}