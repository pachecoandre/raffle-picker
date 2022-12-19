import db from "../../db";
import { User } from "./types";

const findOne = async (email: string) => {
  const [[user]] = await db.query<any>(`
    SELECT * FROM users WHERE email="${email}"
  `);
  return user;
};

const insertOne = async ({ name, email }: User) => {
  const response = await db.query<any>(`
    INSERT INTO users (name, email) VALUEs ("${name}", "${email}")
  `);
  console.log(response);
  return response;
};

export default {
  findOne,
  insertOne,
};
