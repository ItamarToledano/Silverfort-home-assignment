export enum Shape {
  TRIANGLE = "triangle",
  SQUARE = "square",
  DIAMOND = "diamond",
  CIRCLE = "circle",
}

export enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  YELLOW = "yellow",
}

export interface Cell {
  id: string;
  row: number;
  col: number;
  shape: Shape;
  color: Color;
  cooldown: number;
  isClickable: boolean;
}

export interface GameState {
  board: Cell[][];
  score: number;
  gameOver: boolean;
  turn: number;
}

export interface LeaderboardEntry {
  nickname: string;
  score: number;
  timestamp: Date;
}
