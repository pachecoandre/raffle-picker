import { Router } from "express";
import db from "../../db";

const cursosRouter = Router();

cursosRouter.get("/", async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    db.execute("SELECT * FROM cursos", (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
  res.send(result);
});

export default cursosRouter;
