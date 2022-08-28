import { CampaignsReq } from "../../server/middlewares";
import {
  getCampaigns,
  createCampaign,
  getCampaignById,
  getRafflesCount,
  getPrizesCount,
} from "./service";

const getCampaignsController = async (req: CampaignsReq, res) => {
  const campaigns = await getCampaigns(req.userId);
  res.send(campaigns);
};

const postCampaignsController = async (req: CampaignsReq, res) => {
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

const getCampaignByIdController = async (req: CampaignsReq, res) => {
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

export default {
  getCampaignsController,
  postCampaignsController,
  getCampaignByIdController,
};
