const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_project_management', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

// Testando a conexão com o banco de dados
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err);
  }
}

testConnection();

module.exports = sequelize;
