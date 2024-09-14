const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const { SECRET } = require('../utils/config');
const userRouter = require('express').Router()

userRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const user = await User.findById(id)

    if (!user) {
        return response.status(400).send({ error: 'Usuário não encontrado' })
    }

    response.status(200).json(user)
})

userRouter.get('/', async (request, response) => {
    const authorization = request.get('authorization')

    if (!(authorization && authorization.startsWith('Bearer '))) {
        return response.status(401).send({ error: 'autorização falhou' })
    }

    const token = authorization.replace('Bearer ', '')

    const tokenDecodificado = jwt.verify(token, SECRET)

    if (!tokenDecodificado) {
        return response.status(401).send({ error: 'token inválido' })
    }

    const user = await User.findById(tokenDecodificado.id)

    response.status(200).json(user)
})

userRouter.post('/', async (request, response) => {
    const { email, password, name } = request.body

    const passwordHash = password && password.length >= 6
        ? await bcryptjs.hash(password, 10)
        : password

    const user = new User({ email, name, password: passwordHash })

    const userSalvo = await user.save()

    response.status(201).json(userSalvo)
})

userRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const { email, name, password } = request.body

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

userRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const userDeletado = await User.findByIdAndDelete(id)

    if (!userDeletado) {
        return response.status(400).send({ error: 'Usuário não encontrado' })
    }

    response.status(204).end()
})

module.exports = userRouter