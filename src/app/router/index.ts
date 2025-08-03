import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { WalletRoutes } from "../modules/wallet/wallet.routes";

export const router = Router();

interface ModuleRoute {
  path: string;
  route: Router;
}

const moduleRouter: ModuleRoute[] = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/wallet",
    route: WalletRoutes,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});
