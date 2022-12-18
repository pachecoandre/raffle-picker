import db from "../../db";
import UserModel from "./model";
import UserService from "./service";

const login = async (req, res) => {
  const token = req.body.token;

  // verify token and get payload
  const payload = await UserService.verifyToken(token);

  // get email from token
  const email = payload.email;

  // find user
  const user = await UserModel.findOne(email);

  // if user does not exist, create user
  // if exists, send user id
  
  res.send(payload);
};

const getUserController = async (_, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.send(rows);
};

export default { login, getUserController };
