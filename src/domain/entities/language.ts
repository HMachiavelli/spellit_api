import Game from "./game";

export default class Language {
  public id?: number;
  public name?: string;
  public flag?: string;
  public active?: boolean;
  public created_at?: Date;
  public updated_at?: Date;
  public games?: Game[];
}
