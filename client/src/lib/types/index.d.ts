type Recipe = {
  id?: string;
  title: string;
  description?: string;
  servings: number;
  preparationTime: number;
  difficulty: number;
  isVisible: boolean;
  createdAt?: string;
  steps: Step[];
  authorFirstName?: string;
  authorLastName?: string;
  isAuthor?: boolean;
  userId?: string;
  ingredients:
    | Ingredient[]
    | { name: string; quantity: decimal; unitId: string }[];
  tags?: TagAllergen[];
  tagsIds?: string[];
  allergens?: TagAllergen[];
  allergensIds?: string[];
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Step = {
  id?: string;
  description: string;
};

type Ingredient = {
  id?: string;
  name: string;
  quantity: decimal;
  unit: Unit;
};

type Unit = {
  id: string;
  displayName: string;
};

type TagAllergen = {
  id?: string;
  name: string;
};
