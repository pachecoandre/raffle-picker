import { Router } from "express";
import prizeRoutes from "../modules/prize/routes";
import userRoutes from "../modules/users/routes";
import campaignRoutes from "../modules/campaigns/routes";

const router = Router();

router.use("/prizes", prizeRoutes);
router.use("/users", userRoutes);
router.use("/campaigns", campaignRoutes);

export default router;
