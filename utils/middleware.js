const jwt = require('jsonwebtoken')
const User = require('../models/user')

const endpointDesconhecido = (request, response) => {
  response.status(404).send({ error: 'Endpoint desconhecido' })
}

const lidarErro = (error, request, response, next) => {
  console.error('Nome erro:', error.name);
  console.error('Mensagem erro:', error.message);
  
  if (error) {
    return response.status(400).json({error: error.message})
  }    
  
  next(error)
}

const extrairToken = (request, response, next) => {
  const authorization = request.get('authorization')
  
  if (!(authorization && authorization.startsWith('Bearer '))) {
    return response.status(401).json({ error: 'token não enviado' })
  }
  
  const token = authorization.replace('Bearer ', '')
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token inválido" })
  }
  
  request.token = decodedToken
  
  next()
}

const extrairUser = async (request, response, next) => {
  const user = await User.findById(request.token.id)
  request.user = user
  
  next()
}

module.exports = {
  lidarErro,
  endpointDesconhecido,
  extrairToken,
  extrairUser
}