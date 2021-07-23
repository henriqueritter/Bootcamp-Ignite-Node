import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);
  // const date = new Date();

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXX')
    `
  );
  await connection.close(); // encerra conexao
}

create().then(() => console.log("User admin created!"));
