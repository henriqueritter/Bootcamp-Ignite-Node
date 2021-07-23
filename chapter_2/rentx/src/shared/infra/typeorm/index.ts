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

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: "database",
    })
  );
};
