const { Sequelize } = require('sequelize');

// Substitua 'localhost' pelo nome do serviço do MySQL definido no docker-compose.yml
const sequelize = new Sequelize('user_project_management', 'user', 'password', {
  host: 'db', // Nome do serviço do MySQL no docker-compose.yml
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