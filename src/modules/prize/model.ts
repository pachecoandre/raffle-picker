import db from "../../db";

const find = async ({ campaignId, offset, rows }) => {
  const [prizes] = await db.query(
    `SELECT p.id, p.name, p.description, p.imageUrl, count(pi.id) AS quantity
    FROM campaigns
    JOIN prizes AS p ON campaigns.id=campaign_id
    JOIN prize_items AS pi ON pi.prize_id=p.id
    WHERE campaign_id=${campaignId}
    GROUP BY pi.prize_id
    LIMIT ${offset}, ${rows}
    `
  );
  const [totalRows] = await db.query(`
    SELECT count(*) AS count FROM prizes WHERE campaign_id=${campaignId}
  `);

  return { totalRows: totalRows[0].count, data: prizes };
};

const createMany = async (name, description, quantity, campaignId) => {
  const [prize] = await db.query<any>(
    `INSERT INTO prizes (name, description, campaign_id) values ("${name}", "${description}", ${campaignId})`
  );
  for (let i = 0; i < quantity; i++) {
    await db.query(
      `INSERT INTO prize_items (prize_id) values (${prize.insertId})`
    );
  }
};

const deleteOne = (prizeId) => {
  // Cascade delete. This query deletes both prize and prize_item
  return db.query(`DELETE FROM prizes WHERE id=${prizeId}`);
};

const findIds = async (campaignId) => {
  const [prizeIds] = await db.query(`
    SELECT pi.id FROM prizes AS p JOIN prize_items AS pi ON p.id=pi.prize_id WHERE campaign_id="${campaignId}"
  `);
  return prizeIds;
};

const updatePrizeItem = async (id, raffleId) => {
  await db.query(
    `UPDATE prize_items SET raffle_id="${raffleId}" WHERE id=${id}`
  );
};

const findDrawResult = async (campaignId) => {
  const [drawResult] = await db.query<any>(
    `SELECT p.name as prizeName, pt.name as winnerName, pt.phone as winnerPhone
    FROM prizes AS p JOIN prize_items AS pi ON p.id=pi.prize_id JOIN raffles as r ON r.id=pi.raffle_id JOIN participants as pt ON r.participant_id=pt.id
    WHERE p.campaign_id="${campaignId}";`
  );
  return drawResult;
};

export default {
  find,
  createMany,
  deleteOne,
  findIds,
  updatePrizeItem,
  findDrawResult,
};
