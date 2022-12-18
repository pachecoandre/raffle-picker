import { OAuth2Client } from "google-auth-library";

const verifyToken = async (token: string) => {
  const client = new OAuth2Client(process.env.CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

export default {
  verifyToken,
};
