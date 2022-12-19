import db from "../../db";
import UserModel from "./model";
import UserService from "./service";

const login = async (req, res) => {
  const token = req.body.token;

  const payload = await UserService.verifyToken(token);

  const email = payload.email;

  let user = await UserModel.findOne(email);

  if (user?.id) {
    return res.send(user);
  }

  await UserModel.insertOne({ name: payload.given_name, email });
  user = await UserModel.findOne(email);

  res.send(user);
};

const getUserController = async (_, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.send(rows);
};

export default { login, getUserController };
