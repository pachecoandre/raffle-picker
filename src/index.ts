import Server from "./server";
import db from './db'

db.connect(() => console.log('Connected to database'))

const server = new Server(process.env.PORT);
server.route();
server.listen();
