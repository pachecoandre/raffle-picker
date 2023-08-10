import { NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../common/contants";
import db from "../db";

export interface AuthRequest extends Request {
  userId: string;
}

export interface CampaignsReq extends AuthRequest {
  campaignId?: string;
}

type IJwtPayload = JwtPayload & { id: string };

const authMiddleware = (req: AuthRequest, res, next) => {
  try {
    const bearerToken = req.headers.authorization || "";
    const token = bearerToken.split(" ")[1];

    jwt.verify(token, JWT_PRIVATE_KEY);
    const { id } = jwt.decode(token) as IJwtPayload;
    if (!id) {
      return res.sendStatus(401);
    }
    req.userId = id;
    next();
    //
  } catch (error) {
    res.sendStatus(401);
  }
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
