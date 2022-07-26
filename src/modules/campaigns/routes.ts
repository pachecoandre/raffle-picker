import { Router } from "express";
import { createCampaign, getCampaigns } from "./service";
import prizeRoutes from "../prize/routes";
import raffleRoutes from "../raffles/routes";
import {
  authMiddleware,
  attachCampaign,
  CampaignsReq,
} from "../../server/middlewares";

const campaignRouter = Router();

campaignRouter.use(authMiddleware);

campaignRouter.get("/", async (req: CampaignsReq, res) => {
  const campaigns = await getCampaigns(req.userId);
  res.send(campaigns);
});

campaignRouter.post("/", async (req: CampaignsReq, res) => {
  const { name, estimatedDrawDate, rafflePrice } = req.body;

  if (!name || !estimatedDrawDate || !rafflePrice) {
    return res.status(400).send("Missing fields");
  }

  const campaignId = await createCampaign(
    req.userId,
    name,
    estimatedDrawDate,
    rafflePrice
  );

  res.status(201).send({ id: campaignId });
});

campaignRouter.use("/:campaignId/prizes", attachCampaign, prizeRoutes);

campaignRouter.use("/:campaignId/raffles", attachCampaign, raffleRoutes);

export default campaignRouter;
