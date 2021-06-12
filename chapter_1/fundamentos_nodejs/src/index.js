const express = require("express");
const app = express();

app.get("/method_send", (request, response) => {
  return response.send("Hello Send Method");
});

app.get("/method_json", (request, response) => {
  return response.json({ message: "Hello JSON" });
});

app.listen(3333);
