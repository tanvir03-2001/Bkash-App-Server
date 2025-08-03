import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";

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
    route: AuthRouter,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});
