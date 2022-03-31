import { Express, Router } from 'express';
import { levelRoutes } from './level-routes';

export const setupRoutes = (app: Express) => {
  const router = Router();

  app.use('/levels', router);

  levelRoutes(router);
}