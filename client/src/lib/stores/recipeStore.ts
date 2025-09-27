import { makeAutoObservable } from "mobx";

export class RecipeStore {
  title = '';
  selectedTags: string[] = [];
  includeUserAllergens = false;
  selectedIngredients: string[] = [];
  sortBy = 'newest';
  difficulty = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setTitle = (title: string) => {
    this.title = title;
  };

  setSelectedTags = (tags: string[]) => {
    this.selectedTags = tags;
  };

  setIncludeUserAllergens = (include: boolean) => {
    this.includeUserAllergens = include;
  };

  setSelectedIngredients = (ingredients: string[]) => {
    this.selectedIngredients = ingredients;
  };

  setSortBy = (sortBy: string) => {
    this.sortBy = sortBy;
  };

  setDifficulty = (difficulty: number) => {
    this.difficulty = difficulty;
  };

  resetFilters = () => {
    this.title = '';
    this.selectedTags = [];
    this.includeUserAllergens = false;
    this.selectedIngredients = [];
    this.sortBy = 'newest';
    this.difficulty= 0;
  };
}
