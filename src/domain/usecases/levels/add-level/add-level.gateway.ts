import Level from "@/entities/level";

export default interface AddLevelGateway {
  create(level: Level): Promise<Level>;
}