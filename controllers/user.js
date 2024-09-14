const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config');
const userRouter = require('express').Router()

userRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const user = await User.findById(id)
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

module.exports = userRouter