export type GameData = {
  name: string;
  email: string;
  score: number;
};

export type Storage = {
  [key: string]: GameData;
};
