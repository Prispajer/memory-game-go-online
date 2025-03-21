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
import gamePredefinedSets from "../constants/gamePredefinedSets";

const GameMenu = () => {
  const {
    gameDifficulty,
    gameState,
    gamePredefinedTileSet,
    setGameState,
    setGameDifficulty,
    setGamePredefinedTileSet,
    setGamePredefinedTileSets,
  } = useGameState();

  const [previewGameDifficulty, setPreviewGameDifficulty] = React.useState<
    GameDifficulty | "Random"
  >(gameDifficulty || "Random");
  const [previewGamePredefinedTitleSet, setPreviewGamePredefinedTitleSet] =
    React.useState<GamePredefinedTileSets | "Random">(
      gamePredefinedTileSet || "Random"
    );

  const handleStartGame = () => {
    setGameState(GameState.Playing);
    if (previewGamePredefinedTitleSet && previewGameDifficulty) {
      setGamePredefinedTileSets(gamePredefinedSets[gamePredefinedTileSet!]);
    }
  };

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
  console.log(gameDifficulty, gamePredefinedTileSet);
  if (gameState !== GameState.Menu) return null;

  return (
    <>
      <div className="game-menu-backdrop"></div>
      <div className="game-menu">
        <h1 className="game-menu__title">Game Menu</h1>
        <div className="game-menu__difficulty">
          <h2>Choose Game Difficulty</h2>
          <select
            value={previewGameDifficulty}
            onChange={(event) => {
              setPreviewGameDifficulty(
                event.target.value as GameDifficulty | "Random"
              );
            }}
            className="game-menu__select"
          >
            <option value={GameDifficulty.Easy}>Easy</option>
            <option value={GameDifficulty.Medium}>Medium</option>
            <option value={GameDifficulty.Hard}>Hard</option>
            <option value={GameDifficulty.Extreme}>Extreme</option>
            <option value="Random">Random</option>
          </select>
        </div>
        <div className="game-menu__theme">
          <h2>Choose Game Predefined Set</h2>
          <select
            value={previewGamePredefinedTitleSet}
            onChange={(event) => {
              setPreviewGamePredefinedTitleSet(
                event.target.value as GamePredefinedTileSets | "Random"
              );
            }}
            className="game-menu__select"
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
        <button onClick={handleStartGame} className="game-menu__start-btn">
          Start Game
        </button>
      </div>
    </>
  );
};

export default GameMenu;
