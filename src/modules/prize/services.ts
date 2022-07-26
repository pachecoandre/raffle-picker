import db from "../../db";

const getPrizes = async (campaignId) => {
  const [prizes] = await db.query(
    `SELECT p.id, p.name, p.description, p.imageUrl FROM campaigns JOIN prizes p ON campaigns.id=campaign_id WHERE campaign_id=${campaignId}`
  );
  return prizes;
};

const createPrize = async (name, description, campaignId) => {
  const [prize] = await db.query<any>(
    `INSERT INTO prizes (name, description, campaign_id) values ("${name}", "${description}", ${campaignId})`
  );
  const prizeId = prize.insertId;

  return db.query(`INSERT INTO prize_items (prize_id) values (${prizeId})`);
};

export { getPrizes, createPrize };
