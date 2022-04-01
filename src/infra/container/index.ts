import { asClass, AwilixContainer } from "awilix";

import { AddLevelController } from "@/controllers/levels";
import AddLevel from "@/usecases/levels/add-level/add-level.usecase";
import { GetLevelController } from "@/controllers/levels";
import GetLevel from "@/usecases/levels/get-level/get-level.usecase";

import { LevelRepository } from "@/repositories/index";

export interface AppContainer {
  addLevelController: AddLevelController;
  addLevel: AddLevel;

  getLevelController: GetLevelController;
  getLevel: GetLevel;

  levelRepository: LevelRepository;
}

export const registerModules = (container: AwilixContainer) => {
  container.register({
    addLevelController: asClass(AddLevelController).scoped(),
    addLevel: asClass(AddLevel).scoped(),
    getLevelController: asClass(GetLevelController).scoped(),
    getLevel: asClass(GetLevel).scoped(),

    levelRepository: asClass(LevelRepository).scoped(),
  });
};
