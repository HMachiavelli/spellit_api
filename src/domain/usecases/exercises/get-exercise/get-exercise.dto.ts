export type GetExerciseInput = {
  id: number;
};

export type GetExerciseOutput = {
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
  updated_at: Date;
};
