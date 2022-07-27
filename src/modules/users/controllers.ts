import db from "../../db";

const getUserController = async (_, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.send(rows);
};

export default { getUserController };
