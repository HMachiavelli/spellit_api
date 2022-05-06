import Level from "./level";

export default class Exercise {
  public id?: number;
  public type: string;
  public question: string;
  public answer: string;
  public active: boolean;
  public created_at?: Date;
  public updated_at?: Date;
  public game?: any;
  public game_id?: number;
  public level?: Level;
  public level_id?: number;
  public answer_type?: any;
  public answer_type_id?: number;
  public question_media?: any;
  public question_media_id?: number;
  public game_exercise_results?: [];
}
