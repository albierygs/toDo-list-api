const mongoose = require('mongoose');
const config = require('./config')

const conectar = async () => {
  mongoose.set('strictQuery', false)
  console.log('Conectando ao banco...');
  
  await mongoose.connect(config.MONGO_URL)
  console.log('Conectado ao banco');
}

const fechar = async () => {
  console.log('Encerrando a aplicação...');
  await mongoose.connection.close();
  console.log('Conexão com o banco fechada.');
  process.exit(0);
}


module.exports = { conectar, fechar }