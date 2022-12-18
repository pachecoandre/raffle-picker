import { Router } from "express";
import userControllers from "./controllers";

const usersRouter = Router();

usersRouter.get("/", userControllers.getUserController);
usersRouter.post("/login", userControllers.login);

export default usersRouter;
