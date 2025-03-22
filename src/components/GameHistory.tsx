import React from "react";
import { loadGameHistory } from "../utils/localStorage";
import type { GameHistory } from "../types/interface";
import { GameDifficulty } from "../types/enum";

const GameHistory = ({ onClose }: { onClose: () => void }) => {
  const [history, setHistory] = React.useState<GameHistory[]>([]);

  React.useEffect(() => {
    setHistory(loadGameHistory());
  }, []);

  return (
    <div className="game-history-container">
      <h1 className="game-history-container__title">Game History</h1>
      <div className="game-history-container__list">
        {history.length > 0 ? (
          history.map((game, index) => (
            <div key={index} className="game-history-container__item">
              <div className="game-history-container__date">
                <strong>Date:</strong> {new Date(game.date).toLocaleString()}
              </div>
              <div className="game-history-container__difficulty">
                <strong>Difficulty:</strong>{" "}
                {GameDifficulty[parseInt(game.difficulty)]}
              </div>
              <div className="game-history-container__mistakes">
                <strong>Mistakes:</strong> {game.mistakes}
              </div>
              <div className="game-history-container__moves">
                <strong>Moves:</strong> {game.moves}
              </div>
              <div className="game-history-container__time">
                <strong>Time:</strong> {game.time} seconds
              </div>
            </div>
          ))
        ) : (
          <div className="game-history-container__no-history">
            No game history available
          </div>
        )}
      </div>
      <button onClick={onClose} className="game-history-container__button">
        Back to Menu
      </button>
    </div>
  );
};

export default GameHistory;
