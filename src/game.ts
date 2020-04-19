let lastEpochMS: number = 0;
let epochInMS: number = 1000;
let jarVolume: number = 32;
let filledVolume: number = 0;
let spillage: number = 0;

interface YeastyGoodness {
  fed: number;
  happy: number;
  waiting: number;
  hungry: number;
  starving: number;
  dead: number;
}

// Misuse of the type, these are actually numbers 1-10
const YEASTY_RATES : YeastyGoodness = {
  fed: 0.05,
  happy: 0.05,
  waiting: 0.01,
  hungry: 0.01,
  starving: 0.001,
  dead: 0.0,
}

const YEASTY_HEALTH : YeastyGoodness = {
  fed : 1.0,
  happy : 1.0,
  waiting : 1.0,
  hungry : 0.75,
  starving : 0.25,
  dead : 0.0,
}

const YEASTY_HUNGER : YeastyGoodness = {
  fed : 0.0,
  happy : 0.1,
  waiting : 0.5,
  hungry : 0.9,
  starving : 1.0,
  dead : 0.0,
}

// Yeast volume multiplier
const YEASTY_VOLUME : YeastyGoodness = {
  fed : 1.0,
  happy : 1.75,
  waiting : 2.5,
  hungry : 1.75,
  starving : 1.25,
  dead : 1.0,
}

function hunger(yeast: YeastyGoodness): number {
  const alive = yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving;
  const hungerAbsolute = yeast.fed * YEASTY_HUNGER.fed  
    + yeast.happy * YEASTY_HUNGER.happy
    + yeast.waiting * YEASTY_HUNGER.waiting
    + yeast.hungry * YEASTY_HUNGER.hungry
    + yeast.starving * YEASTY_HUNGER.starving;
  return hungerAbsolute / alive;
}

function stepYeast(yeast: YeastyGoodness): YeastyGoodness {
  const gotHappy = yeast.fed * YEASTY_RATES.fed;
  const gotWaiting = yeast.happy * YEASTY_RATES.happy;
  const gotHungry = yeast.waiting * YEASTY_RATES.waiting;
  const gotStarving = yeast.hungry * YEASTY_RATES.hungry;
  const gotDead = yeast.starving * YEASTY_RATES.starving;

  return {
    fed : yeast.fed - gotHappy,
    happy : gotHappy + yeast.happy - gotWaiting,
    waiting : gotWaiting + yeast.waiting - gotHungry,
    hungry : gotHungry + yeast.hungry - gotStarving,
    starving : gotStarving + yeast.starving - gotDead,
    dead : gotDead + yeast.dead,
  }
}

function feedYeast(amount: number, yeast: YeastyGoodness): YeastyGoodness {
  const feedMeSeymor = yeast.waiting + yeast.hungry + yeast.starving;
  if (feedMeSeymor >= amount) {
    // Not enough food to feed all the really hungry yeast
    console.log("A");
    return {
      fed : yeast.fed + amount + amount,
      happy : yeast.happy,
      waiting : yeast.waiting - (yeast.waiting / feedMeSeymor) * amount,
      hungry : yeast.hungry - (yeast.hungry / feedMeSeymor) * amount,
      starving : yeast.starving - (yeast.starving / feedMeSeymor) * amount,
      dead : yeast.dead,
    };
  } else if (feedMeSeymor + yeast.happy >= amount) {
    // Feeding all the really hungry yeast, plus some the yeast that could have a bite
    console.log("B");
    return {
      fed : yeast.fed + amount + amount,
      happy : yeast.happy - (amount - feedMeSeymor),
      waiting : 0,
      hungry : 0,
      starving : 0,
      dead : yeast.dead,
    };
  } else {
    // Some feed goes to waste as dead material
    console.log("C");
    return {
      fed : (yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving) * 2,
      happy : 0,
      waiting : 0,
      hungry : 0,
      starving : 0,
      dead : yeast.dead + amount - (yeast.happy + yeast.waiting + yeast.hungry + yeast.starving),
    };
  }
}

function yeastVolume(yeast: YeastyGoodness): number {
  return yeast.fed * YEASTY_VOLUME.fed
  + yeast.happy * YEASTY_VOLUME.happy
  + yeast.waiting * YEASTY_VOLUME.waiting
  + yeast.hungry * YEASTY_VOLUME.hungry
  + yeast.starving * YEASTY_VOLUME.starving
  + yeast.dead * YEASTY_VOLUME.dead;
} 

function clampYeast(maxVolume: number, yeast: YeastyGoodness): [YeastyGoodness, number] {
  const volume = yeastVolume(yeast);
  if (volume <= maxVolume) return [yeast, 0];
  const loss = (volume - maxVolume)/volume;
  return [
    {
      fed: yeast.fed * (1-loss),
      happy: yeast.happy * (1-loss),
      waiting: yeast.waiting * (1-loss),
      hungry: yeast.hungry * (1-loss),
      starving: yeast.starving * (1-loss),
      dead: yeast.dead * (1-loss),
    },
    volume - maxVolume,
  ]
}

let GLOBAL_YEAST : YeastyGoodness = { fed : 1, happy : 0, waiting : 0, hungry : 0, starving : 0, dead : 0 };

function render() {
  // Render the jar
  document.getElementById("jar-capacity")!.innerText = ""+jarVolume;
  document.getElementById("used")!.innerText = ""+filledVolume;
  document.getElementById("spillage")!.innerText = ""+spillage;
  document.getElementById("used")!.innerText = `${yeastVolume(GLOBAL_YEAST)}`;
  document.getElementById("hunger")!.innerText = `${Math.round(hunger(GLOBAL_YEAST)*100)}%`
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