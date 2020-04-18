"use strict";
var lastEpochMS = 0;
var epochInMS = 1000;
var Resource = /** @class */ (function () {
    function Resource(incPerEpoch, initialAmount) {
        this.amount = initialAmount;
        this.incPerEpoch = incPerEpoch;
    }
    return Resource;
}());
;
var resourceStore = {
    "yeast": new Resource(0, 0),
    "flour": new Resource(0, 0),
    "water": new Resource(0, 0),
};
function render() {
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
            r.amount += epochs * r.incPerEpoch;
        }
        lastEpochMS += epochs * epochInMS;
    }
}
function gameLoop(event) {
    var epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
    var resourceEpochs = Math.floor(epochDelta / epochInMS);
    evolveResources(resourceEpochs);
    // Update grow rate for yeast based on flour and water
    var growRate = resourceStore["flour"].amount * resourceStore["water"].amount;
    resourceStore["yeast"].incPerEpoch = growRate;
    render();
}
;
createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj) {
    gameLoop(eventObj);
});
window.onload = function () {
    // Add button click listeners
    var addFlourButton = document.getElementById("add-flour");
    addFlourButton.onclick = function () {
        console.log("added flour");
        resourceStore["flour"].amount++;
    };
    var addWaterButton = document.getElementById("add-water");
    addWaterButton.onclick = function () {
        console.log("added water");
        resourceStore["water"].amount++;
    };
};
