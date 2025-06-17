import { DataSource } from "typeorm";
import { config } from "./envs";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: config.DB_SYNC,
  dropSchema: config.DB_DROPSCHEMA,
  logging: config.DB_LOGG,
  entities: ["src/entities/**/*.ts"],
});
