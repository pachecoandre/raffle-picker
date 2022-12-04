import db from "../../db";

const find = async ({ campaignId, offset, rows }) => {
  const [raffles] = await db.query(
    `SELECT r.id AS id, p.name AS participantName, p.phone AS participantPhone, p.email AS participantEmail, u.name AS sellerName, r.created_at AS date
    FROM users u
    JOIN user_relationships ur ON u.id=ur.user_id
    JOIN raffles r ON ur.id=r.seller_id
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

const findIds = async () => {
  const [prizeIds] = await db.query(`
    SELECT id FROM raffles WHERE campaign_id="9";
  `);
  return prizeIds
}

const create = async ({ name, phone, email, userId, campaignId }) => {
  const [uRelationships] = await db.query<any>(
    `SELECT * FROM user_relationships
    WHERE user_id=${userId} AND campaign_id=${campaignId}`
  );
  const [participant] = await db.query<any>(
    `INSERT INTO participants (name, phone, email)
    VALUES ("${name}", "${phone}", "${email}")`
  );
  const participantId = participant.insertId;

  const sellerId = uRelationships[0]?.id;

  return db.query(
    `INSERT INTO raffles (participant_id, seller_id, campaign_id)
    VALUES (${participantId}, ${sellerId}, ${campaignId})`
  );
};

const deleteOne = async ({ id, campaignId }) => {
  return db.query(
    `DELETE FROM raffles WHERE id=${id} AND campaign_id=${campaignId}`
  )
}

export default { find, findIds, create, deleteOne };
