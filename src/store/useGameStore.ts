import { create } from "zustand";
import { startTimer } from "./../utils/timeManager";
import { stopTimer } from "../utils/timeManager";
import { GameDifficulty, GamePredefinedSets, GameState } from "../types/enum";
import { Tile } from "../types/interface";

export interface GameStore {
  selectedDifficulty: GameDifficulty | null;
  gameState: GameState;
  selectedTileSetKey: GamePredefinedSets | null;
  generatedTiles: Tile[] | null;
  revealedTiles: Tile[];
  movesCount: number;
  mistakesCount: number;
  timeElapsed: number;
  isChecking: boolean;
  setField: <K extends keyof GameStore>(key: K, value: GameStore[K]) => void;
  incrementMoves: () => void;
  incrementMistakes: () => void;
  revealTile: (id: string) => void;
  checkMatch: () => void;
  stopGame: () => void;
  startGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  selectedDifficulty: null,
  gameState: GameState.Menu,
  selectedTileSetKey: null,
  generatedTiles: null,
  revealedTiles: [],
  movesCount: 0,
  mistakesCount: 0,
  timeElapsed: 0,
  isChecking: false,
  setField: (key, value) => set({ [key]: value }),
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

    const updatedRevealedTiles = [...revealedTiles, clickedTile];

    set({ revealedTiles: updatedRevealedTiles });

    if (updatedRevealedTiles.length === 2) {
      set({ isChecking: true });
      setTimeout(() => {
        checkMatch();
        incrementMoves();
        set({ isChecking: false });
      }, 1000);
    }
  },
  checkMatch: () => {
    const { revealedTiles, generatedTiles, incrementMistakes } = get();

    if (revealedTiles.length !== 2) return;

    const [tile1, tile2] = revealedTiles;

    if (tile1.value === tile2.value) {
      const updatedTiles = generatedTiles?.map((tile) =>
        tile.id === tile1.id || tile.id === tile2.id
          ? { ...tile, isMatched: true }
          : tile
      );

      set({ generatedTiles: updatedTiles });
      set({ revealedTiles: [], isChecking: false });
    } else {
      incrementMistakes();
      set({ revealedTiles: [], isChecking: false });
    }
  },
  stopGame: () => {
    set({
      gameState: GameState.Menu,
      selectedDifficulty: null,
      selectedTileSetKey: null,
      generatedTiles: null,
      revealedTiles: [],
      movesCount: 0,
      mistakesCount: 0,
      timeElapsed: 0,
    });
    stopTimer();
  },
  startGame: () => {
    set({
      gameState: GameState.Playing,
    });
    startTimer(() => {
      set((state) => ({ timeElapsed: state.timeElapsed + 1 }));
    });
  },
}));
