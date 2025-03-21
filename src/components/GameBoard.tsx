import React from "react";
import GameStats from "./GameStats";
import { useGameState } from "../hooks/useGameState";
import { generateGameBoard } from "../utils/gameSettings";
import { GameDifficulty } from "../types/enum";
import { GameState } from "../types/enum";
import { Tile } from "../types/interface";

const GameBoard = () => {
  const {
    gameState,
    gamePredefinedTileSet,
    gamePredefinedTileSets,
    gameDifficulty,
    generatedTiles,
    revealedTiles,
    setGamePredefinedTileSets,
    setGeneratedTiles,
    revealTile,
    startTimer,
  } = useGameState();

  React.useEffect(() => {
    if (gameState === GameState.Playing) {
      const selectedTiles = gamePredefinedTileSets
        ? gamePredefinedTileSets
        : [];
      setGeneratedTiles(
        generateGameBoard(
          selectedTiles as string[],
          gameDifficulty as GameDifficulty
        )
      );
      startTimer();
    } else {
      setGeneratedTiles(null);
    }
  }, [
    gameState,
    gamePredefinedTileSet,
    gameDifficulty,
    gamePredefinedTileSets,
    setGamePredefinedTileSets,
    startTimer,
    setGeneratedTiles,
  ]);

  const handleTileClick = (id: string) => {
    revealTile(id);
  };

  const getTileStyle = (tile: Tile) => {
    if (tile.isMatched) return { backgroundColor: "green", cursor: "default" };
    if (revealedTiles.some((revealed) => revealed.id === tile.id))
      return { backgroundColor: "lightblue" };
    return { backgroundColor: "gray" };
  };

  console.log(revealedTiles);
  console.log(generatedTiles);

  return (
    <div className="game-container">
      <GameStats />
      {(generatedTiles ?? []).length > 0 ? (
        <div
          data-difficulty-grid={
            gameDifficulty ? GameDifficulty[gameDifficulty].toLowerCase() : null
          }
          className="game-board"
        >
          {generatedTiles?.map((tile) => (
            <button
              className="tile"
              style={getTileStyle(tile)}
              onClick={() => handleTileClick(tile.id)}
              disabled={tile.isMatched}
            >
              {revealedTiles.some((revealed) => revealed.id === tile.id)
                ? tile.value
                : null}
            </button>
          ))}
        </div>
      ) : (
        <p className="game-board__empty">
          No tiles available. Please select a predefined set.
        </p>
      )}
    </div>
  );
};

export default GameBoard;
