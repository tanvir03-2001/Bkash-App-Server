import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { registerUserZodSchema } from "./user.validation";

const route = Router();

route.post(
  "/register",
  validateRequest(registerUserZodSchema),
  UserController.register
);

export const UserRoutes = route;
