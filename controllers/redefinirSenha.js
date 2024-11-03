const redefinicaoRouter = require('express').Router()
const bcryptjs = require('bcryptjs');
const User = require('../models/user')
const { extrairToken } = require('../utils/middleware')

redefinicaoRouter.post('/', extrairToken, async (request, response) => {
  const { newPassword } = request.body
  const userId = request.decodedToken.id
  const token = request.token

  const user = await User.findOne({ 
    _id: userId, 
    resetPasswordToken: token, 
    resetPasswordExpires: { $gt: Date.now() } 
  })

  if (!user) {
    return response.status(400).json({ error: 'Token inválido ou expirado' });
  }

  user.password = await bcryptjs.hash(newPassword, 10)
  user.resetPasswordToken = null
  user.resetPasswordExpires = null
  await user.save()

  response.status(200).json({ message: 'Senha redefinida comm sucesso' })
})

module.exports = redefinicaoRouter