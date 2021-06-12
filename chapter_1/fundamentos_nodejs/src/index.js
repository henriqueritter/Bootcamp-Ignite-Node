const express = require("express");
const app = express();

// Middleware para receber JSON
app.use(express.json());

app.get("/courses", (request, response) => {
  const query = request.query;
  console.log(query); //print {page: '1', order: 'asc'}
  return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body); //print o arquivo JSON enviado
  return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

app.put("/courses/:id", (request, response) => {
  const params = request.params;
  console.log(params); //print {id: 1}

  const { id } = request.params;
  console.log(id); //print {1}
  return response.json(["Curso 6", "Curso 2", "Curso 3"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["Curso 6", "Curso 7", "Curso 3"]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["Curso 7", "Curso 3"]);
});

app.listen(3333);
