import { Router } from 'express';
import { makeAddLevelController } from '@/factories/controllers/levels/add-level';

export const levelRoutes = (router: Router) => {
  const addLevelController = makeAddLevelController();

  router.post('', addLevelController.handle);
}