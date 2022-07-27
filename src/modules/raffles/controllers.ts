import RaffleModel from "./model";
import { AuthRequest } from "../../server/middlewares";

interface RaffleReq extends AuthRequest {
  campaignId?: string;
}

const getRafflesController = async (req: RaffleReq, res) => {
  const campaignId = req.campaignId;
  const raffles = await RaffleModel.find({ campaignId });
  res.send(raffles);
};

const postRafflesController = async (req: RaffleReq, res) => {
  const campaignId = req.campaignId;
  const userId = req.userId;
  const { name, phone, email } = req.body;
  await RaffleModel.create({ name, phone, email, userId, campaignId });
  res.sendStatus(200);
};

export default { getRafflesController, postRafflesController };
