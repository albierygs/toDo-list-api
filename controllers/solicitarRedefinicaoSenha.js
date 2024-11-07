const User = require('../models/user')
const { sendEMail } = require('../services/email')
const { URL_FRONT } = require('../utils/config')
const { generateToken } = require('../utils/routesHelper')

const solicitarRouter = require('express').Router()

solicitarRouter.post('/', async (request, response) => {
  const { email } = request.body

  const user = await User.findOne({ email })

  if (!user) {
    return response.status(404).json({ error: 'E-mail não encontrado' });
  }

  const resetToken = generateToken(user, '1h')
  user.resetPasswordToken = resetToken
  user.resetPasswordExpires = Date.now() + 3600000
  await user.save()
  
  const resetLink = `${URL_FRONT}/redefinir-senha/${resetToken}`

  const message = `<p>Clique no link abaixo para redefinir a sua senha.</p><a href="${resetLink}">Redefinir senha</a><p><strong>ATENÇÃO:</strong> O link tem validade de 1 hora!</p>`

  sendEMail(user.email, message, 'Redefinição de senha')

  response.status(200).json({ message: 'Link de redefinição enviado' })
})

module.exports = solicitarRouter