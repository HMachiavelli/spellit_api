import { asClass, asValue, AwilixContainer } from "awilix";
import PrismaClient from "@/infra/db/client";

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

import { AddExerciseController } from "@/controllers/exercises";
import AddExercise from "@/usecases/exercises/add-exercise/add-exercise.usecase";
import { AnswerExerciseController } from "@/controllers/exercises";
import AnswerExercise from "@/usecases/exercises/answer-exercise/answer-exercise.usecase";
import { GetExerciseController } from "@/controllers/exercises";
import GetExercise from "@/usecases/exercises/get-exercise/get-exercise.usecase";
import { GetExercisesController } from "@/controllers/exercises";
import GetExercises from "@/usecases/exercises/get-exercises/get-exercises.usecase";
import { RemoveExerciseController } from "@/controllers/exercises";
import RemoveExercise from "@/usecases/exercises/remove-exercise/remove-exercise.usecase";
import { UpdateExerciseController } from "@/controllers/exercises";
import UpdateExercise from "@/usecases/exercises/update-exercise/update-exercise.usecase";

import { AddGameResultController } from "@/controllers/game-results/add-game-result";
import AddGameResult from "@/usecases/game-results/add-game-result/add-game-result.usecase";
import { GetGameResultController } from "@/controllers/game-results/get-game-result";
import GetGameResult from "@/usecases/game-results/get-game-result/get-game-result.usecase";

import { AddUserController } from "@/controllers/users";
import AddUser from "@/usecases/users/add-user/add-user.usecase";
import { GetUserController } from "@/controllers/users";
import GetUser from "@/usecases/users/get-user/get-user.usecase";
import { GetUsersController } from "@/controllers/users";
import GetUsers from "@/usecases/users/get-users/get-users.usecase";
import { RemoveUserController } from "@/controllers/users";
import RemoveUser from "@/usecases/users/remove-user/remove-user.usecase";
import { UpdateUserController } from "@/controllers/users";
import UpdateUser from "@/usecases/users/update-user/update-user.usecase";

import { AuthenticateController } from "@/controllers/auth/authenticate";
import Authenticate from "@/usecases/auth/authenticate/authenticate.usecase";

import * as Repositories from "@/repositories/index";
import * as RepositoryProtocols from "@/protocols/index";

import { BasicParser, IBasicParser } from "@/infra/http/utils/basic-parser";
import stringSimilarity from "string-similarity";

export interface AppContainer {
  prismaClient?: any;
  stringSimilarity: typeof stringSimilarity;

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

  addExerciseController?: AddExerciseController;
  addExercise?: AddExercise;

  answerExerciseController?: AnswerExerciseController;
  answerExercise?: AnswerExercise;

  getExerciseController?: GetExerciseController;
  getExercise?: GetExercise;

  getExercisesController?: GetExercisesController;
  getExercises?: GetExercises;

  removeExerciseController?: RemoveExerciseController;
  removeExercise?: RemoveExercise;

  updateExerciseController?: UpdateExerciseController;
  updateExercise?: UpdateExercise;

  addGameResultController?: AddGameResultController;
  addGameResult?: AddGameResult;

  getGameResultController?: GetGameResultController;
  getGameResult?: GetGameResult;

  addUserController?: AddUserController;
  addUser?: AddUser;

  getUserController?: GetUserController;
  getUser?: GetUser;

  getUsersController?: GetUsersController;
  getUsers?: GetUsers;

  removeUserController?: RemoveUserController;
  removeUser?: RemoveUser;

  updateUserController?: UpdateUserController;
  updateUser?: UpdateUser;

  authenticateController?: AuthenticateController;
  authenticate?: Authenticate;

  exerciseRepository?: RepositoryProtocols.IExerciseRepository;
  gameResultRepository?: RepositoryProtocols.IGameResultRepository;
  gameExerciseResultRepository?: RepositoryProtocols.IGameExerciseResultRepository;
  gameRepository?: RepositoryProtocols.IGameRepository;
  levelRepository?: RepositoryProtocols.ILevelRepository;
  userRepository?: RepositoryProtocols.IUserRepository;
  userAccessTokenRepository?: RepositoryProtocols.IUserAccessTokenRepository;
  userAccessLogRepository?: RepositoryProtocols.IUserAccessLogRepository;

  basicParser?: IBasicParser;
}

export const registerModules = (container: AwilixContainer) => {
  container.register({
    prismaClient: asValue(PrismaClient),

    stringSimilarity: asValue(stringSimilarity),

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

    addExerciseController: asClass(AddExerciseController).scoped(),
    addExercise: asClass(AddExercise).scoped(),

    answerExerciseController: asClass(AnswerExerciseController).scoped(),
    answerExercise: asClass(AnswerExercise).scoped(),

    getExerciseController: asClass(GetExerciseController).scoped(),
    getExercise: asClass(GetExercise).scoped(),

    getExercisesController: asClass(GetExercisesController).scoped(),
    getExercises: asClass(GetExercises).scoped(),

    removeExerciseController: asClass(RemoveExerciseController).scoped(),
    removeExercise: asClass(RemoveExercise).scoped(),

    updateExerciseController: asClass(UpdateExerciseController).scoped(),
    updateExercise: asClass(UpdateExercise).scoped(),

    addGameResultController: asClass(AddGameResultController).scoped(),
    addGameResult: asClass(AddGameResult).scoped(),

    getGameResultController: asClass(GetGameResultController).scoped(),
    getGameResult: asClass(GetGameResult).scoped(),

    addUserController: asClass(AddUserController).scoped(),
    addUser: asClass(AddUser).scoped(),

    getUserController: asClass(GetUserController).scoped(),
    getUser: asClass(GetUser).scoped(),

    getUsersController: asClass(GetUsersController).scoped(),
    getUsers: asClass(GetUsers).scoped(),

    removeUserController: asClass(RemoveUserController).scoped(),
    removeUser: asClass(RemoveUser).scoped(),

    updateUserController: asClass(UpdateUserController).scoped(),
    updateUser: asClass(UpdateUser).scoped(),

    authenticateController: asClass(AuthenticateController).scoped(),
    authenticate: asClass(Authenticate).scoped(),

    exerciseRepository: asClass(Repositories.ExerciseRepository).scoped(),
    gameResultRepository: asClass(Repositories.GameResultRepository).scoped(),
    gameExerciseResultRepository: asClass(
      Repositories.GameExerciseResultRepository
    ).scoped(),
    gameRepository: asClass(Repositories.GameRepository).scoped(),
    levelRepository: asClass(Repositories.LevelRepository).scoped(),
    userRepository: asClass(Repositories.UserRepository).scoped(),
    userAccessTokenRepository: asClass(
      Repositories.UserAccessTokenRepository
    ).scoped(),
    userAccessLogRepository: asClass(
      Repositories.UserAccessLogRepository
    ).scoped(),

    basicParser: asClass(BasicParser).singleton(),
  });
};
