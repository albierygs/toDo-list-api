const bcryptjs = require('bcryptjs');
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.status(200).json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const user = await User.findById(id)
    response.status(200).json(user)
})

usersRouter.post('/', async (request, response) => {
    const { email, password, name } = request.body

    const passwordHash = password && password.length >= 6
        ? await bcryptjs.hash(password, 10)
        : password

    const user = new User({ email, name, password: passwordHash })

    const userSalvo = await user.save()

    response.status(201).json(userSalvo)
})

module.exports = usersRouter