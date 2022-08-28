import { Router } from "express";
import prizeRoutes from "../prize/routes";
import raffleRoutes from "../raffles/routes";
import { getCampaignsController, postCampaignsController } from "./controllers";
import { authMiddleware, attachCampaign } from "../../server/middlewares";

const campaignRouter = Router();

campaignRouter.use(authMiddleware);

campaignRouter.get("/", getCampaignsController);

campaignRouter.post("/", postCampaignsController);

campaignRouter.use("/:campaignId/prizes", attachCampaign, prizeRoutes);

campaignRouter.use("/:campaignId/raffles", attachCampaign, raffleRoutes);

export default campaignRouter;
