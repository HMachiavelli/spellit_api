export type RemoveUserInput = {
  id: number;
};

export type RemoveUserOutput = {
  id: number;
  name: string;
  role: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  removed_at: Date;
};
