import { Router } from "express";
import db from "../../db";

const cursosRouter = Router();

cursosRouter.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.send(rows);
});

export default cursosRouter;
