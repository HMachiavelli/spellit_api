export type AnswerExerciseInput = {
  received_answer: string;
  game_result_id: number;
  exercise_id: number;
};

export type AnswerExerciseOutput = {
  id: number;
  next_exercise: string;
};
