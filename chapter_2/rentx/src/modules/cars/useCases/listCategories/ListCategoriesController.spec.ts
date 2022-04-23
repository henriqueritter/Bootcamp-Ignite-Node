import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories", () => {
  beforeAll(async () => {
    connection = await createConnection(); // cria connection
    await connection.runMigrations(); // executa as migrations

    // cria um usuario admin no DB
    const id = uuid();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to list all categories", async () => {
    // recupera token do admin para criar uma category
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    // cria uma category como massa de test
    const responseCreate = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer: ${refresh_token}`,
      });

    // expect(responseCreate.status).toBe(201);

    // busca as categories
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
    expect(response.body[0].description).toEqual("Category Supertest");
  });
});
