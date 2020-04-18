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
  "yeast": new Resource(1, 0),
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

function gameLoop(event: createjs.TickerEvent): void {
  console.log("foo");
  const epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
  const resourceEpochs = Math.floor(epochDelta / epochInMS);
  if (resourceEpochs > 0) {
    for (let k in resourceStore) {
      const r = resourceStore[k];
      r.amount += resourceEpochs * r.incPerEpoch;
    }
    lastEpochMS += resourceEpochs * epochInMS;
  }
  render();
};


createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj: Object) {
  gameLoop((<createjs.TickerEvent>eventObj));
});