import { parseISO, isValid } from "date-fns";
import { Response } from "express";
import { CampaignsReq } from "../../server/middlewares";
import { find, createOne, findById, updateOne } from "./model";
import PrizeModel from "../prize/model";
import RaffleModel from "../raffles/model";
import { drawService, getDrawResultService } from "./service";

const getCampaignsController = async (req: CampaignsReq, res: Response) => {
  const campaigns = await find(req.userId);
  res.send(campaigns);
};

const postCampaignsController = async (req: CampaignsReq, res: Response) => {
  const { name, estimatedDrawDate, rafflePrice } = req.body;

  if (!name || !estimatedDrawDate || !rafflePrice) {
    return res.status(400).send("Missing fields");
  }

  const campaignId = await createOne(
    req.userId,
    name,
    estimatedDrawDate,
    rafflePrice
  );

  res.status(201).send({ id: campaignId });
};

const getCampaignByIdController = async (req: CampaignsReq, res: Response) => {
  const { campaignId } = req.params;

  const campaignResult = await findById(campaignId);
  const campaign = campaignResult[0];
  const name = campaign?.name;
  const estimatedDrawDate = campaign?.estimated_draw_date;
  const drawDate = campaign?.draw_date;
  const rafflePrice = campaign?.raffle_price || 0;

  const rafflesCountResult = await RaffleModel.getRafflesCount(campaignId);
  const rafflesCount = rafflesCountResult[0]?.count || 0;

  const revenue = rafflePrice * rafflesCount;

  const prizesCountResult = await PrizeModel.getPrizeItemsCount(campaignId);
  const prizesCount = prizesCountResult[0]?.count;

  res.send({
    name,
    estimatedDrawDate,
    drawDate,
    rafflePrice,
    rafflesCount,
    revenue,
    prizesCount,
  });
};

const updateCampaignController = async (req: CampaignsReq, res: Response) => {
  const { campaignId } = req.params;
  const updates = req.body;
  if (!updates.name && !updates.estimatedDrawDate) {
    res.status(304).send();
  }
  if (updates.estimatedDrawDate) {
    const isValidDate = isValid(parseISO(updates.estimatedDrawDate));
    if (!isValidDate) {
      res.status(400).send({ message: "Date is not valid" });
      return;
    }
  }
  await updateOne(campaignId, updates);
  res.sendStatus(204);
};

const drawController = async (req: CampaignsReq, res: Response) => {
  const { campaignId } = req.params;
  await drawService(campaignId);
  res.sendStatus(200);
};

const getDrawResultController = async (req: CampaignsReq, res: Response) => {
  const { campaignId } = req.params;
  const result = await getDrawResultService(campaignId);
  res.send(result);
};

export default {
  getCampaignsController,
  postCampaignsController,
  getCampaignByIdController,
  updateCampaignController,
  drawController,
  getDrawResultController,
};
