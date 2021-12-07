import { config } from "dotenv";
import Server from "./server";
import DB from './db'

// environment variables import
const env = process.env.NODE_ENV || "development";
config({ path: `./config/${env}.env` });
console.log(`Env mode: ${env}.`);

// database
DB.connect()

// start server
const server = new Server(process.env.PORT);
server.route();
server.listen();
