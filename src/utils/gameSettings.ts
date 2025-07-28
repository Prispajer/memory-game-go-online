import { v4 as uuidv4 } from "uuid";
import { GameDifficulty, GamePredefinedSets } from "../types/enum";
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

export const getRandomPredefinedSet = (): GamePredefinedSets => {
  const gamePredefinedSets = [
    GamePredefinedSets.Animals,
    GamePredefinedSets.Fruits,
    GamePredefinedSets.Music,
    GamePredefinedSets.Space,
    GamePredefinedSets.Sports,
    GamePredefinedSets.Fantasy,
  ];
  return gamePredefinedSets[
    Math.floor(Math.random() * gamePredefinedSets.length)
  ];
};

export const generateGameBoard = (
  selectedPredefinedSet: string[],
  selectedDifficulty: GameDifficulty
): Tile[] => {
  if (!selectedPredefinedSet || selectedPredefinedSet.length === 0) return [];

  const selectedTiles = selectedPredefinedSet.slice(
    0,
    selectedDifficulty ?? GameDifficulty.Medium
  );

  const generatedTiles: Tile[] = selectedTiles.flatMap((value) => {
    return [
      { id: uuidv4(), value, isRevealed: false, isMatched: false },
      { id: uuidv4(), value, isRevealed: false, isMatched: false },
    ];
  });

  return generatedTiles.sort(() => Math.random() - 0.5);
};
