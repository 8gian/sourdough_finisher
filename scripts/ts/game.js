"use strict";
var lastEpochMS = 0;
var epochInMS = 1000;
var jarVolume = 32;
var filledVolume = 0;
var spillage = 0;
// Misuse of the type, these are actually numbers 1-10
var YEASTY_RATES = {
    fed: 0.05,
    happy: 0.05,
    waiting: 0.01,
    hungry: 0.01,
    starving: 0.001,
    dead: 0.0,
};
var YEASTY_HEALTH = {
    fed: 1.0,
    happy: 1.0,
    waiting: 1.0,
    hungry: 0.75,
    starving: 0.25,
    dead: 0.0,
};
var YEASTY_HUNGER = {
    fed: 0.0,
    happy: 0.1,
    waiting: 0.5,
    hungry: 0.9,
    starving: 1.0,
    dead: 0.0,
};
// Yeast volume multiplier
var YEASTY_VOLUME = {
    fed: 1.0,
    happy: 1.75,
    waiting: 2.5,
    hungry: 1.75,
    starving: 1.25,
    dead: 1.0,
};
function hunger(yeast) {
    var alive = yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving;
    var hungerAbsolute = yeast.fed * YEASTY_HUNGER.fed
        + yeast.happy * YEASTY_HUNGER.happy
        + yeast.waiting * YEASTY_HUNGER.waiting
        + yeast.hungry * YEASTY_HUNGER.hungry
        + yeast.starving * YEASTY_HUNGER.starving;
    return hungerAbsolute / alive;
}
function stepYeast(yeast) {
    var gotHappy = yeast.fed * YEASTY_RATES.fed;
    var gotWaiting = yeast.happy * YEASTY_RATES.happy;
    var gotHungry = yeast.waiting * YEASTY_RATES.waiting;
    var gotStarving = yeast.hungry * YEASTY_RATES.hungry;
    var gotDead = yeast.starving * YEASTY_RATES.starving;
    return {
        fed: yeast.fed - gotHappy,
        happy: gotHappy + yeast.happy - gotWaiting,
        waiting: gotWaiting + yeast.waiting - gotHungry,
        hungry: gotHungry + yeast.hungry - gotStarving,
        starving: gotStarving + yeast.starving - gotDead,
        dead: gotDead + yeast.dead,
    };
}
function feedYeast(amount, yeast) {
    var feedMeSeymor = yeast.waiting + yeast.hungry + yeast.starving;
    if (feedMeSeymor >= amount) {
        // Not enough food to feed all the really hungry yeast
        console.log("A");
        return {
            fed: yeast.fed + amount + amount,
            happy: yeast.happy,
            waiting: yeast.waiting - (yeast.waiting / feedMeSeymor) * amount,
            hungry: yeast.hungry - (yeast.hungry / feedMeSeymor) * amount,
            starving: yeast.starving - (yeast.starving / feedMeSeymor) * amount,
            dead: yeast.dead,
        };
    }
    else if (feedMeSeymor + yeast.happy >= amount) {
        // Feeding all the really hungry yeast, plus some the yeast that could have a bite
        console.log("B");
        return {
            fed: yeast.fed + amount + amount,
            happy: yeast.happy - (amount - feedMeSeymor),
            waiting: 0,
            hungry: 0,
            starving: 0,
            dead: yeast.dead,
        };
    }
    else {
        // Some feed goes to waste as dead material
        console.log("C");
        return {
            fed: (yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving) * 2,
            happy: 0,
            waiting: 0,
            hungry: 0,
            starving: 0,
            dead: yeast.dead + amount - (yeast.happy + yeast.waiting + yeast.hungry + yeast.starving),
        };
    }
}
function yeastVolume(yeast) {
    return yeast.fed * YEASTY_VOLUME.fed
        + yeast.happy * YEASTY_VOLUME.happy
        + yeast.waiting * YEASTY_VOLUME.waiting
        + yeast.hungry * YEASTY_VOLUME.hungry
        + yeast.starving * YEASTY_VOLUME.starving
        + yeast.dead * YEASTY_VOLUME.dead;
}
function clampYeast(maxVolume, yeast) {
    var volume = yeastVolume(yeast);
    if (volume <= maxVolume)
        return [yeast, 0];
    var loss = (volume - maxVolume) / volume;
    return [
        {
            fed: yeast.fed * (1 - loss),
            happy: yeast.happy * (1 - loss),
            waiting: yeast.waiting * (1 - loss),
            hungry: yeast.hungry * (1 - loss),
            starving: yeast.starving * (1 - loss),
            dead: yeast.dead * (1 - loss),
        },
        volume - maxVolume,
    ];
}
var GLOBAL_YEAST = { fed: 1, happy: 0, waiting: 0, hungry: 0, starving: 0, dead: 0 };
function render() {
    // Render the jar
    document.getElementById("jar-capacity").innerText = "" + jarVolume;
    document.getElementById("used").innerText = "" + filledVolume;
    document.getElementById("spillage").innerText = "" + spillage;
    document.getElementById("used").innerText = "" + yeastVolume(GLOBAL_YEAST);
    document.getElementById("hunger").innerText = Math.round(hunger(GLOBAL_YEAST) * 100) + "%";
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
function evolveResources(epochs) {
    for (var i = 0; i < epochs; i++) {
        GLOBAL_YEAST = stepYeast(GLOBAL_YEAST);
    }
}
function gameLoop(event) {
    var epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
    var resourceEpochs = Math.floor(epochDelta / epochInMS);
    evolveResources(resourceEpochs);
    if (resourceEpochs > 0) {
        lastEpochMS += resourceEpochs * epochInMS;
    }
    var _a = clampYeast(jarVolume, GLOBAL_YEAST), newYeast = _a[0], newSpill = _a[1];
    GLOBAL_YEAST = newYeast;
    spillage += newSpill;
    render();
}
;
createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj) {
    gameLoop(eventObj);
});
function addFood() {
    console.log("Adding food");
    console.log(GLOBAL_YEAST);
    GLOBAL_YEAST = feedYeast(1, GLOBAL_YEAST);
    console.log(GLOBAL_YEAST);
    var _a = clampYeast(jarVolume, GLOBAL_YEAST), newYeast = _a[0], newSpill = _a[1];
    GLOBAL_YEAST = newYeast;
    console.log(newYeast);
    spillage += newSpill;
    console.log(GLOBAL_YEAST);
}
window.onload = function () {
    // Add button click listeners
    var addFoodButton = document.getElementById("add-food");
    addFoodButton.onclick = function () {
        console.log("trying to add food");
        addFood();
    };
    /* all actions below (currently 5 - bake / another-jar / trade / ga / ta)
    need to decrease the volume by 50%
    */
    var bakeButton = document.getElementById("bake");
    bakeButton.onclick = function () {
        // + some breads (max amount)
    };
    var anotherJarButton = document.getElementById("another-jar");
    anotherJarButton.onclick = function () {
        // Space left in jar increases by 1024 (jar capacity)
        // % Health increases
    };
    var tradeButton = document.getElementById("trade");
    tradeButton.onclick = function () {
        // You gain a “something” (we don’t know the value yet)
    };
    var giveawayButton = document.getElementById("giveaway");
    giveawayButton.onclick = function () {
        // You gain some amount of “good” -- hidden counter to be revealed later 
    };
    var throwawayButton = document.getElementById("throwaway");
    throwawayButton.onclick = function () {
        //    resourceStore["yeast"].amount = Math.ceil(resourceStore["yeast"].amount * 0.5)
        //    resourceStore["food"].amount = Math.ceil(resourceStore["food"].amount * 0.5)
    };
};
