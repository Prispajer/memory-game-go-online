import { startTimer } from "./../utils/timeManager";
import { create } from "zustand";
import {
  GameDifficulty,
  GamePredefinedTileSets,
  GameState,
} from "../types/enum";
import { Tile } from "../types/interface";
import gamePredefinedSets from "../constants/gamePredefinedSets";
import { stopTimer } from "../utils/timeManager";

export interface GameStore {
  selectedDifficulty: GameDifficulty | null;
  gameState: GameState;
  selectedTileSetKey: GamePredefinedTileSets | null;
  availableTileSets: string[] | null;
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
  clearRevealedTiles: () => void;
  stopGame: () => void;
  startGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  selectedDifficulty: null,
  gameState: GameState.Menu,
  selectedTileSetKey: null,
  availableTileSets: null,
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
      setField,
      incrementMistakes,
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
      setField("generatedTiles", updatedTiles as Tile[]);
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
      availableTileSets: null,
    });
    stopTimer();
  },
  startGame: () => {
    const { selectedTileSetKey } = get();
    set({
      gameState: GameState.Playing,
      availableTileSets: gamePredefinedSets[selectedTileSetKey!],
    });
    startTimer(() => {
      set((state) => ({ timeElapsed: state.timeElapsed + 1 }));
    });
  },
}));
