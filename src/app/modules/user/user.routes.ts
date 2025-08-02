import { Router } from "express";
import { UserController } from "./user.controller";

const route = Router();

route.post("/register", UserController.register);

export const UserRoutes = route;
