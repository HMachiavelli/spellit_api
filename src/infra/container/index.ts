import { asClass, asValue, AwilixContainer } from "awilix";
import { PrismaClient } from "@prisma/client";

import { Repository } from "@/protocols/repository";

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
  UserAccessLogRepository,
  ExerciseRepository,
  GameExerciseResultRepository,
  GameResultRepository,
  GameRepository,
} from "@/repositories/index";

import { BasicParser, IBasicParser } from "@/infra/http/utils/basic-parser";

export interface AppContainer {
  prismaClient?: any;

  addLevelController?: AddLevelController;
  addLevel?: AddLevel;

  getLevelController?: GetLevelController;
  getLevel?: GetLevel;

  getLevelsController?: GetLevelsController;
  getLevels?: GetLevels;

  removeLevelController?: RemoveLevelController;
  removeLevel?: RemoveLevel;

  updateLevelController?: UpdateLevelController;
  updateLevel?: UpdateLevel;

  authenticateController?: AuthenticateController;
  authenticate?: Authenticate;

  exerciseRepository?: Repository;
  gameResultRepository?: Repository;
  gameExerciseResultRepository?: Repository;
  gameRepository?: Repository;
  levelRepository?: Repository;
  userRepository?: Repository;
  userAccessTokenRepository?: Repository;
  userAccessLogRepository?: Repository;

  basicParser?: IBasicParser;
}

export const registerModules = (container: AwilixContainer) => {
  container.register({
    prismaClient: asValue(new PrismaClient()),

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

    exerciseRepository: asClass(ExerciseRepository).scoped(),
    gameResultRepository: asClass(GameResultRepository).scoped(),
    gameExerciseResultRepository: asClass(
      GameExerciseResultRepository
    ).scoped(),
    gameRepository: asClass(GameRepository).scoped(),
    levelRepository: asClass(LevelRepository).scoped(),
    userRepository: asClass(UserRepository).scoped(),
    userAccessTokenRepository: asClass(UserAccessTokenRepository).scoped(),
    userAccessLogRepository: asClass(UserAccessLogRepository).scoped(),

    basicParser: asClass(BasicParser).singleton(),
  });
};
