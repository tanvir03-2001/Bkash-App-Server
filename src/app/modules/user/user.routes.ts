import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { Role } from "./user.interface";
import { registerUserZodSchema } from "./user.validation";

const route = Router();
route.get("/me", checkAuth(Role.USER), UserController.getMe);
route.get(
  "/all-agent",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  UserController.allAgents
);
route.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  UserController.allUsers
);
route.patch(
  "/approve",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  UserController.agentApproved
);
route.patch(
  "/suspend",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  UserController.agentSuspended
);
route.post(
  "/register",
  validateRequest(registerUserZodSchema),
  UserController.register
);

export const UserRoutes = route;
