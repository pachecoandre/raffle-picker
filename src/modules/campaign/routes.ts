import { Router } from "express";
import prizeRoutes from "../prize/routes";
import raffleRoutes from "../raffles/routes";
import controllers from "./controllers";
import { authMiddleware, attachCampaign } from "../../server/middlewares";

const campaignsRouter = Router();

campaignsRouter.use(authMiddleware);

campaignsRouter.get("/", controllers.getCampaignsController);

campaignsRouter.post("/", controllers.postCampaignsController);

campaignsRouter.get(
  "/:campaignId",
  attachCampaign,
  controllers.getCampaignByIdController
);

campaignsRouter.patch(
  "/:campaignId",
  attachCampaign,
  controllers.updateCampaignController
);

campaignsRouter.post(
  "/:campaignId/draw",
  attachCampaign,
  controllers.drawController
);

campaignsRouter.get(
  "/:campaignId/draw",
  attachCampaign,
  controllers.getDrawResultController
);

campaignsRouter.use("/:campaignId/prizes", attachCampaign, prizeRoutes);

campaignsRouter.use("/:campaignId/raffles", attachCampaign, raffleRoutes);

export default campaignsRouter;
