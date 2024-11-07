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
      return console.log('Erro ao enviar o e-mail: ', error);
    }
    console.log(`E-mail enviado para ${email}: ` + info.response);
  })
}


module.exports = {
  sendEMail
}