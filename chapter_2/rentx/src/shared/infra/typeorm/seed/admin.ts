import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuid();
  const password = await hash("admin", 8);
  // const date = new Date();

  await connection.query(
    `INSERT INTO USERS(id,name,email,password,admin,created_at)
    values(${id}, 'admin', 'admin@rentx.com', ${password}, true, ${new Date()})`
  );
}

create().then(() => console.log("User admin created!"));
