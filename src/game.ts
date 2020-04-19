/// <reference path="../node_modules/@types/easeljs/index.d.ts" />
import { yeastVolume, hunger, health, stepYeast, clampYeast, feedYeast, YeastyGoodness } from "./YeastLogic";

let lastEpochMS: number = 0;
let epochInMS: number = 1000;
let jarVolume: number = 32;
let filledVolume: number = 0;
let spillage: number = 0;



let GLOBAL_YEAST : YeastyGoodness = { fed : 1, happy : 0, waiting : 0, hungry : 0, starving : 0, dead : 2 };

function render() {
  // Render the jar
  document.getElementById("jar-capacity")!.innerText = ""+jarVolume;
  document.getElementById("used")!.innerText = ""+filledVolume;
  document.getElementById("spillage")!.innerText = ""+spillage;
  document.getElementById("used")!.innerText = `${yeastVolume(GLOBAL_YEAST)}`;
  document.getElementById("hunger")!.innerText = `${Math.round(hunger(GLOBAL_YEAST)*100)}%`
  document.getElementById("health")!.innerText = `${Math.round(health(GLOBAL_YEAST)*100)}%`
  // For now, we assume all resources in stash are in div named stash-resourcename
/*
  for (let k in resourceStore) {
    const elem = document.getElementById("stash-" + k);
    if (elem != null) {
      elem.innerText = `${resourceStore[k].amount}`;
    }
  }
*/
}

function evolveResources(epochs: number) {
  for (let i = 0; i < epochs; i++) {
    GLOBAL_YEAST = stepYeast(GLOBAL_YEAST);
  }
}

function gameLoop(event: createjs.TickerEvent): void {
  const epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
  const resourceEpochs = Math.floor(epochDelta / epochInMS);
  evolveResources(resourceEpochs);
  if (resourceEpochs > 0) {
    lastEpochMS += resourceEpochs * epochInMS;
  }

  const [newYeast, newSpill] = clampYeast(jarVolume, GLOBAL_YEAST);
  GLOBAL_YEAST = newYeast;
  spillage += newSpill;

  render();
};

createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj: Object) {
  gameLoop((<createjs.TickerEvent>eventObj));
});

function addFood() {
  console.log("Adding food")!
  console.log(GLOBAL_YEAST);
  GLOBAL_YEAST = feedYeast(1, GLOBAL_YEAST);
  console.log(GLOBAL_YEAST);
  const [newYeast, newSpill] = clampYeast(jarVolume, GLOBAL_YEAST);
  GLOBAL_YEAST = newYeast;
  console.log(newYeast);
  spillage += newSpill;
  console.log(GLOBAL_YEAST);
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
//    resourceStore["yeast"].amount = Math.ceil(resourceStore["yeast"].amount * 0.5)
//    resourceStore["food"].amount = Math.ceil(resourceStore["food"].amount * 0.5)
  };
}