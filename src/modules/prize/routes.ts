import { Router, Request } from "express";
import prizeControllers from "./controllers";

const prizeRouter = Router();

prizeRouter.get("/", prizeControllers.getPrizeController);

prizeRouter.post("/", prizeControllers.postPrizeController);

export default prizeRouter;
