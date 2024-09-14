const inicioRouter = require('express').Router()

inicioRouter.get('/', (request, response) => {
    response.status(200).send('<h1>Página inicial da API</h1>')
})

module.exports = inicioRouter