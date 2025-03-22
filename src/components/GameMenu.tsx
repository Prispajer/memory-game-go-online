import React from "react";
import {
  GameState,
  GameDifficulty,
  GamePredefinedTileSets,
} from "../types/enum";
import {
  getRandomGameDifficulty,
  getRandomPredefinedSet,
} from "../utils/gameSettings";
import { useGameState } from "../hooks/useGameState";
import GameHistory from "./GameHistory";

const GameMenu = () => {
  const {
    gameDifficulty,
    gameState,
    gamePredefinedTileSet,
    setGameDifficulty,
    setGamePredefinedTileSet,
    startGame,
  } = useGameState();

  const [previewGameDifficulty, setPreviewGameDifficulty] = React.useState<
    GameDifficulty | "Random"
  >(gameDifficulty || "Random");
  const [previewGamePredefinedTitleSet, setPreviewGamePredefinedTitleSet] =
    React.useState<GamePredefinedTileSets | "Random">(
      gamePredefinedTileSet || "Random"
    );
  const [showGameHistory, setShowGameHistory] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (previewGameDifficulty === "Random") {
      setGameDifficulty(getRandomGameDifficulty());
    } else {
      setGameDifficulty(previewGameDifficulty);
    }
  }, [gameDifficulty, previewGameDifficulty, setGameDifficulty]);

  React.useEffect(() => {
    if (previewGamePredefinedTitleSet === "Random") {
      setGamePredefinedTileSet(getRandomPredefinedSet());
    } else {
      setGamePredefinedTileSet(previewGamePredefinedTitleSet);
    }
  }, [
    gamePredefinedTileSet,
    previewGamePredefinedTitleSet,
    setGamePredefinedTileSet,
  ]);

  if (gameState !== GameState.Menu) return null;

  return (
    <>
      <div className="game-menu-backdrop"></div>
      {showGameHistory ? (
        <GameHistory onClose={() => setShowGameHistory(false)} />
      ) : (
        <div className="game-menu">
          <h1 className="game-menu__title">Game Menu</h1>
          <div className="game-menu__difficulty">
            <h2>Choose Game Difficulty</h2>
            <select
              value={previewGameDifficulty}
              onChange={(event) =>
                setPreviewGameDifficulty(
                  event.target.value as GameDifficulty | "Random"
                )
              }
            >
              <option value={GameDifficulty.Easy}>Easy</option>
              <option value={GameDifficulty.Medium}>Medium</option>
              <option value={GameDifficulty.Hard}>Hard</option>
              <option value={GameDifficulty.Extreme}>Extreme</option>
              <option value="Random">Random</option>
            </select>
          </div>
          <div className="game-menu__predefined-set">
            <h2>Choose Game Predefined Set</h2>
            <select
              value={previewGamePredefinedTitleSet}
              onChange={(event) =>
                setPreviewGamePredefinedTitleSet(
                  event.target.value as GamePredefinedTileSets | "Random"
                )
              }
            >
              <option value={GamePredefinedTileSets.Animals}>Animals</option>
              <option value={GamePredefinedTileSets.Fruits}>Fruits</option>
              <option value={GamePredefinedTileSets.Music}>Music</option>
              <option value={GamePredefinedTileSets.Space}>Space</option>
              <option value={GamePredefinedTileSets.Sports}>Sports</option>
              <option value={GamePredefinedTileSets.Fantasy}>Fantasy</option>
              <option value="Random">Random</option>
            </select>
          </div>
          <div className="game-menu__predefined-set">
            <h2>Check Game History</h2>
            <button
              onClick={() => setShowGameHistory(true)}
              className="game-menu__button"
            >
              Click here
            </button>
          </div>
          <button onClick={startGame} className="game-menu__button">
            Start Game
          </button>
        </div>
      )}
    </>
  );
};

export default GameMenu;
