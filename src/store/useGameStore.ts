import { create } from "zustand";
import {
  GameDifficulty,
  GamePredefinedTileSets,
  GameState,
} from "../types/enum";
import { Tile } from "../types/interface";
import gamePredefinedSets from "../constants/gamePredefinedSets";

interface GameStore {
  gameDifficulty: GameDifficulty | null;
  gameState: GameState;
  gamePredefinedTileSet: GamePredefinedTileSets | null;
  gamePredefinedTileSets: string[] | null;
  generatedTiles: Tile[] | null;
  revealedTiles: Tile[];
  message: string | null;
  movesCount: number;
  mistakesCount: number;
  timeElapsed: number;
  isChecking: boolean;
  setGameDifficulty: (gameDifficulty: GameDifficulty) => void;
  setGameState: (gameState: GameState) => void;
  setGamePredefinedTileSet: (gamePredefinedSet: GamePredefinedTileSets) => void;
  setGamePredefinedTileSets: (gameTiles: string[]) => void;
  setGeneratedTiles: (generatedTiles: Tile[] | null) => void;
  setRevealedTiles: (revealedTiles: Tile[]) => void;
  setMessage: (message: string) => void;
  incrementMoves: () => void;
  incrementMistakes: () => void;
  revealTile: (id: string) => void;
  checkMatch: () => void;
  clearRevealedTiles: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  stopGame: () => void;
  startGame: () => void;
}

let timerInterval: ReturnType<typeof setTimeout> | null = null;

export const useGameStore = create<GameStore>((set, get) => ({
  gameDifficulty: null,
  gameState: GameState.Menu,
  gamePredefinedTileSet: null,
  gamePredefinedTileSets: null,
  generatedTiles: null,
  revealedTiles: [],
  message: null,
  movesCount: 0,
  mistakesCount: 0,
  timeElapsed: 0,
  isChecking: false,
  setGameDifficulty: (gameDifficulty: GameDifficulty) =>
    set({ gameDifficulty }),
  setGameState: (gameState: GameState) => set({ gameState }),
  setGamePredefinedTileSet: (gamePredefinedTileSet: GamePredefinedTileSets) =>
    set({ gamePredefinedTileSet }),
  setGamePredefinedTileSets: (gamePredefinedTileSets: string[]) =>
    set({ gamePredefinedTileSets }),
  setGeneratedTiles: (generatedTiles: Tile[] | null) => set({ generatedTiles }),
  setRevealedTiles: (revealedTiles: Tile[]) => set({ revealedTiles }),
  setMessage: (message: string) => set({ message }),
  incrementMoves: () => set((state) => ({ movesCount: state.movesCount + 1 })),
  incrementMistakes: () =>
    set((state) => ({ mistakesCount: state.mistakesCount + 1 })),
  revealTile: (id: string) => {
    const {
      generatedTiles,
      revealedTiles,
      isChecking,
      incrementMoves,
      checkMatch,
    } = get();

    if (isChecking || revealedTiles.some((tile) => tile.id === id)) return;

    const clickedTile = generatedTiles?.find((tile) => tile.id === id);
    if (!clickedTile) return;

    const newRevealedTiles = [...revealedTiles, clickedTile];
    set({ revealedTiles: newRevealedTiles });
    if (newRevealedTiles.length === 2) {
      set({ isChecking: true });
      setTimeout(() => {
        checkMatch();
        incrementMoves();
        set({ isChecking: false });
      }, 1000);
    }
  },
  checkMatch: () => {
    const {
      revealedTiles,
      generatedTiles,
      incrementMistakes,
      setGeneratedTiles,
      clearRevealedTiles,
    } = get();

    if (revealedTiles.length !== 2) return;

    const [tile1, tile2] = revealedTiles;

    if (tile1.value === tile2.value) {
      const updatedTiles = generatedTiles?.map((tile) =>
        tile.id === tile1.id || tile.id === tile2.id
          ? { ...tile, isMatched: true }
          : tile
      );
      setGeneratedTiles(updatedTiles as Tile[]);
      set({ revealedTiles: [], isChecking: false });
    } else {
      incrementMistakes();
      clearRevealedTiles();
      set({ isChecking: false });
    }
  },
  clearRevealedTiles: () => {
    set({ revealedTiles: [] });
  },
  startTimer: () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      set((state) => ({ timeElapsed: state.timeElapsed + 1 }));
    }, 1000);
  },
  stopTimer: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  },
  stopGame: () => {
    set({
      gameState: GameState.Menu,
      gameDifficulty: null,
      gamePredefinedTileSet: null,
      generatedTiles: null,
      revealedTiles: [],
      movesCount: 0,
      mistakesCount: 0,
      timeElapsed: 0,
      gamePredefinedTileSets: null,
      message: null,
      isChecking: false,
    });
    get().stopTimer();
  },
  startGame: () => {
    const { gamePredefinedTileSet } = get();
    set({
      gameState: GameState.Playing,
      gameDifficulty: null,
      gamePredefinedTileSet: null,
      generatedTiles: null,
      revealedTiles: [],
      movesCount: 0,
      mistakesCount: 0,
      timeElapsed: 0,
      gamePredefinedTileSets: null,
      message: null,
      isChecking: false,
    });
    setTimeout(() => {
      set({
        gamePredefinedTileSets: gamePredefinedSets[gamePredefinedTileSet!],
      });
    }, 0);
    get().startTimer();
  },
}));
