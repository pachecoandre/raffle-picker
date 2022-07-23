import { Console } from "console";
import { Router } from "express";
import db from "../../db";

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

  if (!name || !estimatedDrawDate || !rafflePrice) {
    res.status(400).send("Missing fields")
  }

  await db.query(
    `INSERT INTO campaigns (name, estimated_draw_date, raffle_price) values ("${name}", "${estimatedDrawDate}", "${rafflePrice}")`
  );
  res.send([]);
});

export default campaignRoutes;
