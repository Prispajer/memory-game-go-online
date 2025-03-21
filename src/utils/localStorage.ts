import { useGameStore } from "../store/useGameStore";

export const saveGameHistory = () => {
  const { movesCount, timeElapsed, gameDifficulty } = useGameStore.getState();
  const gameHistory = {
    date: new Date().toISOString(),
    difficulty: gameDifficulty,
    moves: movesCount,
    time: timeElapsed,
  };
  const existingGameHistory = JSON.parse(
    localStorage.getItem("gameHistory") || "[]"
  );
  existingGameHistory.push(gameHistory);
  localStorage.setItem("gameHistory", JSON.stringify(existingGameHistory));
};

export const loadGameHistory = () => {
  const existingGameHistory = JSON.parse(
    localStorage.getItem("gameHistory") || "[]"
  );
  return existingGameHistory;
};
