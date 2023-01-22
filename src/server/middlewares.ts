import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../common/contants";
import db from "../db";

export interface AuthRequest extends Request {
  userId: string;
}

export interface CampaignsReq extends AuthRequest {
  campaignId?: string;
}

const authMiddleware = (req: AuthRequest, res, next) => {
  // verificar como obter obter o userId
  // criar um jwt com o id codificado?
  // ou usar algum id do jwt do google?

  const bearerToken = req.headers.authorization || "";
  const token = bearerToken.split(" ")[1];
  const { id } = jwt.verify(token, JWT_PRIVATE_KEY);
  req.userId = id;

  if (!id) {
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
