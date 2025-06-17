export interface IConfig {
  PORT: number,
  NODE_ENV:string| undefined,
  DB_TYPE: string | undefined,
  DB_HOST: string | undefined,
  DB_PORT: number | undefined,
  DB_PASSWORD: string | undefined,
  DB_USERNAME: string | undefined,
  DB_NAME: string | undefined,
  DB_SYNC: boolean | undefined,
  DB_DROPSCHEMA: boolean | undefined,
  DB_LOGG: boolean | undefined,
  
}