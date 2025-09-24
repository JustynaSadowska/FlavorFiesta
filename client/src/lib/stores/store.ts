import { createContext } from "react";
import CounterStore from "./counterStore";
import { UiStore } from "./uiStore";
import { RecipeStore } from "./recipeStore";

interface Store {
    counterStore: CounterStore
    uiStore: UiStore
    recipeStore : RecipeStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    recipeStore: new RecipeStore(),
}

export const StoreContext = createContext(store);