const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const articleRoutes = require('./routes/articleRoutes');
const app = express();
const sequelize = require('./config/database');
const Project = require('./models/Project'); // Certifique-se de importar todos os modelos necessários
const User = require('./models/User');
const Article = require('./models/Article');

sequelize.sync({ alter: true }).then(() => { // alter: true = tenta atulizar sem perder os dados - force: true = apaga tudo
  console.log('Tables have been successfully created, if they do not already exist');
}).catch(error => {
  console.error('Unable to create tables:', error);
});

app.use(express.static('public'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Usar rotas
app.use('/api/projects', projectRoutes);
app.use('/api/articles', articleRoutes);

module.exports = app