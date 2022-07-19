import mysql from "mysql2";
import { config } from "dotenv";

const env = process.env.NODE_ENV || "development";
config({ path: `./config/${env}.env` });

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

export default db;
