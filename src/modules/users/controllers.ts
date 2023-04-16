import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../../common/contants";
import db from "../../db";
import UserModel from "./model";
import UserService from "./service";

const login = async (req, res) => {
  const googleToken = req.body.googleToken;

  const payload = await UserService.verifyToken(googleToken);

  const email = payload.email;

  let user = await UserModel.findOne(email);

  if (!user?.id) {
    await UserModel.insertOne({ name: payload.given_name, email });
    user = await UserModel.findOne(email);
  }

  const token = jwt.sign(user, JWT_PRIVATE_KEY);

  res.send({ token });
};

const getUserController = async (req, res) => {
  const [rows] = await db.query(`SELECT * FROM users WHERE id=${req.userId}`);
  res.send(rows);
};

export default { login, getUserController };
