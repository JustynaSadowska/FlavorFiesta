import { createContext } from "react";
import CounterStore from "./counterStore";
import { UiStore } from "./uiStore";
import ShoppingListStore from "./shoppingListStore";

interface Store {
    counterStore: CounterStore
    uiStore: UiStore
    shoppingListStore : ShoppingListStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    shoppingListStore : new ShoppingListStore()
}

export const StoreContext = createContext(store);