import { Router } from "express";
import controllers from "./controllers";

const prizesRouter = Router();

prizesRouter.get("/", controllers.getPrizeController);

prizesRouter.post("/", controllers.postPrizeController);

prizesRouter.delete("/:prizeId", controllers.deletePrizeController);

export default prizesRouter;
