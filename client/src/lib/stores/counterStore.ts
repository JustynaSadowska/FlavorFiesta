import {makeAutoObservable} from 'mobx';
export default class CounterStore {
  title = 'Counter store';
  count = 42;
  events: string[] = [
    `initial count is ${this.count}`
  ]

  constructor(){
    makeAutoObservable(this)
  }

  increment = (amount = 1) => {
    this.count += amount;
    this.events.push(`incremented by ${amount} - count is now ${this.count}`)
  }

  decrement = (amount = 1) => {
    this.count -= amount;
    this.events.push(`decremented by ${amount} - count is now ${this.count}`)
  }

  get eventCount() {
    return this.events.length
  }
}
