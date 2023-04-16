import { Router } from "express";
import userControllers from "./controllers";
import { authMiddleware } from "../../server/middlewares";

const usersRouter = Router();

usersRouter.get("/me", authMiddleware, userControllers.getUserController);
usersRouter.post("/login", userControllers.login);

export default usersRouter;
