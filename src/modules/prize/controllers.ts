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
  const { name, description } = req.body;
  await PrizeModel.insert(name, description, campaignId);
  res.sendStatus(201);
};

export default { getPrizeController, postPrizeController };
