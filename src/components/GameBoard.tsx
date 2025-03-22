import React from "react";
import GameStats from "./GameStats";
import { GameVictoryModal } from "./GameVictoryModal";
import { useGameState } from "../hooks/useGameState";
import { generateGameBoard } from "../utils/gameSettings";
import { GameDifficulty } from "../types/enum";
import { GameState } from "../types/enum";
import { saveGameHistory } from "../utils/localStorage";

const GameBoard = () => {
  const {
    gameState,
    gamePredefinedTileSets,
    gameDifficulty,
    movesCount,
    mistakesCount,
    timeElapsed,
    generatedTiles,
    revealedTiles,
    setGameState,
    setGeneratedTiles,
    revealTile,
    stopGame,
    startGame,
  } = useGameState();

  React.useEffect(() => {
    if (gameState === GameState.Playing) {
      setGeneratedTiles(
        generateGameBoard(
          gamePredefinedTileSets as string[] | [],
          gameDifficulty as GameDifficulty
        )
      );
    } else {
      setGeneratedTiles(null);
    }
  }, [gameState, gamePredefinedTileSets, gameDifficulty, setGeneratedTiles]);

  React.useEffect(() => {
    if (generatedTiles && generatedTiles.length > 0) {
      if (generatedTiles.every((tile) => tile.isMatched)) {
        setGameState(GameState.GameOver);
        saveGameHistory(
          movesCount,
          mistakesCount,
          timeElapsed,
          gameDifficulty as GameDifficulty
        );
      }
    }
  }, [
    gameDifficulty,
    mistakesCount,
    movesCount,
    timeElapsed,
    generatedTiles,
    setGameState,
  ]);

  return (
    <div className="game-container">
      <GameStats />
      {gameState === GameState.Playing && (generatedTiles ?? []).length > 0 ? (
        <div
          data-difficulty-grid={
            gameDifficulty
              ? GameDifficulty[gameDifficulty].toLowerCase()
              : "medium"
          }
          className="game-board"
        >
          {generatedTiles?.map((tile) => (
            <button
              key={tile.id}
              className="tile"
              data-matched={tile.isMatched}
              data-revealed={revealedTiles.some(
                (revealed) => revealed.id === tile.id
              )}
              onClick={() => revealTile(tile.id)}
              disabled={tile.isMatched}
            >
              {revealedTiles.some((revealed) => revealed.id === tile.id)
                ? tile.value
                : tile.isMatched
                ? "✔"
                : "?"}
            </button>
          ))}
        </div>
      ) : gameState === GameState.Playing ? (
        <p className="game-board__empty">
          No tiles available. Please select a predefined set.
        </p>
      ) : null}
      {gameState === GameState.GameOver && (
        <GameVictoryModal
          movesCount={movesCount}
          mistakesCount={mistakesCount}
          timeElapsed={timeElapsed}
          gameDifficulty={gameDifficulty}
          stopGame={stopGame}
          startGame={startGame}
        />
      )}
    </div>
  );
};

export default GameBoard;
