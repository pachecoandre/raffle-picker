import { Router, Request } from "express";
import prizeControllers from "./controllers";

interface PrizeReq extends Request {
  campaignId?: string;
}

const prizeRouter = Router();

prizeRouter.get("/", prizeControllers.getPrizeController);

prizeRouter.post("/", prizeControllers.postPrizeController);

export default prizeRouter;
