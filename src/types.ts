export interface Army {
  id: string;
  name: string;
  number: string;
  category: "base" | "expansion";
  available: boolean;
  color: string;
  log: any[];
}

export interface Request {
  activeRequest: boolean;
  success: null | boolean;
  message: null | string;
  submitBtn: string;
}

export interface GamelogPlayer {
  playerName: string;
  armyId: string;
  armyName: string;
  damage: number;
}
export interface Gamelog {
  gameId: number;
  time: string;
  userUID: string;
  players: GamelogPlayer[];
  password: string;
}
