import { GetUserOutput } from "../get-user/get-user.dto";

export type GetUsersInput = {
  search: string;
  sort_by: string;
  order: string;
  page: number;
  page_size: number;
};

export type GetUsersOutput = {
  total: number;
  list: GetUserOutput[];
};
