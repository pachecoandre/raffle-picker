import db from "../../db";

const find = async (userId) => {
  const [campaigns] = await db.query(
    `SELECT c.id, c.name, c.estimated_draw_date, c.draw_date, c.raffle_price, user_id, role
    FROM campaigns c JOIN user_relationships
    ON user_relationships.campaign_id=c.id where role="admin" AND user_id=${userId};`
  );
  return campaigns;
};

const createOne = async (userId, name, estimatedDrawDate, rafflePrice) => {
  const [campaignRow] = await db.query<any>(
    `INSERT INTO campaigns (name, estimated_draw_date, raffle_price) VALUES ("${name}", "${estimatedDrawDate}", "${rafflePrice}")`
  );

  const campaignId = campaignRow.insertId;

  await db.query(
    `INSERT INTO user_relationships (user_id, campaign_id, role) VALUES (${userId}, ${campaignId}, "admin")`
  );

  return campaignId;
};

const findById = async (campaignId) => {
  const [campaign] = await db.query(
    `SELECT name, raffle_price, estimated_draw_date FROM campaigns WHERE id=${campaignId}`
  );
  return campaign;
};

const updateOne = async (campaignId, updates) => {
  const setArguments = [];

  if (updates.name) {
    setArguments.push(`name="${updates.name}"`);
  }
  if (updates.estimatedDrawDate) {
    setArguments.push(`estimated_draw_date="${updates.estimatedDrawDate}"`);
  }
  if (updates.drawDate) {
    setArguments.push(`draw_date="${updates.drawDate}"`);
  }
  const query = `UPDATE campaigns SET ${setArguments.join(
    ", "
  )} WHERE id=${campaignId}`;

  await db.query(query);
};

const getRafflesCount = async (campaignId) => {
  const [campaignsCount] = await db.query(
    `SELECT count(*) AS count FROM raffles WHERE campaign_id=${campaignId};`
  );
  return campaignsCount;
};

const getPrizesCount = async (campaignId) => {
  const [prizesCount] = await db.query(
    `SELECT count(*) AS count FROM prizes WHERE campaign_id=${campaignId}`
  );
  return prizesCount;
};

export {
  find,
  createOne,
  findById,
  updateOne,
  getRafflesCount,
  getPrizesCount,
};
