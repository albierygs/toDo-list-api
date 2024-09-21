const app = require('./app');
const { PORT } = require('./utils/config');
const fecharConexao = require('./utils/conexaoBD').fechar

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

process.on('SIGINT', fecharConexao)
process.on('SIGTERM', fecharConexao)