let lastEpochMS: number = 0;
let epochInMS: number = 1000;

class Resource {
  amount: number;
  incPerEpoch: number;

  constructor(incPerEpoch: number, initialAmount: number) {
    this.amount = initialAmount;
    this.incPerEpoch = incPerEpoch;
  }
};

let resourceStore: Record<string, Resource> = {
  "yeast": new Resource(0, 0),
  "flour": new Resource(0, 0),
  "water": new Resource(0, 0),
};

function render() {
  // For now, we assume all resources in stash are in div named stash-resourcename
  for (let k in resourceStore) {
    const elem = document.getElementById("stash-" + k);
    if (elem != null) {
      elem.innerText = `${resourceStore[k].amount}`;
    }
  }
}

function evolveResources(epochs : number) {
  if (epochs > 0) {
    for (let k in resourceStore) {
      const r = resourceStore[k];
      r.amount += epochs * r.incPerEpoch;
    }
    lastEpochMS += epochs * epochInMS;
  }
}

function gameLoop(event: createjs.TickerEvent): void {
  const epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
  const resourceEpochs = Math.floor(epochDelta / epochInMS);
  evolveResources(resourceEpochs);

  // Update grow rate for yeast based on flour and water
  let growRate = resourceStore["flour"].amount * resourceStore["water"].amount;
  resourceStore["yeast"].incPerEpoch = growRate;

  render();
};


createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj: Object) {
  gameLoop((<createjs.TickerEvent>eventObj));
});

window.onload = () => {
  // Add button click listeners
  let addFlourButton = document.getElementById("add-flour");
  addFlourButton!.onclick = () => { 
    console.log("added flour"); 
    resourceStore["flour"].amount++
    } ;

  let addWaterButton = document.getElementById("add-water");
  addWaterButton!.onclick = () => { 
    console.log("added water"); 
    resourceStore["water"].amount++
    } ;
}