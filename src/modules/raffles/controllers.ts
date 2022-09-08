import RaffleModel from "./model";
import { AuthRequest } from "../../server/middlewares";

interface RaffleReq extends AuthRequest {
  campaignId?: string;
  query: {
    page?: string;
    limit?: string;
  };
}

const getRafflesController = async (req: RaffleReq, res) => {
  const campaignId = req.campaignId;
  const { page = "0", limit = "20" } = req.query;
  let offset = parseInt(page) * parseInt(limit);
  const rows = parseInt(limit);

  const data = await RaffleModel.find({ campaignId, offset, rows });
  res.send(data);
};

const postRafflesController = async (req: RaffleReq, res) => {
  const campaignId = req.campaignId;
  const userId = req.userId;
  const { name, phone, email } = req.body;

  let { quantity = 1 } = req.body;
  quantity = parseInt(quantity);

  if (isNaN(quantity)) {
    res.status(400).send({ message: "Quantity must be a number" });
    return;
  }
  if (quantity < 0) {
    res.status(400).send({ message: "Quantity must be greater than zero" });
    return;
  }
  if (quantity > 100) {
    res.status(400).send({ message: "Quantity is limited to 100" });
    return;
  }
  for (let i = 0; i < quantity; i++) {
    await RaffleModel.create({ name, phone, email, userId, campaignId });
  }
  res.sendStatus(200);
};

export default { getRafflesController, postRafflesController };
