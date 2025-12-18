const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "E-Sport API",
    description: "API de gestion pour plateforme E-Sport",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  tags: [{ name: "Authentication" }, { name: "Users" }],
};

const outputFile = "./src/v1/swagger.json";
const routes = ["./src/index.js"];

swaggerAutogen(outputFile, routes, doc);
