import Exercise from "./exercise";
import GameExerciseResult from "./game-exercise-result";
import Language from "./language";
import Level from "./level";

export default class Game {
  public id?: number;
  public name?: string;
  public description?: string;
  public logo?: string;
  public active?: boolean;
  public created_at?: Date;
  public updated_at?: Date;
  public exercises?: Exercise[];
  public language?: Language;
  public language_id?: number;
  public results?: GameExerciseResult[];
  public levels?: Level[];
}
