import db from "../../db";

const find = async ({ campaignId, offset, rows }) => {
  const [raffles] = await db.query(
    `SELECT r.id AS id, p.name AS participantName, p.phone AS participantPhone, p.email AS participantEmail, u.name AS sellerName, r.created_at AS date
    FROM users u
    JOIN user_relationships ur ON u.id=ur.user_id
    JOIN campaigns c ON ur.campaign_id=c.id
    JOIN raffles r ON c.id=r.campaign_id
    JOIN participants p ON r.participant_id=p.id
    WHERE r.campaign_id=${campaignId}
    LIMIT ${offset}, ${rows}
    `
  );
  const [totalRows] = await db.query(`
    SELECT count(*) AS count FROM raffles WHERE raffles.campaign_id=${campaignId};
  `);
  return { totalRows: totalRows[0].count, data: raffles };
};

const getRafflesCount = async (campaignId) => {
  const [campaignsCount] = await db.query(
    `SELECT count(*) AS count FROM raffles WHERE campaign_id=${campaignId};`
  );
  return campaignsCount;
};

const findIds = async (campaignId) => {
  const [prizeIds] = await db.query(`
    SELECT id FROM raffles WHERE campaign_id="${campaignId}";
  `);
  return prizeIds;
};

const create = async ({ name, phone, email, userId, campaignId }) => {
  const [participant] = await db.query<any>(
    `INSERT INTO participants (name, phone, email)
    VALUES ("${name}", "${phone}", "${email}")`
  );
  const participantId = participant.insertId;

  return db.query(
    `INSERT INTO raffles (participant_id, seller_id, campaign_id)
    VALUES (${participantId}, ${userId}, ${campaignId})`
  );
};

const deleteOne = async ({ id, campaignId }) => {
  return db.query(
    `DELETE FROM raffles WHERE id=${id} AND campaign_id=${campaignId}`
  );
};

export default { find, getRafflesCount, findIds, create, deleteOne };
