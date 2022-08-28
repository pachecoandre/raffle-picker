import { Request } from "express";
import PrizeModel from "./model";

interface PrizeReq extends Request {
  campaignId?: string;
}

const getPrizeController = async (req: PrizeReq, res) => {
  const campaignId = req.campaignId;
  const prizes = await PrizeModel.find(campaignId);
  res.send(prizes);
};

const postPrizeController = async (req: PrizeReq, res) => {
  const campaignId = req.campaignId;
  const { name, description, quantity = 1 } = req.body;

  if (typeof quantity !== "number" || quantity < 1 || quantity > 1000) {
    res.status(400).send({ message: "Invalid quantity" });
    return;
  }
  await PrizeModel.createMany(name, description, quantity, campaignId);
  res.sendStatus(201);
};

const patchPrizeController = async (req: PrizeReq, res) => {
  const campaignId = req.campaignId;
  const { name, description } = req.body;
  res.sendStatus(201);
};

export default {
  getPrizeController,
  postPrizeController,
  patchPrizeController,
};
