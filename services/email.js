const nodemailer = require('nodemailer');
const { GMAIL_ACCOUNT, GMAIL_PASSWORD } = require('../utils/config')

const sendEMail = (email) => {
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
    subject: 'E-mail com nodemailer',
    text: 'teste com nodemailer',
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Erro ao enviar o e-mail: ', error);
    }
    console.log(`E-mail enviado para ${email}: ` + info.response);
  })
}


module.exports = {
  sendEMail
}