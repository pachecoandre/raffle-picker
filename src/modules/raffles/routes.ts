import { Router } from "express";
import controllers from "./controllers";

const rafflesRouter = Router();

rafflesRouter.get("/", controllers.getRafflesController);
rafflesRouter.post("/", controllers.postRafflesController);
rafflesRouter.delete("/:id", controllers.deleteRaffleController)

export default rafflesRouter;
