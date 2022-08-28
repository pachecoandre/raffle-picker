import { Router } from "express";
import raffleControllers from "./controllers";

const rafflesRouter = Router();

rafflesRouter.get("/", raffleControllers.getRafflesController);
rafflesRouter.post("/", raffleControllers.postRafflesController);

export default rafflesRouter;
