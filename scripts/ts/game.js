"use strict";
var lastEpochMS = 0;
var epochInMS = 1000;
var jarVolume = 32;
var filledVolume = 0;
var spillage = 0;
var Resource = /** @class */ (function () {
    function Resource(incPerEpoch, initialAmount, decay) {
        this.amount = initialAmount;
        this.incPerEpoch = incPerEpoch;
        this.decay = decay;
        this.storedEpochs = 0;
    }
    ;
    Resource.prototype.evolve = function (newEpochs) {
        var totalEpochs = this.storedEpochs + newEpochs;
        var amountToAdd = totalEpochs * this.incPerEpoch;
        amountToAdd -= totalEpochs * this.decay;
        if (amountToAdd >= 1 || amountToAdd <= -1) {
            if (amountToAdd < 0) {
                amountToAdd = Math.ceil(amountToAdd);
            }
            else {
                amountToAdd = Math.floor(amountToAdd);
            }
            this.amount += amountToAdd;
            if (this.amount < 0) {
                this.amount = 0;
            }
            this.storedEpochs = 0;
        }
        else {
            this.storedEpochs = totalEpochs;
        }
    };
    return Resource;
}());
;
var resourceStore = {
    "yeast": new Resource(0, 0, 0),
    "food": new Resource(0, 0, 0.5)
};
function render() {
    // Render the jar
    document.getElementById("jar-capacity").innerText = "" + jarVolume;
    document.getElementById("used").innerText = "" + filledVolume;
    document.getElementById("spillage").innerText = "" + spillage;
    // For now, we assume all resources in stash are in div named stash-resourcename
    for (var k in resourceStore) {
        var elem = document.getElementById("stash-" + k);
        if (elem != null) {
            elem.innerText = "" + resourceStore[k].amount;
        }
    }
}
function evolveResources(epochs) {
    if (epochs > 0) {
        for (var k in resourceStore) {
            var r = resourceStore[k];
            r.evolve(epochs);
        }
        lastEpochMS += epochs * epochInMS;
    }
}
function gameLoop(event) {
    var epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
    var resourceEpochs = Math.floor(epochDelta / epochInMS);
    evolveResources(resourceEpochs);
    // Update grow rate for yeast based on food
    var foodVolume = resourceStore["food"].amount;
    var yeastVolume = resourceStore["yeast"].amount / 10;
    resourceStore["yeast"].incPerEpoch = foodVolume;
    filledVolume = foodVolume;
    filledVolume += yeastVolume;
    if (filledVolume > jarVolume) {
        spillage = filledVolume - jarVolume;
        filledVolume = jarVolume;
    }
    render();
}
;
createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj) {
    gameLoop(eventObj);
});
function addFood() {
    if (filledVolume + 1 <= jarVolume) {
        resourceStore["food"].amount++;
    }
    else {
        console.log("Jar full!");
    }
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
        resourceStore["yeast"].amount = Math.ceil(resourceStore["yeast"].amount * 0.5);
        resourceStore["food"].amount = Math.ceil(resourceStore["food"].amount * 0.5);
    };
};
