import { Router } from "express";
import userControllers from "./controllers";
import { authMiddleware } from "../../server/middlewares";

const usersRouter = Router();

usersRouter.get("/me", authMiddleware, userControllers.getUserController);
usersRouter.post("/login", userControllers.login);
usersRouter.post("/verify-token", userControllers.verifyJwt);

export default usersRouter;
