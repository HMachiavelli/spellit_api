export type AddExerciseInput = {
  type: string;
  question: string;
  answer: string;
  active: boolean;
  game_id: number;
  level_id: number;
  answer_type_id: number;
  question_media_id?: number;
};

export type AddExerciseOutput = {
  id: number;
  type: string;
  question: string;
  answer: string;
  active: boolean;
  game: object;
  level: object;
  answer_type: object;
  question_media?: object;
  game_exercise_results?: [];
  created_at: Date;
};
