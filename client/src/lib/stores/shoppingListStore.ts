// stores/ShoppingListStore.ts
import { makeAutoObservable, runInAction } from "mobx";

export default class ShoppingListStore {
  checkedItems: Record<string, string[]> = {}; 

  constructor() {
    makeAutoObservable(this);
  }

  setCheckedItems(listId: string, items: string[]) {
    this.checkedItems[listId] = items;
  }

  toggleItem(listId: string, itemId: string) {
    const items = this.checkedItems[listId] || [];
    if (items.includes(itemId)) {
      this.checkedItems[listId] = items.filter(id => id !== itemId);
    } else {
      this.checkedItems[listId] = [...items, itemId];
    }
  }

  async fetchCheckedItems(listId: string) {
    const response = await fetch(`/api/shopping-lists/${listId}/checked-items`);
    const items: string[] = await response.json();
    runInAction(() => {
      this.checkedItems[listId] = items;
    });
  }

  async saveCheckedItems(listId: string) {
    const items = this.checkedItems[listId] || [];
    await fetch(`/api/shopping-lists/${listId}/checked-items`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
  }
}
