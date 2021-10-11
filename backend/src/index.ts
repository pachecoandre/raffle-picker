import { config } from "dotenv";
import Server from "./server/bot.server";
import DB from './db'

const env = process.env.NODE_ENV || "development";
config({ path: `./config/${env}.env` });
console.log(`Env mode: ${env}.`);


DB.connect()

const server = new Server(process.env.PORT);
server.route();
server.listen();
