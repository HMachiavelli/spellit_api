export type AuthenticateInput = {
  client_id: string;
  client_secret: string;
  grant_type: string;
  ip_address: string;
};

export type AuthenticateOutput = {
  token: string;
  refresh_token: string;
  expire_at: number;
  role: string;
};
