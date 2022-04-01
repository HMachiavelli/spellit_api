export type UpdateLevelInput = {
  id: number
  title: string
};

export type UpdateLevelOutput = {
  id: number,
  title: string,
  created_at: Date,
  updated_at: Date
}