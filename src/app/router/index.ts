import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";

export const router = Router();

const moduleRouter = [
  {
    path: "/user",
    route: UserRoutes,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});
