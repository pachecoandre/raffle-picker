import { Router } from "express";

const prizeRouter = Router();

prizeRouter.get("/", async (req, res) => {
  res.send([]);
});

export default prizeRouter;
