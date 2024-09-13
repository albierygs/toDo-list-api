const mongoose = require('mongoose');
const config = require('./config')

const conectar = async () => {
    mongoose.set('strictQuery', false)
    console.log('Conectando ao banco...');

    await mongoose.connect(config.MONGO_URL)
    console.log('Conectado ao banco');
}

module.exports = conectar