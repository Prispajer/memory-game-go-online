import { GamePredefinedTileSets } from "../types/enum";

const gamePredefinedSets: Record<GamePredefinedTileSets, string[]> = {
  [GamePredefinedTileSets.Animals]: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐯",
    "🦁",
  ],
  [GamePredefinedTileSets.Fruits]: [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍒",
    "🍓",
    "🍑",
    "🥭",
    "🍍",
    "🍐",
  ],
  [GamePredefinedTileSets.Music]: [
    "🎵",
    "🎸",
    "🎺",
    "🥁",
    "🎻",
    "🎤",
    "🎧",
    "📯",
    "🎹",
    "🎼",
  ],
  [GamePredefinedTileSets.Space]: [
    "🚀",
    "🪐",
    "🌌",
    "🌠",
    "🌕",
    "🌍",
    "🌞",
    "🌛",
    "👾",
    "🛰️",
  ],
  [GamePredefinedTileSets.Sports]: [
    "⚽",
    "🏀",
    "🏈",
    "🎾",
    "🏓",
    "🥊",
    "🏋️",
    "⛷️",
    "🏄",
    "🚴",
  ],
  [GamePredefinedTileSets.Fantasy]: [
    "🦄",
    "🐲",
    "🧙‍♂️",
    "🧝‍♀️",
    "🐉",
    "✨",
    "🧞‍♂️",
    "🦹‍♂️",
    "🧛‍♂️",
    "🔮",
  ],
};

export type GamePredefinedSetsKey = keyof typeof gamePredefinedSets;
export default gamePredefinedSets;
