import mysql from "mysql2";

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 20,
});

export default db.promise();
