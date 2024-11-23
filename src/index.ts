import "dotenv/config";

import Server from "./server";
import db from "./db";

db.getConnection().then(() => console.log("connected to database"));

const server = new Server();
server.route();
server.listen(process.env.PORT);
