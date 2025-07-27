import { v4 as uuidv4 } from "uuid";
import { GameDifficulty, GamePredefinedTileSets } from "../types/enum";
import { Tile } from "../types/interface";

export const getRandomGameDifficulty = (): GameDifficulty => {
  const gameDifficulties = [
    GameDifficulty.Easy,
    GameDifficulty.Medium,
    GameDifficulty.Hard,
    GameDifficulty.Extreme,
  ];
  return gameDifficulties[Math.floor(Math.random() * gameDifficulties.length)];
};

export const getRandomPredefinedSet = (): GamePredefinedTileSets => {
  const gamePredefinedSets = [
    GamePredefinedTileSets.Animals,
    GamePredefinedTileSets.Fruits,
    GamePredefinedTileSets.Music,
    GamePredefinedTileSets.Space,
    GamePredefinedTileSets.Sports,
    GamePredefinedTileSets.Fantasy,
  ];
  return gamePredefinedSets[
    Math.floor(Math.random() * gamePredefinedSets.length)
  ];
};

export const generateGameBoard = (
  gameTiles: string[],
  selectedDifficulty: GameDifficulty
): Tile[] => {
  if (!gameTiles || gameTiles.length === 0) return [];

  const selectedTiles = gameTiles.slice(
    0,
    selectedDifficulty ?? GameDifficulty.Medium
  );

  const tilesWithId: Tile[] = selectedTiles.flatMap((value) => {
    const tileId1 = uuidv4();
    const tileId2 = uuidv4();
    return [
      { id: tileId1, value, isRevealed: false, isMatched: false },
      { id: tileId2, value, isRevealed: false, isMatched: false },
    ];
  });

  return tilesWithId.sort(() => Math.random() - 0.5);
};
