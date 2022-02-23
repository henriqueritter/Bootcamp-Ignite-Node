import { createConnection, getConnectionOptions, Connection } from "typeorm";

// Mudamos o metodo de conexao para rodar as seeds
// interface IOptions {
//   host: string;
// }
//
// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions;
//   newOptions.host = "database"; // nome que esta no docker-composer.yml
//   createConnection({
//     ...options,
//   });
// });

// host default = database, porem podemos trocar o host
export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_test"
          : defaultOptions.database,
    })
  );
};
