import Exercise from "@/entities/exercise";
import { Repository } from "./repository";

export interface IExerciseRepository extends Repository {
  getRandom(options: any): Promise<Exercise>;
}
