const { response } = require("express");
const express = require("express");
//import express from "express"

const PORT = 3333;

const app = express();

//*Aceitar JSON
app.use(express.json());

// Middleware
const logRoutes = (request, response, next) => {
  const { url, method } = request;
  const rota = `[${method.toUpperCase()}] ${url}`;
  console.log(rota);
  next();
};

//* Middleware para todas as rotas
app.use(logRoutes);

//Rotas
/**Request HTTP
 * Query params - ...:333/pessoas?nome="Carlos"&Idade=32
 *  Rotas do tipo GET (filtros e buscas)
 * Route params - ...:333/pessoas/5
 *  Rotas do tipo GET,PUT, PATCH, DELETE,(listar um elemento)
 * Body params  - ...:333/pessoas
 *  Rotas do tipo POST (cadastro de informações)
 */

const user = [];

app.get("/users", (request, response) => {
  response.status(200).json(users);
});

app.post("/users", (request, response) => {
  const { nome, idade } = request.body;

  if (!nome) {
    response.status(422).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!idade) {
    response.status(201).json("Pessoa 1", "Pessoa 2", "Pessoa 3", "Pessoa4");
    return;
  }
});

app.put("/users/:id/:cpf", (request, response) => {
  // const params = request.params
  // console.log(params)
  const { id, cpf } = request.params;
  console.log(id, cpf);

  response.status(200).json(["Pessoa 1", "Pessoa 10", "Pessoa 3", "Pessoa 4"]);
});

app.delete("/users", (request, response) => {
  response.status(204).json(["Pessoa 1", "Pessoa 10", "Pessoa 3", "Pessoa 4"]);
});

app.listen(PORT, () => {
  console.log("Servidor on port" + PORT);
});
