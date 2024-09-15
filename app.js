const express = require('express')
const cors = require('cors');
require('express-async-errors')
const conectarBanco = require('./utils/conexaoBD');
const middleware = require('./utils/middleware');
const { URL_FRONT } = require('./utils/config')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/user');
const inicioRouter = require('./controllers/inicio');

const app = express()

conectarBanco()

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use('/', inicioRouter)

app.use(middleware.endpointDesconhecido)
app.use(middleware.lidarErro)

module.exports = app