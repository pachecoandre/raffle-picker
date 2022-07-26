import { Request } from "express";

export interface AuthRequest extends Request {
  userId: string;
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

export { authMiddleware };
