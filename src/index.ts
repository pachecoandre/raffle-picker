import "dotenv/config";

import Server from "./server";
import db from "./db";

db.getConnection().then(() => console.log("connected to database"));

const server = new Server(process.env.PORT);
server.route();
server.listen();
