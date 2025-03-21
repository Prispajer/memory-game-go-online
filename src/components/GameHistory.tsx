// Komponent do wyświetlania historii gier

import React, { useEffect, useState } from "react";
import { loadGameHistory } from "./pathToSaveFunctions";

const GameHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadedHistory = loadGameHistory();
    setHistory(loadedHistory);
  }, []);

  return (
    <div className="game-history">
      <h3>Game History</h3>
      <ul>
        {history.map((game, index) => (
          <li key={index}>
            <span>
              {game.date} - {game.difficulty} - {game.moves} moves - {game.time}{" "}
              seconds
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;
