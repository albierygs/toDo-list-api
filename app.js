const express = require('express')
require('express-async-errors')
const conectarBanco = require('./utils/conexaoBD');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');

const app = express()

conectarBanco()

app.use(express.json())

app.use('/users', usersRouter)

app.use(middleware.endpointDesconhecido)
app.use(middleware.tratarErro)

module.exports = app