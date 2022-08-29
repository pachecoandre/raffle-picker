import { parseISO, isValid } from "date-fns";
import { Response } from "express";
import { CampaignsReq } from "../../server/middlewares";
import {
  getCampaigns,
  createCampaign,
  getCampaignById,
  updateCampaign,
  getRafflesCount,
  getPrizesCount,
} from "./model";

const getCampaignsController = async (req: CampaignsReq, res: Response) => {
  const campaigns = await getCampaigns(req.userId);
  res.send(campaigns);
};

const postCampaignsController = async (req: CampaignsReq, res: Response) => {
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
};

const getCampaignByIdController = async (req: CampaignsReq, res: Response) => {
  const { campaignId } = req.params;

  const campaignResult = await getCampaignById(campaignId);
  const campaign = campaignResult[0];
  const name = campaign?.name;
  const estimatedDrawDate = campaign?.estimated_draw_date;
  const rafflePrice = campaign?.raffle_price || 0;

  const rafflesCountResult = await getRafflesCount(campaignId);
  const rafflesCount = rafflesCountResult[0]?.count || 0;

  const revenue = rafflePrice * rafflesCount;

  const prizesCountResult = await getPrizesCount(campaignId);
  const prizesCount = prizesCountResult[0]?.count;

  res.send({
    name,
    estimatedDrawDate,
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
  await updateCampaign(campaignId, updates);
  res.sendStatus(204);
};

export default {
  getCampaignsController,
  postCampaignsController,
  getCampaignByIdController,
  updateCampaignController,
};
