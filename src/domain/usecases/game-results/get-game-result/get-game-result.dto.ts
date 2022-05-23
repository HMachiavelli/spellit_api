export type GetGameResultInput = {
  id: number;
};

export type GetGameResultOutput = {
  id: number;
  total_score: number;
  transformed_score: number;
  current_exercise: string;
  created_at: Date;
  game: object;
  level: object;
  user: object;
};
