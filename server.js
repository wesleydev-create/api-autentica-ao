const express = require("express");
require("dotenv").config();

const routes = require("./src/routes");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(express.json());
app.use(routes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "Documentação da API de autenticação",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(8080, () => {
  console.log("Servidor da API rodando em http://localhost:8080");
  console.log("Swagger disponível em http://localhost:8080/api-docs");
});
