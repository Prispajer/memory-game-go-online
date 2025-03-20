import React from "react";

export enum Difficulty {
  Easy = 8,
  Medium = 12,
  Hard = 16,
  Extreme = 20,
}

export type Themes = {
  animals: string[];
  fruits: string[];
  music: string[];
  space: string[];
  fantasy: string[];
  sports: string[];
};

const themes: Themes = {
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐯", "🦁"],
  fruits: ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓", "🍑", "🥭", "🍍", "🍐"],
  music: ["🎵", "🎸", "🎺", "🥁", "🎻", "🎤", "🎧", "📯", "🎹", "🎼"],
  space: ["🚀", "🪐", "🌌", "🌠", "🌕", "🌍", "🌞", "🌛", "👾", "🛰️"],
  sports: ["⚽", "🏀", "🏈", "🎾", "🏓", "🥊", "🏋️", "⛷️", "🏄", "🚴"],
  fantasy: ["🦄", "🐲", "🧙‍♂️", "🧝‍♀️", "🐉", "✨", "🧞‍♂️", "🦹‍♂️", "🧛‍♂️", "🔮"],
};

const GameBoard = () => {
  const themesKeys = Object.keys(themes) as Array<keyof Themes>;
  const [difficulty, setDifficulty] = React.useState<Difficulty>(
    Difficulty.Medium
  );
  const [selectedTheme, setSelectedTheme] =
    React.useState<keyof Themes>("animals");

  const duplicatedThemes = [
    ...themes[selectedTheme].slice(0, difficulty),
    ...themes[selectedTheme].slice(0, difficulty),
  ].sort(() => Math.random() - 0.5);

  console.log(duplicatedThemes);

  const randomTiles = duplicatedThemes.map((emoji, index) => (
    <div key={index} className="tile">
      {emoji}
    </div>
  ));

  return (
    <div className="game-container">
      <select
        onChange={(event) =>
          setSelectedTheme(event.target.value as keyof Themes)
        }
      >
        {themesKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <select
        onChange={(event) =>
          setDifficulty(parseInt(event.target.value) as Difficulty)
        }
      >
        <option value={Difficulty.Easy}>Easy</option>
        <option value={Difficulty.Medium}>Medium</option>
        <option value={Difficulty.Hard}>Hard</option>
        <option value={Difficulty.Extreme}>Extreme</option>
      </select>
      <div className="game-board">{randomTiles}</div>
    </div>
  );
};

export default GameBoard;
