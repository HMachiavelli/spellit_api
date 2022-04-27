import User from "./user";

export default class UserAccessToken {
  public id?: number;
  public token: string;
  public expire_at: string | Date;
  public created_at?: Date;
  public user?: User;
  public user_id?: number;
}
