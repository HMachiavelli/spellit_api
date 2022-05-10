export type AddGameResultInput = {
  game_id: number;
  level_id: number;
  user_id: number;
  current_exercise: number;
};

export type AddGameResultOutput = {
  id: number;
  total_score: string;
  current_exercise: string;
  created_at: Date;
  game: object;
  level: object;
  user: object;
  first_exercise_uri: string;
};
