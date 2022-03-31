import { AddLevelController } from "@/controllers/levels"
import { makeAddLevel } from "@/factories/usecases/levels/add-level";

export const makeAddLevelController = () => {
  return new AddLevelController(null, makeAddLevel());
}