import { createContext } from "react";
import CounterStore from "./counterStore";
import { UiStore } from "./uiStore";
import { RecipeStore } from "./recipeStore";
import { ProfileStore } from "./profileStore";

interface Store {
    counterStore: CounterStore
    uiStore: UiStore
    recipeStore : RecipeStore
    profileStore: ProfileStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    recipeStore: new RecipeStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);