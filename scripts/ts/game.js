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
    "yeast": new Resource(1, 0),
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
function gameLoop(event) {
    console.log("foo");
    var epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
    var resourceEpochs = Math.floor(epochDelta / epochInMS);
    if (resourceEpochs > 0) {
        for (var k in resourceStore) {
            var r = resourceStore[k];
            r.amount += resourceEpochs * r.incPerEpoch;
        }
        lastEpochMS += resourceEpochs * epochInMS;
    }
    render();
}
;
createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj) {
    gameLoop(eventObj);
});
