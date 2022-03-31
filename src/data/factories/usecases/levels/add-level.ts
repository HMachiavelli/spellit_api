import AddLevel from "@/usecases/levels/add-level/add-level.usecase";
import { makeAddLevelGateway } from "data/factories/gateways/levels/add-level";

export const makeAddLevel = () => {
  return new AddLevel(makeAddLevelGateway());
}