const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'E-Sport API',
    description: 'API de gestion pour plateforme E-Sport',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Serveur de développement',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          username: { type: 'string', example: 'johndoe' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      UserRegister: {
        type: 'object',
        required: ['email', 'username', 'password', 'firstName', 'lastName'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          username: { type: 'string', example: 'johndoe' },
          password: { type: 'string', format: 'password', example: 'SecurePass123!' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
        },
      },
      UserLogin: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', format: 'password', example: 'SecurePass123!' },
        },
      },
      UserUpdate: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email', example: 'newemail@example.com' },
          username: { type: 'string', example: 'newusername' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Message d\'erreur' },
        },
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Endpoints d\'authentification',
    },
    {
      name: 'Users',
      description: 'Endpoints de gestion des utilisateurs',
    },
  ],
};

const outputFile = './src/v1/swagger.json';
const routes = ['./src/index.js'];

swaggerAutogen(outputFile, routes, doc);

