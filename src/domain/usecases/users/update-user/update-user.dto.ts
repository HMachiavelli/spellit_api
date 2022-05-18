export type UpdateUserInput = {
  id: number;
  name?: string;
  role?: string;
  email?: string;
  password?: string;
  active?: boolean;
};

export type UpdateUserOutput = {
  id: number;
  name: string;
  role: string;
  email: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};
