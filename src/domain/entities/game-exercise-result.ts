import Exercise from "./exercise";
import GameResult from "./game-result";

export default class GameExerciseResult {
  public id?: number;
  public received_answer: string;
  public score: number;
  public created_at: Date;
  public exercise?: Exercise;
  public exercise_id?: number;
  public game_result?: GameResult;
  public game_result_id?: number;
}
