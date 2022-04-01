import { GetLevelOutput } from "../get-level/get-level.dto";

export type GetLevelsInput = {
  search: string;
  sort_by: string,
  order: string,
  page: number,
  page_size: number
};

export type GetLevelsOutput = GetLevelOutput[]
