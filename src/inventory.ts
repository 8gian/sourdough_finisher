const randomItemsSet: string[] = [
  "an old shoe",
  "a frog",
  "a pomegranate",
  "the Hitchhiker's Guide to the Galaxy",
  "a gaggle of geese",
  "a fruit rollup",
  "a marker",
  "a bag of peanuts",
];

const bakingItemsSet: string[] = [
  "a baker's hat",
  "an apron",
  "a rolling pin",
  "a thermometer",
  "a kitchen timer",
  "oven mitts",
];

export class Inventory {
  bakingItemsRemaining: string[];
  bakingItems: string[];
  randomItemsRemaining: string[];
  randomItems: string[];
  items: string[];

  constructor() {
    this.bakingItemsRemaining = bakingItemsSet.map((value, index) => value);
    this.bakingItems = [];
    this.randomItemsRemaining = randomItemsSet.map((value, index) => value);
    this.randomItems = [];
    this.items = [];
  }

  canAddNewItem(): boolean {
    let itemsReceived = this.items.length;
    return itemsReceived != randomItemsSet.length + bakingItemsSet.length
  }

  getAllItems() {
    return this.items.map((value, index) => value);
  }

  addNewItem(): string | null {
    if (!this.canAddNewItem()) {
      return null
    }
    let itemsReceived = this.bakingItems.length + this.randomItems.length + 1;
    let getBakingItemThreshold = (this.bakingItems.length / itemsReceived);
    let received = "";
    let randItem = Math.random();
    if (this.bakingItems.length > 0 && (this.randomItemsRemaining.length == 0 || randItem > getBakingItemThreshold)) {
      const itemIndex = Math.floor(Math.random() * this.bakingItemsRemaining.length);
      received = this.bakingItemsRemaining[itemIndex];
      this.bakingItemsRemaining.splice(itemIndex, 1);
      this.bakingItems.push(received);
    } else {
      const itemIndex = Math.floor(Math.random() * this.randomItemsRemaining.length);
      received = this.randomItemsRemaining[itemIndex];
      this.randomItemsRemaining.splice(itemIndex, 1);
      this.randomItems.push(received);
    }
    this.items.push(received);

    return received;
  };

  render(elem: string) {
    let itemList = document.getElementById(elem)
    if (!itemList) {
      return
    }
    itemList.innerHTML = "<li>" + this.items.join("</li><li>") + "</li>";
  }
}