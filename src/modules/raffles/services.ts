import db from "../../db";

const getRaffles = async (campaignId) => {
  const [prizes] = await db.query(
    `SELECT * FROM raffles WHERE campaign_id=${campaignId}`
  );
  return prizes;
};

const createRaffle = async (name, phone, email, userId, campaignId) => {
  const [participant] = await db.query<any>(
    `INSERT INTO participants (name, phone, email)
    VALUES ("${name}", "${phone}", "${email}")`
  );
  const participantId = participant.insertId;

  const [uRelationships] = await db.query<any>(
    `SELECT * FROM user_relationships
    WHERE user_id=${userId} AND campaign_id=${campaignId}`
  );
  const sellerId = uRelationships[0]?.id;

  return db.query(
    `INSERT INTO raffles (participant_id, seller_id, campaign_id)
    VALUES (${participantId}, ${sellerId}, ${campaignId})`
  );
};

export { getRaffles, createRaffle };
