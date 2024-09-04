const yaml = require('yamljs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const components = yaml.load('./docs/components.yaml');
const auth = yaml.load('./docs/auth.yaml');
const category = yaml.load('./docs/categories.yaml');
const book = yaml.load('./docs/books.yaml');

const allSwagger = {
  ...components,
  paths: {
    ...auth,
    ...category,
    ...book
  }
}

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management System API",
      version: "1.0.0",
      description: "API documentation for the Book Management System"
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
        description: "Development server"
      }
    ],
    ...allSwagger,
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-auth-token"
        }
      }
    },
    security: [{
      ApiKeyAuth: []
    }]
  },
  apis: [],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
