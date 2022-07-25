import db from "../../db";

const createCampaign = async (userId, name, estimatedDrawDate, rafflePrice) => {
  const [campaignRow] = await db.query<any>(
    `insert into campaigns (name, estimated_draw_date, raffle_price) values ("${name}", "${estimatedDrawDate}", "${rafflePrice}")`
  );

  const campaignId = campaignRow.insertId;

  await db.query(
    `insert into user_relationships (user_id, campaign_id, role) values (${userId}, ${campaignId}, "admin")`
  );

  return campaignId;
};

export { createCampaign };
