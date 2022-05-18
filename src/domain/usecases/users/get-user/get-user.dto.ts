export type GetUserInput = {
  id: number;
};

export type GetUserOutput = {
  id: number;
  name: string;
  role: string;
  email: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};
