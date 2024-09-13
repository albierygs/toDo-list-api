const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config')
const loginRouter = require('express').Router()


loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body

    const user = await User.findOne({ email })

    if (!user) {
        return response.status(401).send({ error: 'email inválido' })
    }

    const checkPassword = await bcryptjs.compare(password, user.password)

    if (!checkPassword) {
        return response.status(401).send({ error: 'senha inválida' })
    }

    const userForToken = { id: user.id }

    const token = await jwt.sign(
        userForToken,
        SECRET,
        { expiresIn: 60 * 60 }
    )

    response.status(200).json({ token })
})

module.exports = loginRouter