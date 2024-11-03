const express = require('express')
const cors = require('cors');
require('express-async-errors')
const conectarBanco = require('./services/conexaoBD').conectar;
const middleware = require('./utils/middleware');
const { URL_FRONT } = require('./utils/config')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const inicioRouter = require('./controllers/inicio');
const taskRouter = require('./controllers/task');
const solicitarRouter = require('./controllers/solicitarRedefinicaoSenha');
const redefinicaoRouter = require('./controllers/redefinirSenha');

const app = express()

conectarBanco()

app.use(cors())
app.use(express.json())

app.use('/', inicioRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/tasks', taskRouter)
app.use('/solicitar-redefinicao-senha', solicitarRouter)
app.use('/redefinir-senha', redefinicaoRouter)

app.use(middleware.endpointDesconhecido)
app.use(middleware.lidarErro)

module.exports = app