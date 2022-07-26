import { NextFunction, Request } from "express";
import db from "../db";

export interface AuthRequest extends Request {
  userId: string;
}

export interface CampaignsReq extends AuthRequest {
  campaignId?: string;
}

const authMiddleware = (req: AuthRequest, res, next) => {
  const bearerToken = req.headers.authorization || "";
  const token = bearerToken.split(" ")[1];
  req.userId = token;

  if (!req.userId) {
    return res.sendStatus(401);
  }
  next();
};

const attachCampaign = async (req: CampaignsReq, _, next: NextFunction) => {
  const campaignId = req.params.campaignId;
  const userId = req.userId;
  const [uRelationships] = await db.query<any>(
    `SELECT * FROM user_relationships WHERE user_id=${userId} AND campaign_id=${campaignId}`
  );

  if (uRelationships.length === 0) {
    next(new Error("Campaign does not belong to user"));
  }
  req.campaignId = campaignId;

  next();
};

export { authMiddleware, attachCampaign };
