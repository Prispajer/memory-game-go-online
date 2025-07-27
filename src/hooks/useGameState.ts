import { useGameStore, GameStore } from "../store/useGameStore";

export const useGameState = () => {
  const selectedDifficulty = useGameStore((state) => state.selectedDifficulty);
  const gameState = useGameStore((state) => state.gameState);
  const selectedTileSetKey = useGameStore((state) => state.selectedTileSetKey);
  const generatedTiles = useGameStore((state) => state.generatedTiles);
  const revealedTiles = useGameStore((state) => state.revealedTiles);
  const availableTileSets = useGameStore((state) => state.availableTileSets);
  const movesCount = useGameStore((state) => state.movesCount);
  const mistakesCount = useGameStore((state) => state.mistakesCount);
  const timeElapsed = useGameStore((state) => state.timeElapsed);
  const setField = useGameStore((state) => state.setField);
  const setSelectedDifficulty = (value: GameStore["selectedDifficulty"]) =>
    setField("selectedDifficulty", value);
  const setGameState = (value: GameStore["gameState"]) =>
    setField("gameState", value);
  const setSelectedTileSetKey = (value: GameStore["selectedTileSetKey"]) =>
    setField("selectedTileSetKey", value);
  const setGeneratedTiles = (value: GameStore["generatedTiles"]) =>
    setField("generatedTiles", value);
  const setRevealedTiles = (value: GameStore["revealedTiles"]) =>
    setField("revealedTiles", value);
  const incrementMoves = useGameStore((state) => state.incrementMoves);
  const incrementMistakes = useGameStore((state) => state.incrementMistakes);
  const revealTile = useGameStore((state) => state.revealTile);
  const checkMatch = useGameStore((state) => state.checkMatch);
  const clearRevealedTiles = useGameStore((state) => state.clearRevealedTiles);
  const stopGame = useGameStore((state) => state.stopGame);
  const startGame = useGameStore((state) => state.startGame);

  return {
    selectedDifficulty,
    gameState,
    selectedTileSetKey,
    availableTileSets,
    generatedTiles,
    revealedTiles,
    movesCount,
    mistakesCount,
    timeElapsed,
    setSelectedDifficulty,
    setGameState,
    setSelectedTileSetKey,
    setGeneratedTiles,
    setRevealedTiles,
    incrementMoves,
    incrementMistakes,
    revealTile,
    checkMatch,
    clearRevealedTiles,
    stopGame,
    startGame,
  };
};
