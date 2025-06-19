"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    NODE_ENV: process.env.NODE_ENV,
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_NAME: process.env.DB_NAME,
    DB_SYNC: process.env.DB_SYNC ? process.env.DB_SYNC === "true" : true,
    DB_DROPSCHEMA: process.env.DB_DROPSCHEMA ? process.env.DB_DROPSCHEMA === "true" : true,
    DB_LOGG: process.env.DB_LOGG ? process.env.DB_LOGG === "true" : true,
};
