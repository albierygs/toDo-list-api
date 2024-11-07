const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../utils/routesHelper');
const loginRouter = require('express').Router()


loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body
  
  if (!(email && password)) {
    return response.status(400).send({ error: 'Email ou senha estão faltando' })
  }
  
  const user = await User.findOne({ email })
  
  if (!user) {
    return response.status(401).send({ error: 'email inválido' })
  }
  
  const checkPassword = await bcryptjs.compare(password, user.password)
  
  if (!checkPassword) {
    return response.status(401).send({ error: 'senha inválida' })
  }
  
  const token = generateToken(user)
  
  response.status(200).json({ token })
})

module.exports = loginRouter