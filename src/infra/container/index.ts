import { asClass, AwilixContainer } from "awilix";

import { AddLevelController } from "@/controllers/levels";
import AddLevel from "@/usecases/levels/add-level/add-level.usecase";
import { GetLevelController } from "@/controllers/levels";
import GetLevel from "@/usecases/levels/get-level/get-level.usecase";
import { GetLevelsController } from "@/controllers/levels";
import GetLevels from "@/usecases/levels/get-levels/get-levels.usecase";
import { RemoveLevelController } from "@/controllers/levels";
import RemoveLevel from "@/usecases/levels/remove-level/remove-level.usecase";
import { UpdateLevelController } from "@/controllers/levels";
import UpdateLevel from "@/usecases/levels/update-level/update-level.usecase";

import { AuthenticateController } from "@/controllers/auth/authenticate";
import Authenticate from "@/usecases/auth/authenticate/authenticate.usecase";

import {
  LevelRepository,
  UserRepository,
  UserAccessTokenRepository,
} from "@/repositories/index";

import { BasicParser, IBasicParser } from "@/infra/http/utils/basic-parser";

export interface AppContainer {
  addLevelController: AddLevelController;
  addLevel: AddLevel;

  getLevelController: GetLevelController;
  getLevel: GetLevel;

  getLevelsController: GetLevelsController;
  getLevels: GetLevels;

  removeLevelController: RemoveLevelController;
  removeLevel: RemoveLevel;

  updateLevelController: UpdateLevelController;
  updateLevel: UpdateLevel;

  authenticateController: AuthenticateController;
  authenticate: Authenticate;

  levelRepository: LevelRepository;
  userRepository: UserRepository;
  userAccessTokenRepository: UserAccessTokenRepository;

  basicParser: IBasicParser;
}

export const registerModules = (container: AwilixContainer) => {
  container.register({
    addLevelController: asClass(AddLevelController).scoped(),
    addLevel: asClass(AddLevel).scoped(),

    getLevelController: asClass(GetLevelController).scoped(),
    getLevel: asClass(GetLevel).scoped(),

    getLevelsController: asClass(GetLevelsController).scoped(),
    getLevels: asClass(GetLevels).scoped(),

    removeLevelController: asClass(RemoveLevelController).scoped(),
    removeLevel: asClass(RemoveLevel).scoped(),

    updateLevelController: asClass(UpdateLevelController).scoped(),
    updateLevel: asClass(UpdateLevel).scoped(),

    authenticateController: asClass(AuthenticateController).scoped(),
    authenticate: asClass(Authenticate).scoped(),

    levelRepository: asClass(LevelRepository).scoped(),
    userRepository: asClass(UserRepository).scoped(),
    userAccessTokenRepository: asClass(UserAccessTokenRepository).scoped(),

    basicParser: asClass(BasicParser).singleton(),
  });
};
