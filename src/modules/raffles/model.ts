import db from "../../db";

const find = async ({ campaignId }) => {
  const [raffles] = await db.query(
    `SELECT p.name AS participant_name, p.phone AS participant_phone, p.email AS participant_email, u.name AS seller_name, r.created_at AS date
    FROM users u
    JOIN user_relationships ur ON u.id=ur.user_id
    JOIN raffles r ON ur.id=r.seller_id
    JOIN participants p ON r.participant_id=p.id
    WHERE r.campaign_id=${campaignId}`
  );
  return raffles;
};

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

export default { find, create };
