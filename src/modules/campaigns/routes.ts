import { Request, Router } from "express";
import { createCampaign, getCampaigns } from "./service";
import prizeRoutes from "../prize/routes";

interface CampaignsReq extends Request {
  userId: string;
  campaignId?: string;
}

const campaignRouter = Router();

campaignRouter.use((req: CampaignsReq, res, next) => {
  const bearerToken = req.headers.authorization || "";
  const token = bearerToken.split(" ")[1];
  req.userId = token;

  if (!req.userId) {
    return res.sendStatus(401);
  }
  next();
});

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

campaignRouter.use(
  "/:campaignId/prizes",
  (req: CampaignsReq, _, next) => {
    req.campaignId = req.params.campaignId;
    next();
  },
  prizeRoutes
);

export default campaignRouter;
