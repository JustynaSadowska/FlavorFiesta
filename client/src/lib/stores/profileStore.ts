import { makeAutoObservable } from "mobx";

export class ProfileStore {
  name = '';
  constructor() {
    makeAutoObservable(this);
  }

  setName = (name: string) => {
    this.name = name;
  };

}
