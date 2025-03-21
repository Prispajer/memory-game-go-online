import { useGameState } from "../hooks/useGameState";
import { GameState } from "../types/enum";

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const GameStats = () => {
  const { gameState, movesCount, mistakesCount, timeElapsed, stopGame } =
    useGameState();

  if (gameState === GameState.Menu) return null;

  return (
    <div className="game-stats-container">
      <div className="game-stats">
        <span>Mistakes: {mistakesCount}</span>
        <span>Moves: {movesCount}</span>
        <span>{formatTime(timeElapsed)}</span>
      </div>
      <div className="game-end">
        <button onClick={stopGame}>Back</button>
      </div>
    </div>
  );
};

export default GameStats;
