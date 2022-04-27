export type AuthenticateInput = {
  client_id: string;
  client_secret: string;
  grant_type: string;
};

export type AuthenticateOutput = {
  token: string;
  refresh_token: string;
  expire_in: number;
  role: string;
};
