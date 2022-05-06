import { GetExerciseOutput } from "../get-exercise/get-exercise.dto";

export type GetExercisesInput = {
  search: string;
  sort_by: string;
  order: string;
  page: number;
  page_size: number;
};

export type GetExercisesOutput = {
  total: number;
  list: GetExerciseOutput[];
};
