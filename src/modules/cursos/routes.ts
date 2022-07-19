import { Router } from "express";
import db from "../../db";

const prizeRouter = Router();

prizeRouter.get("/", async (req, res) => {
  await new Promise((resolve, reject) => {
    db.query("SELECT * FROM cursos", (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log(results);
      resolve(results);
    });
  });
  res.sendStatus(200);
});

export default prizeRouter;
