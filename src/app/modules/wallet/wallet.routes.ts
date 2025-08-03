import { Router } from "express";
import { WalletControllers } from "./wallet.controller";

const route = Router();

route.patch("/block/:id", WalletControllers.blockUser);
route.patch("/unblock/:id", WalletControllers.UnBlockUser);

export const WalletRoutes = route;
