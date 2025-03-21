import { useGameStore } from "../store/useGameStore";

export const useGameState = () => {
  const gameDifficulty = useGameStore((state) => state.gameDifficulty);
  const gameState = useGameStore((state) => state.gameState);
  const gamePredefinedTileSet = useGameStore(
    (state) => state.gamePredefinedTileSet
  );
  const gamePredefinedTileSets = useGameStore(
    (state) => state.gamePredefinedTileSets
  );
  const generatedTiles = useGameStore((state) => state.generatedTiles);
  const revealedTiles = useGameStore((state) => state.revealedTiles);
  const message = useGameStore((state) => state.message);
  const movesCount = useGameStore((state) => state.movesCount);
  const mistakesCount = useGameStore((state) => state.mistakesCount);
  const timeElapsed = useGameStore((state) => state.timeElapsed);
  const setGameDifficulty = useGameStore((state) => state.setGameDifficulty);
  const setGameState = useGameStore((state) => state.setGameState);
  const setGamePredefinedTileSet = useGameStore(
    (state) => state.setGamePredefinedTileSet
  );
  const setGamePredefinedTileSets = useGameStore(
    (state) => state.setGamePredefinedTileSets
  );
  const setGeneratedTiles = useGameStore((state) => state.setGeneratedTiles);
  const setRevealedTiles = useGameStore((state) => state.setRevealedTiles);
  const setMessage = useGameStore((state) => state.setMessage);
  const incrementMoves = useGameStore((state) => state.incrementMoves);
  const incrementMistakes = useGameStore((state) => state.incrementMistakes);
  const revealTile = useGameStore((state) => state.revealTile);
  const checkMatch = useGameStore((state) => state.checkMatch);
  const clearRevealedTiles = useGameStore((state) => state.clearRevealedTiles);
  const startTimer = useGameStore((state) => state.startTimer);
  const stopTimer = useGameStore((state) => state.stopTimer);
  const stopGame = useGameStore((state) => state.stopGame);

  return {
    gameDifficulty,
    gameState,
    gamePredefinedTileSet,
    gamePredefinedTileSets,
    generatedTiles,
    revealedTiles,
    message,
    movesCount,
    mistakesCount,
    timeElapsed,
    setGameDifficulty,
    setGameState,
    setGamePredefinedTileSet,
    setGamePredefinedTileSets,
    setGeneratedTiles,
    setRevealedTiles,
    setMessage,
    incrementMoves,
    incrementMistakes,
    revealTile,
    checkMatch,
    clearRevealedTiles,
    startTimer,
    stopTimer,
    stopGame,
  };
};
