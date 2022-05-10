import Game from "./game";
import GameExerciseResult from "./game-exercise-result";
import Level from "./level";
import User from "./user";

export default class GameResult {
  public id?: number;
  public total_score: number;
  public current_exercise: number;
  public started_at: Date;
  public finished_at: Date;
  public game?: Game;
  public game_id?: number;
  public level?: Level;
  public level_id?: number;
  public user?: User;
  public user_id?: number;
  public exercise_results?: GameExerciseResult[];
}
