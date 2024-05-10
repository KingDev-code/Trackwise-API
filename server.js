const app = require('./src/app');
const sequelize = require('./src/config/database');
const User = require('./src/models/User'); // Importe todos os modelos que você deseja sincronizar
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Sincronizando todos os modelos de uma vez
sequelize.sync().then(() => {
  console.log('Tabelas criadas com sucesso!');
}).catch((error) => {
  console.error('Erro ao criar tabelas:', error);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
