export interface Tile {
  id: string;
  value: string;
  isRevealed: boolean;
  isMatched: boolean;
}

export interface GameHistory {
  date: Date;
  difficulty: string;
  mistakes: number;
  moves: number;
  time: number;
}
