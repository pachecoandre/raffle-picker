import { Router } from "express";
import raffleControllers from "./controllers";

const raffleRouter = Router();

raffleRouter.get("/", raffleControllers.getRafflesController);
raffleRouter.post("/", raffleControllers.postRafflesController);

export default raffleRouter;
