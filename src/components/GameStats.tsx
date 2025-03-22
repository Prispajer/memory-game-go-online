import { useGameState } from "../hooks/useGameState";
import { formatTime } from "../utils/timeFormatter";
import { GameState } from "../types/enum";

const GameStats = () => {
  const { gameState, movesCount, mistakesCount, timeElapsed, stopGame } =
    useGameState();

  if (gameState === GameState.Menu || gameState === GameState.GameOver)
    return null;

  return (
    <div className="game-stats-container">
      <div className="game-stats-container__stats">
        <span>Mistakes: {mistakesCount}</span>
        <span>Moves: {movesCount}</span>
        <span>{formatTime(timeElapsed)}</span>
      </div>
      <div className="game-stats-container__end">
        <button onClick={stopGame}>Back</button>
      </div>
    </div>
  );
};

export default GameStats;
