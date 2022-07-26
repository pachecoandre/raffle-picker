import { Router } from "express";
import { getRaffles, createRaffle } from "./services";
import { AuthRequest } from "../../server/middlewares";

interface RaffleReq extends AuthRequest {
  campaignId?: string;
}

const raffleRouter = Router();

raffleRouter.get("/", async (req: RaffleReq, res) => {
  const campaignId = req.campaignId;
  const raffles = await getRaffles(campaignId);
  res.send(raffles);
});

raffleRouter.post("/", async (req: RaffleReq, res) => {
  const campaignId = req.campaignId;
  const userId = req.userId;
  const { name, phone, email } = req.body;  
  await createRaffle(name, phone, email, userId, campaignId);
  res.sendStatus(200);
});

export default raffleRouter;
