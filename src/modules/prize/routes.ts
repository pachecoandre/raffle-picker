import { Router } from "express";
import prizeControllers from "./controllers";

const prizesRouter = Router();

prizesRouter.get("/", prizeControllers.getPrizeController);

prizesRouter.post("/", prizeControllers.postPrizeController);

prizesRouter.delete("/:prizeId", prizeControllers.deletePrizeController);

export default prizesRouter;
