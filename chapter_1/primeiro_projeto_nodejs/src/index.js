const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

// fake banco de dados
const customers = [];

//Middleware de validação de conta
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  // objeto(customer) que será repassado após o middleware
  request.customer = customer;

  return next();
}

function getBalance(statement) {
  // accumulator é a variavel responsavel por armazenar o valor que estamos adicionando ou removendo do objeto(operation)
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
    // inicia o reduce em zero
  }, 0);

  return balance;
}

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

// segunda forma de chamar um middlware(chama para todas as rotas abaixo)
// app.use(verifyIfExistsAccountCPF);

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };
  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;

  const { customer } = request;
  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds!" });
  }
  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };
  customer.statement.push(statementOperation);

  return response.status(201).send();
});

// exemplo: http://localhost:3333/statement/date?date=2021-06-15
app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const { date } = request.query;

  // hackzinho para pegar o dia que é passado via query param
  const dateFormat = new Date(date + " 00:00");

  // filtra a data procurando onde ela seja igual a do statement
  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  // se não encontrar retorna erro
  if (!statement) {
    return response.status(400).json({ error: "Statements not found." });
  }

  return response.json(statement);
});

app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;
  return response.status(201).send();
});

app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

app.listen(3333);
