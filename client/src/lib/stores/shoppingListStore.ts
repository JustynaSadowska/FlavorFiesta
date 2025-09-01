// stores/ShoppingListStore.ts
import { makeAutoObservable, runInAction } from "mobx";

export default class ShoppingListStore {
checkedItems: Record<string, string[]> = {};

constructor() {
  makeAutoObservable(this);
  this.loadFromLocalStorage();
}

toggleItem(listId: string, itemId: string) {
  if (!this.checkedItems[listId]) this.checkedItems[listId] = [];
  const idx = this.checkedItems[listId].indexOf(itemId);
  if (idx === -1) this.checkedItems[listId].push(itemId);
  else this.checkedItems[listId].splice(idx, 1);
  this.saveToLocalStorage();
}

saveToLocalStorage() {
  localStorage.setItem('shoppingListsChecked', JSON.stringify(this.checkedItems));
}

loadFromLocalStorage() {
  const data = localStorage.getItem('shoppingListsChecked');
  if (data) this.checkedItems = JSON.parse(data);
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
