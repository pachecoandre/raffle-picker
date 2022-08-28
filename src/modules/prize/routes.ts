import { Router } from "express";
import prizeControllers from "./controllers";

const prizesRouter = Router();

prizesRouter.get("/", prizeControllers.getPrizeController);

prizesRouter.post("/", prizeControllers.postPrizeController);

prizesRouter.patch("/", prizeControllers.patchPrizeController);

export default prizesRouter;
