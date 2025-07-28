type CreateUpdateRecipe = {
  id?: string;
  title: string;
  description?: string;
  servings: number;
  preparationTime: number;
  difficulty: number;
  isVisible: boolean;
  steps: Step[];
  ingredients: CreateUpdateIngredient[];
  tagsIds: string[];
  allergensIds?: string[];
};

type Recipe = {
  id: string;
  title: string;
  description?: string;
  servings: number;
  preparationTime: number;
  difficulty: number;
  isVisible: boolean;
  createdAt: string;
  steps: Step[];
  authorFirstName: string;
  authorLastName: string;
  isAuthor: boolean;
  userId: string;
  ingredients: Ingredient[];
  tags: TagAllergen[];
  allergens?: TagAllergen[];
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Step = {
  id?: string;
  order?: number;
  description: string;
};

type Ingredient = {
  id: string;
  name: string;
  quantity: decimal;
  unit: Unit;
};

type CreateUpdateIngredient = {
  name: string;
  quantity: decimal;
  unitId: string;
};

type Unit = {
  id: string;
  displayName: string;
};

type TagAllergen = {
  id?: string;
  name: string;
};

type Profile = {
  id: string;
  firstName: string;
  lastName: string
 // bio?: string
}

type Review = {
  id: string;
  comment? : string;
  rating: number;
  createdAt: string;
  reviewAuthor : Profile;
  isReviewAuthor: boolean;
}

type CreateUpdateReview = {
  id?: string;
  comment? : string;
  rating: number;
  recipeId: string;
}
