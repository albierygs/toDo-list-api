const app = require('./app');
const { PORT } = require('./utils/config');

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})