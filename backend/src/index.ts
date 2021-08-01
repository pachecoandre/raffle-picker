import { config } from "dotenv";
import mongoose from "mongoose";
import Server from "./server/bot.server";

const env = process.env.NODE_ENV || "development";
config({ path: `./config/${env}.env` });
console.log(`Env mode: ${env}.`);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to database"));

const server = new Server(process.env.PORT);
server.route();
server.listen();
