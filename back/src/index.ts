import { AppDataSource } from "./config/data-source";
import { config } from "./config/envs";
import server from "./server";
import "reflect-metadata";

AppDataSource.initialize()
  .then(() => {
    console.info("DB connection successfully established");
    server.listen(config.PORT, () => {
      console.info(`Server up and running on http://localhost:${config.PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error(`Error al conectar a la base de datos: ${error}`);
  });
