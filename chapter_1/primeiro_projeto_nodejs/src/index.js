const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

// fake banco de dados
const customers = [];

/**
 * Dados de uma conta
 * cpf - string
 * name - string
 * id - uuid
 * statement - [] (extrato/lancamentos)
 */

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    //retorna verdade ou falso de acordo com a condicao
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get("/statement/:cpf", (request, response) => {
  const { cpf } = request.params;

  //retorna cliente a partir do cpf
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer doenst exists!" });
  }

  return response.json(customer.statement);
});

app.listen(3333);
