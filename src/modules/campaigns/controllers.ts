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
  const campaign = await getCampaignById(campaignId);
  const rafflesCount = await getRafflesCount(campaignId);
  const prizesCount = await getPrizesCount(campaignId);
  res.send({
    ...campaign[0],
    rafflesCount: rafflesCount[0]?.count,
    prizesCount: prizesCount[0]?.count,
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
