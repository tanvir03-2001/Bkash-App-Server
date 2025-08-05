import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { WalletControllers } from "./wallet.controller";

const route = Router();

route.patch("/cash-out", checkAuth(Role.USER), WalletControllers.cashOut);
route.patch("/cash-in", checkAuth(Role.AGENT), WalletControllers.cashIn);
route.patch("/send-money", checkAuth(Role.USER), WalletControllers.sendMoney);
route.patch(
  "/add-money",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  WalletControllers.addMoney
);
route.patch(
  "/withdraw-money",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  WalletControllers.withdrawMoney
);
route.patch(
  "/block/:id",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  WalletControllers.blockUser
);
route.patch(
  "/unblock/:id",
  checkAuth(Role.ADMIN, Role.SUPPER_ADMIN),
  WalletControllers.UnBlockUser
);

export const WalletRoutes = route;
