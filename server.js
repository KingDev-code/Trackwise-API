const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const swaggerDocs = require('./swaggerConfig.js'); // Ajuste o caminho se necessário

swaggerDocs(app, PORT); // Inicializa a documentação Swagger

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});