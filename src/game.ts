let lastEpochMS: number = 0;
let epochInMS: number = 1000;
let jarVolume: number = 32;
let filledVolume: number = 0;
let spillage: number = 0;

class Resource {
  amount: number;
  incPerEpoch: number;
  decay: number;
  storedEpochs: number;

  constructor(incPerEpoch: number, initialAmount: number, decay: number) {
    this.amount = initialAmount;
    this.incPerEpoch = incPerEpoch;
    this.decay = decay;
    this.storedEpochs = 0;
  };

  evolve(newEpochs: number) {
    const totalEpochs = this.storedEpochs + newEpochs;
    let amountToAdd = totalEpochs * this.incPerEpoch;
    amountToAdd -= totalEpochs * this.decay;
    if (amountToAdd >= 1 || amountToAdd <= -1) {
      if (amountToAdd < 0) {
        amountToAdd = Math.ceil(amountToAdd);
      } else {
        amountToAdd = Math.floor(amountToAdd);
      }
      this.amount += amountToAdd;
      if (this.amount < 0) {
        this.amount = 0;
      }
      this.storedEpochs = 0;
    } else {
      this.storedEpochs = totalEpochs;
    }
  }
};

let resourceStore: Record<string, Resource> = {
  "yeast": new Resource(0, 0, 0),
  "food": new Resource(0, 0, 0.5)
};

function render() {
  // Render the jar
  document.getElementById("jar-capacity")!.innerText = ""+jarVolume;
  document.getElementById("used")!.innerText = ""+filledVolume;
  document.getElementById("spillage")!.innerText = ""+spillage;

  // For now, we assume all resources in stash are in div named stash-resourcename
  for (let k in resourceStore) {
    const elem = document.getElementById("stash-" + k);
    if (elem != null) {
      elem.innerText = `${resourceStore[k].amount}`;
    }
  }
}

function evolveResources(epochs: number) {
  if (epochs > 0) {
    for (let k in resourceStore) {
      const r = resourceStore[k];
      r.evolve(epochs);
    }
    lastEpochMS += epochs * epochInMS;
  }
}

function gameLoop(event: createjs.TickerEvent): void {
  const epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
  const resourceEpochs = Math.floor(epochDelta / epochInMS);
  evolveResources(resourceEpochs);

  // Update grow rate for yeast based on food
  const foodVolume = resourceStore["food"].amount;
  const yeastVolume = resourceStore["yeast"].amount / 10;
  resourceStore["yeast"].incPerEpoch = foodVolume;

  filledVolume = foodVolume;
  filledVolume += yeastVolume;

  if(filledVolume > jarVolume) {
    spillage = filledVolume - jarVolume;
    filledVolume = jarVolume;
  }

  render();
};

createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj: Object) {
  gameLoop((<createjs.TickerEvent>eventObj));
});

function addFood() {
  if(filledVolume + 1 <= jarVolume) {
    resourceStore["food"].amount++;
  } else {
    console.log("Jar full!")
  }
}

window.onload = () => {
  // Add button click listeners
  let addFoodButton = document.getElementById("add-food");
  addFoodButton!.onclick = () => {
    console.log("trying to add food");
    addFood();
  };

  /* all actions below (currently 5 - bake / another-jar / trade / ga / ta)
  need to decrease the volume by 50%
  */
  let bakeButton = document.getElementById("bake");
  bakeButton!.onclick = () => {
    // + some breads (max amount)
  };

  let anotherJarButton = document.getElementById("another-jar");
  anotherJarButton!.onclick = () => {
    // Space left in jar increases by 1024 (jar capacity)
    // % Health increases
  };

  let tradeButton = document.getElementById("trade");
  tradeButton!.onclick = () => {
    // You gain a “something” (we don’t know the value yet)
  };

  let giveawayButton = document.getElementById("giveaway");
  giveawayButton!.onclick = () => {
    // You gain some amount of “good” -- hidden counter to be revealed later 
  };

  let throwawayButton = document.getElementById("throwaway");
  throwawayButton!.onclick = () => {
    resourceStore["yeast"].amount = Math.ceil(resourceStore["yeast"].amount * 0.5)
    resourceStore["food"].amount = Math.ceil(resourceStore["food"].amount * 0.5)
  };
}