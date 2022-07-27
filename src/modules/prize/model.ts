import db from "../../db";

const find = async (campaignId) => {
  const [prizes] = await db.query(
    `SELECT p.id, p.name, p.description, p.imageUrl, count(pi.id) AS quantity
    FROM campaigns
    JOIN prizes AS p ON campaigns.id=campaign_id
    JOIN prize_items AS pi ON pi.prize_id=p.id
    WHERE campaign_id=${campaignId}
    GROUP BY pi.prize_id;`
  );
  return prizes;
};

const insert = async (name, description, campaignId) => {
  const [prize] = await db.query<any>(
    `INSERT INTO prizes (name, description, campaign_id) values ("${name}", "${description}", ${campaignId})`
  );
  const prizeId = prize.insertId;

  return db.query(`INSERT INTO prize_items (prize_id) values (${prizeId})`);
};

export default { find, insert };
