const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const marked = require('marked');

// const markdownContent = fs.readFileSync('./docs/databaseDocumentation.md', 'utf8');
// const htmlContent = marked(markdownContent);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Management API',
      version: '1.0.0',
      description: `
This API is designed to streamline the management of projects and articles within a corporate environment. It provides robust endpoints for creating, updating, and deleting projects and articles, as well as managing associations between them. With a focus on security and user-friendly interaction, this documentation is crafted to offer all the necessary details for developers to integrate and effectively utilize our services.

### Key Features:
- **Project Management:** Create, update, and delete projects. Retrieve detailed information about specific projects or a list of all projects.
- **Article Management:** Manage articles within projects including creation, updates, and deletion. Retrieve articles by their specific project association.
- **User Integration:** Supports operations related to project and article permissions based on user roles.

### Terms of Service:
For more details on the terms of service, please visit our [Terms of Service](#) page.

### Developer Support:
- Visit our [Developer Support Website](#)
- Send an email to [Developer Support](mailto:support@example.com)

### License:
This API is available under the MIT License. For more details, refer to the [LICENSE](#) section in our GitHub repository.

### More Information:
Find additional information and stay updated with the latest changes to our API in the [GitHub Repository](https://github.com/example/project-management-api).
` + '<div style="font-family: monospace;">' + 
      require('fs').readFileSync('./src/docs/databaseDocumentation.md', 'utf8') + 
      '</div>' +
      `
    <div>
      <h3>Entity-Relationship Diagram</h3>
      <p>This diagram illustrates all the entities in the database and their interrelationships, providing a quick overview of the data structure and flow.</p>
      <p>View the ER Diagram in high resolution: <a href="https://drive.google.com/file/d/1sY0sEhIhFLKgkQV7vjnI2PqjzdBw58ZM/view?usp=sharing" target="_blank">ER Diagram of the Database</a></p>
    </div>
      `
    },
    servers: [
      { url: 'http://localhost:3000/api', description: 'Development server' }
    ],
    components: {
      schemas: {
        Project: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: "Project Alpha"
            },
            description: {
              type: 'string',
              example: "A sample project description here..."
            }
          }
        },
        Article: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: "Interesting Article Title"
            },
            content: {
              type: 'string',
              example: "Content of the article here..."
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    paths: {
      '/projects': {
        get: {
          summary: 'List all projects',
          operationId: 'listProjects',
          tags: ['Projects'],
          responses: {
            '200': {
              description: 'Array of projects retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Project'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'Create a new project',
          operationId: 'createProject',
          tags: ['Projects'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Project'
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Project created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Project'
                  },
                  example: {
                    id: 1,
                    name: "New Project",
                    description: "Description of the new project"
                  }
                }
              }
            },
            '400': {
              description: 'Bad request, validation failed for the data provided'
            },
            '401': {
              description: 'Unauthorized, valid JWT token is required'
            }
          }
        }
      },
      '/projects/{id}': {
        get: {
          summary: 'Get a specific project by ID',
          operationId: 'getProject',
          tags: ['Projects'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the project to retrieve',
              schema: {
                type: 'integer'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Project details retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Project'
                  }
                }
              }
            },
            '404': {
              description: 'Project not found'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Make sure to adjust the path to your route files correctly
};

const specs = swaggerJsdoc(options);
function swaggerDocs(app, port) {
  app.use('/', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;