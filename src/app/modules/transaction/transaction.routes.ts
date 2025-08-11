import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TransactionController } from "./transaction.controller";

const route = Router();
route.get(
  "/me",
  checkAuth(Role.ADMIN, Role.AGENT, Role.USER, Role.SUPPER_ADMIN),
  TransactionController.myTransaction
);
route.get(
  "/all",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  TransactionController.allTransaction
);

export const TransactionRoutes = route;
