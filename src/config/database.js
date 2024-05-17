const { Sequelize } = require('sequelize');

// Replace 'localhost' with the MySQL service name defined in docker-compose.yml
const sequelize = new Sequelize('user_project_management', 'user', 'password', {
  host: 'db', // MySQL service name in docker-compose.yml
  dialect: 'mysql',
});

// Testing the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

testConnection();

module.exports = sequelize;