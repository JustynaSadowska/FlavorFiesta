export enum Difficulty {
  Easy = 1,
  Medium,
  Hard,
}

export const difficultyOptions = [
  { label: "Easy", value: Difficulty.Easy },
  { label: "Medium", value: Difficulty.Medium },
  { label: "Hard", value: Difficulty.Hard },
];
export const difficultyFilterOptions = [
  { label: "All", value: 0 },
  ...difficultyOptions,
];