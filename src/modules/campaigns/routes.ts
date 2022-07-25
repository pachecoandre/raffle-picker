import { Request, Router } from "express";
import db from "../../db";
import { createCampaign } from "./service";

interface CampaignsReq extends Request {
  userId: string;
}

const campaignRoutes = Router();

campaignRoutes.use((req: CampaignsReq, res, next) => {
  const bearerToken = req.headers.authorization || "";
  const token = bearerToken.split(" ")[1];
  req.userId = token;

  if (!req.userId) {
    return res.sendStatus(401);
  }
  next();
});

campaignRoutes.get("/", async (req: CampaignsReq, res) => {
  const [rows] = await db.query(
    `SELECT c.id, c.name, c.estimated_draw_date, c.draw_date, c.raffle_price, user_id, role
    FROM campaigns c JOIN user_relationships
    ON user_relationships.campaign_id=id where role="admin" AND user_id=${req.userId};`
  );
  res.send(rows);
});

campaignRoutes.post("/", async (req: CampaignsReq, res) => {
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
});

export default campaignRoutes;
