import { Router } from "express";
import { TransactionController } from "./transaction.controller";

const route = Router();
route.get("/me", TransactionController.myTransaction);

export const TransactionRoutes = route;
