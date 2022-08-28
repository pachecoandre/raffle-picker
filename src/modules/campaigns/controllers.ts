import { CampaignsReq } from "../../server/middlewares";
import { getCampaigns, createCampaign } from "./service";

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
  const { campaignId } = req.params
}

export { getCampaignsController, postCampaignsController };
