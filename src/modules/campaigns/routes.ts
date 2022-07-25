import { Router } from "express";
import db from "../../db";
import { createCampaign } from "./service";

const campaignRoutes = Router();

campaignRoutes.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM campaigns");
  res.send(rows);
});

campaignRoutes.post("/", async (req, res) => {
  const bearerToken = req.headers.authorization || "";
  const token = bearerToken.split(" ")[1];
  const userId = token;
  const { name, estimatedDrawDate, rafflePrice } = req.body;

  if (!userId) {
    return res.status(401);
  }

  if (!name || !estimatedDrawDate || !rafflePrice) {
    return res.status(400).send("Missing fields");
  }

  const campaignId = await createCampaign(
    userId,
    name,
    estimatedDrawDate,
    rafflePrice
  );

  res.status(201).send({ id: campaignId });
});

export default campaignRoutes;
