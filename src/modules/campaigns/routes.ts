import { Router } from "express";
import prizeRoutes from "../prize/routes";
import raffleRoutes from "../raffles/routes";
import campaignControllers from "./controllers";
import { authMiddleware, attachCampaign } from "../../server/middlewares";

const campaignsRouter = Router();

campaignsRouter.use(authMiddleware);

campaignsRouter.get("/", campaignControllers.getCampaignsController);

campaignsRouter.post("/", campaignControllers.postCampaignsController);

campaignsRouter


campaignsRouter.get(
  "/:campaignId",
  campaignControllers.getCampaignByIdController
);

campaignsRouter.use("/:campaignId/prizes", attachCampaign, prizeRoutes);

campaignsRouter.use("/:campaignId/raffles", attachCampaign, raffleRoutes);

export default campaignsRouter;
