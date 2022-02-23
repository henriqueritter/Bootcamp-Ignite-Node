import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", async () => {
  beforeEach(async () => {
    connection = await createConnection();

    const id = uuid();
    const password = await hash("admin", 8);
    // const date = new Date();

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXX')
      `
    );
  });

  it("should be albe to create a new category", async () => {
    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    });

    expect(response.status).toBe(201);
  });
});
