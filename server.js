const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const swaggerDocs = require('./swaggerConfig.js'); // Adjust the path if necessary

swaggerDocs(app, PORT); // Initialize Swagger documentation

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});