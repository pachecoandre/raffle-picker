import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../../common/contants";
import UserModel from "./model";

const verifyGoogleToken = async (token: string) => {
  const client = new OAuth2Client(process.env.CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

const login = async (googleToken) => {
  const payload = await verifyGoogleToken(googleToken);
  const email = payload.email;

  let user = await UserModel.findOne(email);

  if (!user?.id) {
    await UserModel.insertOne({ name: payload.given_name, email });
    user = await UserModel.findOne(email);
  }
  const token = jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: "2 days" });

  return { token };
};

const verifyJwt = (token) => {
  return jwt.verify(token, JWT_PRIVATE_KEY);
};

export default {
  login,
  verifyJwt,
};
