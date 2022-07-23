import { Router } from "express";
import db from '../../db'

const prizeRouter = Router();

prizeRouter.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM prizes");
  res.send(rows);
});

export default prizeRouter;
