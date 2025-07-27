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
    availableTileSets,
    selectedDifficulty,
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
          availableTileSets as string[] | [],
          selectedDifficulty as GameDifficulty
        )
      );
    } else {
      setGeneratedTiles(null);
    }
  }, [gameState, availableTileSets, selectedDifficulty]);

  React.useEffect(() => {
    if (generatedTiles && generatedTiles.length > 0) {
      if (generatedTiles.every((tile) => tile.isMatched)) {
        setGameState(GameState.GameOver);
        saveGameHistory(
          movesCount,
          mistakesCount,
          timeElapsed,
          selectedDifficulty as GameDifficulty
        );
      }
    }
  }, [
    selectedDifficulty,
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
            selectedDifficulty
              ? GameDifficulty[selectedDifficulty].toLowerCase()
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
          selectedDifficulty={selectedDifficulty}
          stopGame={stopGame}
          startGame={startGame}
        />
      )}
    </div>
  );
};

export default GameBoard;
