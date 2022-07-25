import db from "../../db";

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

export { createCampaign };
