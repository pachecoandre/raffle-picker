import { Router } from "express";
import userControllers from "./controllers";

const usersRouter = Router();

usersRouter.get("/", userControllers.getUserController);

export default usersRouter;
