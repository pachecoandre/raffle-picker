import { Router, Request } from "express";
import db from "../../db";

interface PrizeReq extends Request {
  campaignId?: string;
}

const prizeRouter = Router();

prizeRouter.get("/", async (req: PrizeReq, res) => {
  const [rows] = await db.query("SELECT * FROM prizes");
  res.send(rows);
});

prizeRouter.post("/", async (req: PrizeReq, res) => {
  const campaignId = req.campaignId;
  const { name, description } = req.body;

  const [prize] = await db.query<any>(
    `INSERT INTO prizes (name, description, campaign_id) values ("${name}", "${description}", ${campaignId})`
  );
  const prizeId = prize.insertId;

  await db.query(`INSERT INTO prize_items (prize_id) values (${prizeId})`);

  res.sendStatus(200);
});

export default prizeRouter;
