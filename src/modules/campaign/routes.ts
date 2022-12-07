import { Router } from "express";
import prizeRoutes from "../prize/routes";
import raffleRoutes from "../raffles/routes";
import controllers from "./controllers";
import { authMiddleware, attachCampaign } from "../../server/middlewares";

const campaignsRouter = Router();

campaignsRouter.use(authMiddleware);

campaignsRouter.get("/", controllers.getCampaignsController);

campaignsRouter.post("/", controllers.postCampaignsController);

campaignsRouter.get("/:campaignId", controllers.getCampaignByIdController);

campaignsRouter.patch("/:campaignId", controllers.updateCampaignController);

campaignsRouter.post("/:campaignId/draw", controllers.drawController);

campaignsRouter.get("/:campaignId/draw", controllers.getDrawResultController);

campaignsRouter.use("/:campaignId/prizes", attachCampaign, prizeRoutes);

campaignsRouter.use("/:campaignId/raffles", attachCampaign, raffleRoutes);

export default campaignsRouter;
