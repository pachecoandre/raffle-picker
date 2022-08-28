import { Router } from "express";
import prizeRoutes from "../prize/routes";
import raffleRoutes from "../raffles/routes";
import campaignControllers from "./controllers";
import { authMiddleware, attachCampaign } from "../../server/middlewares";

const campaignRouter = Router();

campaignRouter.use(authMiddleware);

campaignRouter.get("/", campaignControllers.getCampaignsController);

campaignRouter.post("/", campaignControllers.postCampaignsController);

campaignRouter.get(
  "/:campaignId",
  campaignControllers.getCampaignByIdController
);

campaignRouter.use("/:campaignId/prizes", attachCampaign, prizeRoutes);

campaignRouter.use("/:campaignId/raffles", attachCampaign, raffleRoutes);

export default campaignRouter;
