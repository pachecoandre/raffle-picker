import { Router, Request } from "express";
import { getPrizes, createPrize } from "./services";

interface PrizeReq extends Request {
  campaignId?: string;
}

const prizeRouter = Router();

prizeRouter.get("/", async (req: PrizeReq, res) => {
  const campaignId = req.campaignId;
  const prizes = await getPrizes(campaignId);
  res.send(prizes);
});

prizeRouter.post("/", async (req: PrizeReq, res) => {
  const campaignId = req.campaignId;
  const { name, description } = req.body;
  await createPrize(name, description, campaignId);
  res.sendStatus(200);
});

export default prizeRouter;
