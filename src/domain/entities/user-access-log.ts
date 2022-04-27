import User from "./user";

export default class UserAccessLog {
  public id?: number;
  public ip_address: string;
  public created_at?: Date;
  public user?: User;
  public user_id?: number;
}
