import { Router } from "express";
import { WalletControllers } from "./wallet.controller";

const route = Router();

route.patch("/cash-out", WalletControllers.cashOut);
route.patch("/cash-in", WalletControllers.cashIn);
route.patch("/send-money", WalletControllers.sendMoney);
route.patch("/add-money", WalletControllers.addMoney);
route.patch("/withdraw-money", WalletControllers.withdrawMoney);
route.patch("/block/:id", WalletControllers.blockUser);
route.patch("/unblock/:id", WalletControllers.UnBlockUser);

export const WalletRoutes = route;
