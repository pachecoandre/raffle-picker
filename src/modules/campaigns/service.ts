import db from "../../db";

const getCampaigns = async (userId) => {
  
  const [campaigns] = await db.query(
    `SELECT c.id, c.name, c.estimated_draw_date, c.draw_date, c.raffle_price, user_id, role
    FROM campaigns c JOIN user_relationships
    ON user_relationships.campaign_id=c.id where role="admin" AND user_id=${userId};`
  );
  return campaigns;
};

const createCampaign = async (userId, name, estimatedDrawDate, rafflePrice) => {
  const [campaignRow] = await db.query<any>(
    `INSERT INTO campaigns (name, estimated_draw_date, raffle_price) VALUES ("${name}", "${estimatedDrawDate}", "${rafflePrice}")`
  );

  const campaignId = campaignRow.insertId;

  await db.query(
    `INSERT INTO user_relationships (user_id, campaign_id, role) VALUES (${userId}, ${campaignId}, "admin")`
  );

  return campaignId;
};

export { getCampaigns, createCampaign };
