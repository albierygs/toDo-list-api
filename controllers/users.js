const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const usersRouter = require('express').Router()
const { extrairToken, extrairUser } = require('../utils/middleware')


// Não sei se vai usar
// Encontra usuário pelo id
// usersRouter.get('/:id', extrairToken, async (request, response) => {
  //     const id = request.params.id
//     const tokenId = request.token.id

//     if (id != tokenId) {
//         return response.status(401).send({ error: 'Não autorizado' })
//     }

//     const user = await User.findById(id)

//     if (!user) {
//         return response.status(400).send({ error: 'Usuário não encontrado' })
//     }

//     response.status(200).json(user)
// })

// Encontra usuário com token
usersRouter.get('/', extrairToken, extrairUser, async (request, response) => {
  const user = request.user
  response.status(200).json(user)
})

// Cria usuário
usersRouter.post('/', async (request, response) => {
  const { email, password, name } = request.body
  
  const passwordHash = password && password.length >= 6
  ? await bcryptjs.hash(password, 10)
  : password
  
  const user = new User({ email, name, password: passwordHash })
  
  const userSalvo = await user.save()
  
  response.status(201).json(userSalvo)
})

// Atualiza usuário com token 
usersRouter.put('/:id', extrairToken, async (request, response) => {
  const id = request.params.id
  const { email, name, password } = request.body
  const tokenId = request.token.id
  
  if (id != tokenId) {
    return response.status(401).send({ error: 'Não autorizado' })
  }
  
  const passwordHash = password && password.length >= 6
  ? await bcryptjs.hash(password, 10)
  : password
  
  const novosDados = {
    email,
    name,
    password: passwordHash
  }
  
  const userAtualizado = await User.findByIdAndUpdate(
    id,
    novosDados,
    { new: true, runValidators: true, context: 'query' }
  )
  
  if (!userAtualizado) {
    return response.status(400).send({ error: 'Usuário não encontrado' })
  }
  
  response.status(200).json(userAtualizado)
})

// Deleta usuário com token 
usersRouter.delete('/:id', extrairToken, async (request, response) => {
  const id = request.params.id
  const tokenId = request.token.id
  
  if (id != tokenId) {
    return response.status(401).send({ error: 'Não autorizado' })
  }
  
  const userDeletado = await User.findByIdAndDelete(id)
  
  if (!userDeletado) {
    return response.status(400).send({ error: 'Usuário não encontrado' })
  }
  
  response.status(204).end()
})

module.exports = usersRouter