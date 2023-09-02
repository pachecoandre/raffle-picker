import { Request as Req, Response as Res } from "express";
import db from "../../db";
import UserService from "./service";

const login = async (req: Req, res: Res) => {
  const googleToken = req.body.googleToken;
  try {
    const payload = await UserService.login(googleToken);
    res.send(payload);
  } catch (error) {
    res.sendStatus(401);
  }
};

const verifyJwt = async (req: Req, res: Res) => {
  const token = req.body.token;
  try {
    await UserService.verifyJwt(token);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
  }
};

const getUserController = async (req, res) => {
  const [rows] = await db.query(`SELECT * FROM users WHERE id=${req.userId}`);
  res.send(rows);
};

export default { login, verifyJwt, getUserController };
