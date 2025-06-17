import express from "express";
import morgan from "morgan";
import cors from "cors";
import {config} from "./config/envs";
import router from "./routes/indexRouter";

const server = express();

server.use(express.json());
server.use(morgan(config.NODE_ENV == "production" ? "combined" : "dev"));
server.use(cors());

server.use(router);

export default server;
