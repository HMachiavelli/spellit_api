export type AddUserInput = {
  name: string;
  role: string;
  email: string;
  password: string;
  active: boolean;
};

export type AddUserOutput = {
  id: number;
  name: string;
  role: string;
  email: string;
  active: boolean;
  created_at: Date;
};
