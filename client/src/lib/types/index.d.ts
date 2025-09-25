type ResetPassword = {
  email: string
  resetCode: string
  newPassword: string
}

type PagedList<T, TCursor> = {
  items: T[];
  nextCursor: TCursor;
}

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
  userImageUrl?: string;
  imageUrl?:string;
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string
};

type Step = {
  id?: string;
  order: number;
  description: string;
};

type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
  order: number;
};

type CreateUpdateIngredient = {
  name: string;
  quantity: number;
  unitId: string;
  order?: number;
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
  lastName: string;
  imageUrl?: string
  followingCount?: number;
  followersCount?: number;
  following?: boolean;
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

type ShoppingList = {
  id: string;
  title : string;
  createdAt: string;
  shoppingListItems: ShoppingListItem[];
}

type CreateShoppingList = {
  title : string;
  shoppingListItems: CreateShoppingListItem[];
}

type ShoppingListItem = {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
  isChecked: boolean;
  order: number;
}
type CreateShoppingListItem = {
  name: string;
  quantity: number;
  unitId: string;
  order: number;
};
type UpdateShoppingList = {
  id: string;
  title : string;
  shoppingListItems: UpdateShoppingListItem[];
};
type UpdateShoppingListItem = {
  name: string;
  quantity: number;
  unitId: string;
  isChecked: boolean;
};

type Photo = {
  id: string
  url: string
}

type RecentRecipes = {
  id: string;
  imageUrl?:string;
}

type UserRecentRecipes = {
  recentRecipes : RecentRecipes[];
  totalCount : number;
}
