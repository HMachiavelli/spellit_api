import { AwilixContainer } from "awilix";
import { Express, Router } from "express";
import { levelRoutes } from "./level-routes";
import { authRoutes } from "./auth-routes";
import { exerciseRoutes } from "./exercise-routes";
import { gameResultRoutes } from "./game-result-routes";
import { userRoutes } from "./user-routes";

export const setupRoutes = (app: Express, container: AwilixContainer) => {
  const router = Router();

  authRoutes(router, container);
  exerciseRoutes(router, container);
  gameResultRoutes(router, container);
  levelRoutes(router, container);
  userRoutes(router, container);

  app.use("/", router);
};
