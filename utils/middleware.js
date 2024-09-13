const lidarErro = (error, request, response, next) => {
    console.error('Nome erro:', error.name);
    console.error('Mensagem erro:', error.message);

    if (error) {
        return response.status(400).json({error: error.message})
    }    
    
    next(error)
}

const endpointDesconhecido = (request, response) => {
    response.status(404).send({ error: 'Endpoint desconhecido' })
}

module.exports = {
    lidarErro,
    endpointDesconhecido
}