import "dotenv/config";

import Server from "./server";
import db from "./db";

(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 15000));
    try {
      await db.getConnection();
      console.log("connected to database");
    } catch (error) {
      console.error('Error connecting to database:', error.message);
    }
})()

const server = new Server();
server.route();
server.listen(process.env.PORT);
