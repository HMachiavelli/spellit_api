export default class User {
  public id?: number;
  public name: string;
  public role: string;
  public active: boolean;
  public created_at?: Date;
  public updated_at?: Date;
  public email?: string;
  public password?: string;
}
