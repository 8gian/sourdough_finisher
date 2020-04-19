/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/YeastLogic.ts":
/*!***************************!*\
  !*** ./src/YeastLogic.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants = {
    maturationRate: {
        fed: 0.1,
        happy: 0.1,
        waiting: 0.05,
        hungry: 0.05,
        starving: 0.05,
        dead: 0.0,
    },
    healthMultiplier: {
        fed: 1.0,
        happy: 1.0,
        waiting: 1.0,
        hungry: 0.75,
        starving: 0.25,
        dead: 0.0,
    },
    hungerMultiplier: {
        fed: 0.0,
        happy: 0.1,
        waiting: 0.5,
        hungry: 0.9,
        starving: 1.0,
        dead: 0.0,
    },
    volumeMultiplier: {
        fed: 1.0,
        happy: 1.75,
        waiting: 2.5,
        hungry: 1.75,
        starving: 1.25,
        dead: 1.0,
    },
};
const emptyYeast = {
    fed: 0,
    happy: 0,
    waiting: 0,
    hungry: 0,
    starving: 0,
    dead: 0,
};
function constantYeast(yeast) {
    return yeast;
}
exports.constantYeast = constantYeast;
function addYeast(yeast, newYeast) {
    return {
        fed: yeast.fed + newYeast.fed,
        happy: yeast.happy + newYeast.happy,
        waiting: yeast.waiting + newYeast.waiting,
        hungry: yeast.hungry + newYeast.hungry,
        starving: yeast.starving + newYeast.starving,
        dead: yeast.dead + newYeast.dead,
    };
}
exports.addYeast = addYeast;
function mapYeast(yeast, f) {
    return {
        fed: f(yeast.fed),
        happy: f(yeast.happy),
        waiting: f(yeast.waiting),
        hungry: f(yeast.hungry),
        starving: f(yeast.fed),
        dead: f(yeast.dead),
    };
}
exports.mapYeast = mapYeast;
function copyYeast(yeast) {
    return Object.assign({}, yeast);
}
exports.copyYeast = copyYeast;
function yeastLessThanEqual(yeast, yeast2) {
    return yeast.fed <= yeast2.fed && yeast.happy <= yeast2.happy && yeast.waiting <= yeast2.waiting && yeast.hungry <= yeast2.hungry && yeast.starving <= yeast2.starving && yeast.dead <= yeast2.dead;
}
exports.yeastLessThanEqual = yeastLessThanEqual;
function yeastLessThan(yeast, yeast2) {
    return yeast.fed < yeast2.fed && yeast.happy <= yeast2.happy && yeast.waiting <= yeast2.waiting && yeast.hungry <= yeast2.hungry && yeast.starving <= yeast2.starving && yeast.dead <= yeast2.dead;
}
exports.yeastLessThan = yeastLessThan;
function subtractYeast(yeast, yeast2) {
    const resultYeast = {
        fed: yeast.fed - yeast2.fed,
        happy: yeast.happy - yeast2.happy,
        waiting: yeast.waiting - yeast2.waiting,
        hungry: yeast.hungry - yeast2.hungry,
        starving: yeast.starving - yeast2.starving,
        dead: yeast.dead - yeast2.dead,
    };
    return resultYeast;
}
exports.subtractYeast = subtractYeast;
function hunger(yeast) {
    const alive = yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving;
    const hungerAbsolute = yeast.fed * constants.hungerMultiplier.fed +
        yeast.happy * constants.hungerMultiplier.happy +
        yeast.waiting * constants.hungerMultiplier.waiting +
        yeast.hungry * constants.hungerMultiplier.hungry +
        yeast.starving * constants.hungerMultiplier.starving;
    return hungerAbsolute / alive;
}
exports.hunger = hunger;
function health(yeast) {
    const total = yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving + yeast.dead;
    const hungerAbsolute = yeast.fed * constants.healthMultiplier.fed +
        yeast.happy * constants.healthMultiplier.happy +
        yeast.waiting * constants.healthMultiplier.waiting +
        yeast.hungry * constants.healthMultiplier.hungry +
        yeast.starving * constants.healthMultiplier.starving;
    return hungerAbsolute / total;
}
exports.health = health;
function stepYeast(yeast) {
    const gotHappy = yeast.fed * constants.maturationRate.fed;
    const gotWaiting = yeast.happy * constants.maturationRate.happy;
    const gotHungry = yeast.waiting * constants.maturationRate.waiting;
    const gotStarving = yeast.hungry * constants.maturationRate.hungry;
    const gotDead = yeast.starving * constants.maturationRate.starving;
    return {
        fed: yeast.fed - gotHappy,
        happy: gotHappy + yeast.happy - gotWaiting,
        waiting: gotWaiting + yeast.waiting - gotHungry,
        hungry: gotHungry + yeast.hungry - gotStarving,
        starving: gotStarving + yeast.starving - gotDead,
        dead: gotDead + yeast.dead,
    };
}
exports.stepYeast = stepYeast;
function feedYeast(amount, yeast) {
    const feedMeSeymor = yeast.waiting + yeast.hungry + yeast.starving;
    if (feedMeSeymor >= amount) {
        // Not enough food to feed all the really hungry yeast
        console.log('A');
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
        console.log('B');
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
        console.log('C');
        return {
            fed: yeast.fed + (yeast.happy + yeast.waiting + yeast.hungry + yeast.starving) * 2,
            happy: 0,
            waiting: 0,
            hungry: 0,
            starving: 0,
            dead: yeast.dead + amount - (yeast.happy + yeast.waiting + yeast.hungry + yeast.starving),
        };
    }
}
exports.feedYeast = feedYeast;
function calculateFractions(yeast) {
    const total = yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving + yeast.dead;
    return {
        fed: yeast.fed / total,
        happy: yeast.happy / total,
        waiting: yeast.waiting / total,
        hungry: yeast.hungry / total,
        starving: yeast.starving / total,
        dead: yeast.dead / total,
    };
}
exports.calculateFractions = calculateFractions;
function yeastVolume(yeast) {
    return (yeast.fed * constants.volumeMultiplier.fed +
        yeast.happy * constants.volumeMultiplier.happy +
        yeast.waiting * constants.volumeMultiplier.waiting +
        yeast.hungry * constants.volumeMultiplier.hungry +
        yeast.starving * constants.volumeMultiplier.starving +
        yeast.dead * constants.volumeMultiplier.dead);
}
exports.yeastVolume = yeastVolume;
function clampYeast(maxVolume, yeast) {
    const volume = yeastVolume(yeast);
    if (volume <= maxVolume)
        return [yeast, 0];
    const loss = (volume - maxVolume) / volume;
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
exports.clampYeast = clampYeast;
function yeastAmount(yeast) {
    return yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving + yeast.dead;
}
exports.yeastAmount = yeastAmount;
function livingYeastAmount(yeast) {
    return yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving;
}
exports.livingYeastAmount = livingYeastAmount;
function removeYeast(yeast, amount) {
    const takeout = Math.floor(amount);
    const currentAmount = yeastAmount(yeast);
    if (takeout < 1) {
        return null;
    }
    if (takeout > currentAmount - 1) {
        return null;
    }
    const takeoutFraction = takeout / yeastAmount(yeast);
    let removed = mapYeast(yeast, (prop) => Math.min(prop * takeoutFraction, prop));
    let remaining = subtractYeast(yeast, removed);
    // Just in case something went negative!
    remaining = mapYeast(remaining, (prop) => Math.max(0, prop));
    const removedAmount = yeastAmount(yeast);
    if (removedAmount < takeout) {
        removed.dead = removedAmount - takeout;
    }
    return { remaining: remaining, removed: removed };
}
exports.removeYeast = removeYeast;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const YeastLogic_1 = __webpack_require__(/*! ./YeastLogic */ "./src/YeastLogic.ts");
let lastEpochMS = 0;
let epochInMS = 1000;
let jarVolume = 32;
let filledVolume = 0;
let spillage = 0;
let Resources = {
    yeast: { fed: 1, happy: 0, waiting: 0, hungry: 0, starving: 0, dead: 2 },
    good: 0,
    bread: 0,
};
function setElement(id, contents) {
    const elem = document.getElementById(id);
    if (!elem)
        return;
    elem.innerText = contents;
}
function render() {
    // Render the jar
    document.getElementById('jar-capacity').innerText = '' + jarVolume;
    document.getElementById('used').innerText = '' + filledVolume;
    document.getElementById('spillage').innerText = '' + spillage;
    document.getElementById('used').innerText = `${YeastLogic_1.yeastVolume(Resources.yeast)}`;
    document.getElementById('hunger').innerText = `${Math.round(YeastLogic_1.hunger(Resources.yeast) * 100)}%`;
    document.getElementById('health').innerText = `${Math.round(YeastLogic_1.health(Resources.yeast) * 100)}%`;
    document.getElementById('stash-bread').innerText = `${Resources.bread}`;
    const fractions = YeastLogic_1.calculateFractions(Resources.yeast);
    setElement('debug_quantity', `${Resources.yeast.fed +
        Resources.yeast.happy +
        Resources.yeast.waiting +
        Resources.yeast.hungry +
        Resources.yeast.starving +
        Resources.yeast.dead}`);
    setElement('debug_fed', `${Math.round(fractions.fed * 100)}%`);
    setElement('debug_happy', `${Math.round(fractions.happy * 100)}%`);
    setElement('debug_waiting', `${Math.round(fractions.waiting * 100)}%`);
    setElement('debug_hungry', `${Math.round(fractions.hungry * 100)}%`);
    setElement('debug_starving', `${Math.round(fractions.starving * 100)}%`);
    setElement('debug_dead', `${Math.round(fractions.dead * 100)}%`);
}
function evolveResources(epochs) {
    for (let i = 0; i < epochs; i++) {
        Resources.yeast = YeastLogic_1.stepYeast(Resources.yeast);
    }
}
function gameLoop(event) {
    const epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
    const resourceEpochs = Math.floor(epochDelta / epochInMS);
    evolveResources(resourceEpochs);
    if (resourceEpochs > 0) {
        lastEpochMS += resourceEpochs * epochInMS;
    }
    const [newYeast, newSpill] = YeastLogic_1.clampYeast(jarVolume, Resources.yeast);
    Resources.yeast = newYeast;
    spillage += newSpill;
    render();
}
createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj) {
    gameLoop(eventObj);
});
function addFood() {
    console.log('Adding food');
    console.log(Resources.yeast);
    Resources.yeast = YeastLogic_1.feedYeast(1, Resources.yeast);
    console.log(Resources.yeast);
    const [newYeast, newSpill] = YeastLogic_1.clampYeast(jarVolume, Resources.yeast);
    Resources.yeast = newYeast;
    console.log(newYeast);
    spillage += newSpill;
    console.log(Resources.yeast);
}
window.onload = () => {
    // Add button click listeners
    let addFoodButton = document.getElementById('add-food');
    addFoodButton.onclick = () => {
        console.log('trying to add food');
        addFood();
    };
    /* all actions below (currently 5 - bake / another-jar / trade / ga / ta)
  need to decrease the volume by 50%
  */
    let bakeButton = document.getElementById("bake");
    bakeButton.onclick = () => {
        const yeastLost = half(YeastLogic_1.yeastAmount(Resources.yeast));
        let result = YeastLogic_1.removeYeast(Resources.yeast, yeastLost);
        if (!result)
            return;
        Resources.yeast = result.remaining;
        Resources.bread += yeastLost;
    };
    let anotherJarButton = document.getElementById("another-jar");
    anotherJarButton.onclick = () => {
        // Space left in jar increases by 1024 (jar capacity)
        // % Health increases
    };
    let tradeButton = document.getElementById("trade");
    tradeButton.onclick = () => {
        // You gain a “something” (we don’t know the value yet)
    };
    let giveawayButton = document.getElementById("giveaway");
    giveawayButton.onclick = () => {
        // You gain some amount of “good” -- hidden counter to be revealed later
        const yeastLost = half(YeastLogic_1.yeastAmount(Resources.yeast));
        let result = YeastLogic_1.removeYeast(Resources.yeast, yeastLost);
        if (!result)
            return;
        Resources.yeast = result.remaining;
        Resources.good += yeastLost;
        console.log(Resources.good);
    };
    let throwawayButton = document.getElementById("throwaway");
    throwawayButton.onclick = () => {
        const yeastLost = half(YeastLogic_1.yeastAmount(Resources.yeast));
        let result = YeastLogic_1.removeYeast(Resources.yeast, yeastLost);
        if (!result)
            return;
        Resources.yeast = result.remaining;
    };
};
function half(amount) {
    return Math.floor(amount / 2);
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1llYXN0TG9naWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekVBLE1BQU0sU0FBUyxHQUtYO0lBQ0EsY0FBYyxFQUFFO1FBQ1osR0FBRyxFQUFFLEdBQUc7UUFDUixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxJQUFJO1FBQ2IsTUFBTSxFQUFFLElBQUk7UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxHQUFHO0tBQ1o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLEdBQUcsRUFBRSxHQUFHO1FBQ1IsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsR0FBRztRQUNaLE1BQU0sRUFBRSxJQUFJO1FBQ1osUUFBUSxF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QUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTTtRQUNuQixTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkMsU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLElBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsZUFBZ0IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQzVCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyx3QkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksTUFBTSxHQUFHLHdCQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU07UUFDbkIsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLElBQUksQ0FBQyxNQUFjO0lBQ3hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLENBQUMiLCJmaWxlIjoiYnVpbGQvYnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZ2FtZS50c1wiKTtcbiIsImV4cG9ydCBpbnRlcmZhY2UgWWVhc3R5R29vZG5lc3Mge1xuICAgIGZlZDogbnVtYmVyO1xuICAgIGhhcHB5OiBudW1iZXI7XG4gICAgd2FpdGluZzogbnVtYmVyO1xuICAgIGh1bmdyeTogbnVtYmVyO1xuICAgIHN0YXJ2aW5nOiBudW1iZXI7XG4gICAgZGVhZDogbnVtYmVyO1xufVxuXG5jb25zdCBjb25zdGFudHM6IHtcbiAgICBtYXR1cmF0aW9uUmF0ZTogWWVhc3R5R29vZG5lc3M7XG4gICAgaGVhbHRoTXVsdGlwbGllcjogWWVhc3R5R29vZG5lc3M7XG4gICAgaHVuZ2VyTXVsdGlwbGllcjogWWVhc3R5R29vZG5lc3M7XG4gICAgdm9sdW1lTXVsdGlwbGllcjogWWVhc3R5R29vZG5lc3M7XG59ID0ge1xuICAgIG1hdHVyYXRpb25SYXRlOiB7XG4gICAgICAgIGZlZDogMC4xLFxuICAgICAgICBoYXBweTogMC4xLFxuICAgICAgICB3YWl0aW5nOiAwLjA1LFxuICAgICAgICBodW5ncnk6IDAuMDUsXG4gICAgICAgIHN0YXJ2aW5nOiAwLjA1LFxuICAgICAgICBkZWFkOiAwLjAsXG4gICAgfSxcbiAgICBoZWFsdGhNdWx0aXBsaWVyOiB7XG4gICAgICAgIGZlZDogMS4wLFxuICAgICAgICBoYXBweTogMS4wLFxuICAgICAgICB3YWl0aW5nOiAxLjAsXG4gICAgICAgIGh1bmdyeTogMC43NSxcbiAgICAgICAgc3RhcnZpbmc6IDAuMjUsXG4gICAgICAgIGRlYWQ6IDAuMCxcbiAgICB9LFxuICAgIGh1bmdlck11bHRpcGxpZXI6IHtcbiAgICAgICAgZmVkOiAwLjAsXG4gICAgICAgIGhhcHB5OiAwLjEsXG4gICAgICAgIHdhaXRpbmc6IDAuNSxcbiAgICAgICAgaHVuZ3J5OiAwLjksXG4gICAgICAgIHN0YXJ2aW5nOiAxLjAsXG4gICAgICAgIGRlYWQ6IDAuMCxcbiAgICB9LFxuICAgIHZvbHVtZU11bHRpcGxpZXI6IHtcbiAgICAgICAgZmVkOiAxLjAsXG4gICAgICAgIGhhcHB5OiAxLjc1LFxuICAgICAgICB3YWl0aW5nOiAyLjUsXG4gICAgICAgIGh1bmdyeTogMS43NSxcbiAgICAgICAgc3RhcnZpbmc6IDEuMjUsXG4gICAgICAgIGRlYWQ6IDEuMCxcbiAgICB9LFxufTtcblxudHlwZSBDb25zdGFudFllYXN0ID0ge1xuICAgIHJlYWRvbmx5IGZlZDogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGhhcHB5OiBudW1iZXIsXG4gICAgcmVhZG9ubHkgd2FpdGluZzogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGh1bmdyeTogbnVtYmVyLFxuICAgIHJlYWRvbmx5IHN0YXJ2aW5nOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgZGVhZDogbnVtYmVyLFxufVxuXG5jb25zdCBlbXB0eVllYXN0OiBDb25zdGFudFllYXN0ID0ge1xuICAgIGZlZDogMCxcbiAgICBoYXBweTogMCxcbiAgICB3YWl0aW5nOiAwLFxuICAgIGh1bmdyeTogMCxcbiAgICBzdGFydmluZzogMCxcbiAgICBkZWFkOiAwLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RhbnRZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBDb25zdGFudFllYXN0IHtcbiAgICByZXR1cm4geWVhc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MsIG5ld1llYXN0OiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmZWQ6IHllYXN0LmZlZCArIG5ld1llYXN0LmZlZCxcbiAgICAgICAgaGFwcHk6IHllYXN0LmhhcHB5ICsgbmV3WWVhc3QuaGFwcHksXG4gICAgICAgIHdhaXRpbmc6IHllYXN0LndhaXRpbmcgKyBuZXdZZWFzdC53YWl0aW5nLFxuICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSArIG5ld1llYXN0Lmh1bmdyeSxcbiAgICAgICAgc3RhcnZpbmc6IHllYXN0LnN0YXJ2aW5nICsgbmV3WWVhc3Quc3RhcnZpbmcsXG4gICAgICAgIGRlYWQ6IHllYXN0LmRlYWQgKyBuZXdZZWFzdC5kZWFkLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MsIGY6IChwcm9wOiBudW1iZXIpID0+IG51bWJlcik6IFllYXN0eUdvb2RuZXNzIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmZWQ6IGYoeWVhc3QuZmVkKSxcbiAgICAgICAgaGFwcHk6IGYoeWVhc3QuaGFwcHkpLFxuICAgICAgICB3YWl0aW5nOiBmKHllYXN0LndhaXRpbmcpLFxuICAgICAgICBodW5ncnk6IGYoeWVhc3QuaHVuZ3J5KSxcbiAgICAgICAgc3RhcnZpbmc6IGYoeWVhc3QuZmVkKSxcbiAgICAgICAgZGVhZDogZih5ZWFzdC5kZWFkKSxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5WWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB5ZWFzdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdExlc3NUaGFuRXF1YWwoeWVhc3Q6IFllYXN0eUdvb2RuZXNzLCB5ZWFzdDI6IFllYXN0eUdvb2RuZXNzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHllYXN0LmZlZCA8PSB5ZWFzdDIuZmVkICYmIHllYXN0LmhhcHB5IDw9IHllYXN0Mi5oYXBweSAmJiB5ZWFzdC53YWl0aW5nIDw9IHllYXN0Mi53YWl0aW5nICYmIHllYXN0Lmh1bmdyeSA8PSB5ZWFzdDIuaHVuZ3J5ICYmIHllYXN0LnN0YXJ2aW5nIDw9IHllYXN0Mi5zdGFydmluZyAmJiB5ZWFzdC5kZWFkIDw9IHllYXN0Mi5kZWFkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhc3RMZXNzVGhhbih5ZWFzdDogWWVhc3R5R29vZG5lc3MsIHllYXN0MjogWWVhc3R5R29vZG5lc3MpOiBib29sZWFuIHtcbiAgICByZXR1cm4geWVhc3QuZmVkIDwgeWVhc3QyLmZlZCAmJiB5ZWFzdC5oYXBweSA8PSB5ZWFzdDIuaGFwcHkgJiYgeWVhc3Qud2FpdGluZyA8PSB5ZWFzdDIud2FpdGluZyAmJiB5ZWFzdC5odW5ncnkgPD0geWVhc3QyLmh1bmdyeSAmJiB5ZWFzdC5zdGFydmluZyA8PSB5ZWFzdDIuc3RhcnZpbmcgJiYgeWVhc3QuZGVhZCA8PSB5ZWFzdDIuZGVhZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0WWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzLCB5ZWFzdDI6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIGNvbnN0IHJlc3VsdFllYXN0ID0ge1xuICAgICAgICBmZWQ6IHllYXN0LmZlZCAtIHllYXN0Mi5mZWQsXG4gICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSAtIHllYXN0Mi5oYXBweSxcbiAgICAgICAgd2FpdGluZzogeWVhc3Qud2FpdGluZyAtIHllYXN0Mi53YWl0aW5nLFxuICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSAtIHllYXN0Mi5odW5ncnksXG4gICAgICAgIHN0YXJ2aW5nOiB5ZWFzdC5zdGFydmluZyAtIHllYXN0Mi5zdGFydmluZyxcbiAgICAgICAgZGVhZDogeWVhc3QuZGVhZCAtIHllYXN0Mi5kZWFkLFxuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdFllYXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVuZ2VyKHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IG51bWJlciB7XG4gICAgY29uc3QgYWxpdmUgPSB5ZWFzdC5mZWQgKyB5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZztcbiAgICBjb25zdCBodW5nZXJBYnNvbHV0ZSA9XG4gICAgICAgIHllYXN0LmZlZCAqIGNvbnN0YW50cy5odW5nZXJNdWx0aXBsaWVyLmZlZCArXG4gICAgICAgIHllYXN0LmhhcHB5ICogY29uc3RhbnRzLmh1bmdlck11bHRpcGxpZXIuaGFwcHkgK1xuICAgICAgICB5ZWFzdC53YWl0aW5nICogY29uc3RhbnRzLmh1bmdlck11bHRpcGxpZXIud2FpdGluZyArXG4gICAgICAgIHllYXN0Lmh1bmdyeSAqIGNvbnN0YW50cy5odW5nZXJNdWx0aXBsaWVyLmh1bmdyeSArXG4gICAgICAgIHllYXN0LnN0YXJ2aW5nICogY29uc3RhbnRzLmh1bmdlck11bHRpcGxpZXIuc3RhcnZpbmc7XG4gICAgcmV0dXJuIGh1bmdlckFic29sdXRlIC8gYWxpdmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZWFsdGgoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogbnVtYmVyIHtcbiAgICBjb25zdCB0b3RhbCA9IHllYXN0LmZlZCArIHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nICsgeWVhc3QuZGVhZDtcbiAgICBjb25zdCBodW5nZXJBYnNvbHV0ZSA9XG4gICAgICAgIHllYXN0LmZlZCAqIGNvbnN0YW50cy5oZWFsdGhNdWx0aXBsaWVyLmZlZCArXG4gICAgICAgIHllYXN0LmhhcHB5ICogY29uc3RhbnRzLmhlYWx0aE11bHRpcGxpZXIuaGFwcHkgK1xuICAgICAgICB5ZWFzdC53YWl0aW5nICogY29uc3RhbnRzLmhlYWx0aE11bHRpcGxpZXIud2FpdGluZyArXG4gICAgICAgIHllYXN0Lmh1bmdyeSAqIGNvbnN0YW50cy5oZWFsdGhNdWx0aXBsaWVyLmh1bmdyeSArXG4gICAgICAgIHllYXN0LnN0YXJ2aW5nICogY29uc3RhbnRzLmhlYWx0aE11bHRpcGxpZXIuc3RhcnZpbmc7XG4gICAgcmV0dXJuIGh1bmdlckFic29sdXRlIC8gdG90YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGVwWWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIGNvbnN0IGdvdEhhcHB5ID0geWVhc3QuZmVkICogY29uc3RhbnRzLm1hdHVyYXRpb25SYXRlLmZlZDtcbiAgICBjb25zdCBnb3RXYWl0aW5nID0geWVhc3QuaGFwcHkgKiBjb25zdGFudHMubWF0dXJhdGlvblJhdGUuaGFwcHk7XG4gICAgY29uc3QgZ290SHVuZ3J5ID0geWVhc3Qud2FpdGluZyAqIGNvbnN0YW50cy5tYXR1cmF0aW9uUmF0ZS53YWl0aW5nO1xuICAgIGNvbnN0IGdvdFN0YXJ2aW5nID0geWVhc3QuaHVuZ3J5ICogY29uc3RhbnRzLm1hdHVyYXRpb25SYXRlLmh1bmdyeTtcbiAgICBjb25zdCBnb3REZWFkID0geWVhc3Quc3RhcnZpbmcgKiBjb25zdGFudHMubWF0dXJhdGlvblJhdGUuc3RhcnZpbmc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmZWQ6IHllYXN0LmZlZCAtIGdvdEhhcHB5LFxuICAgICAgICBoYXBweTogZ290SGFwcHkgKyB5ZWFzdC5oYXBweSAtIGdvdFdhaXRpbmcsXG4gICAgICAgIHdhaXRpbmc6IGdvdFdhaXRpbmcgKyB5ZWFzdC53YWl0aW5nIC0gZ290SHVuZ3J5LFxuICAgICAgICBodW5ncnk6IGdvdEh1bmdyeSArIHllYXN0Lmh1bmdyeSAtIGdvdFN0YXJ2aW5nLFxuICAgICAgICBzdGFydmluZzogZ290U3RhcnZpbmcgKyB5ZWFzdC5zdGFydmluZyAtIGdvdERlYWQsXG4gICAgICAgIGRlYWQ6IGdvdERlYWQgKyB5ZWFzdC5kZWFkLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWVkWWVhc3QoYW1vdW50OiBudW1iZXIsIHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICBjb25zdCBmZWVkTWVTZXltb3IgPSB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmc7XG4gICAgaWYgKGZlZWRNZVNleW1vciA+PSBhbW91bnQpIHtcbiAgICAgICAgLy8gTm90IGVub3VnaCBmb29kIHRvIGZlZWQgYWxsIHRoZSByZWFsbHkgaHVuZ3J5IHllYXN0XG4gICAgICAgIGNvbnNvbGUubG9nKCdBJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmZWQ6IHllYXN0LmZlZCArIGFtb3VudCArIGFtb3VudCxcbiAgICAgICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSxcbiAgICAgICAgICAgIHdhaXRpbmc6IHllYXN0LndhaXRpbmcgLSAoeWVhc3Qud2FpdGluZyAvIGZlZWRNZVNleW1vcikgKiBhbW91bnQsXG4gICAgICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSAtICh5ZWFzdC5odW5ncnkgLyBmZWVkTWVTZXltb3IpICogYW1vdW50LFxuICAgICAgICAgICAgc3RhcnZpbmc6IHllYXN0LnN0YXJ2aW5nIC0gKHllYXN0LnN0YXJ2aW5nIC8gZmVlZE1lU2V5bW9yKSAqIGFtb3VudCxcbiAgICAgICAgICAgIGRlYWQ6IHllYXN0LmRlYWQsXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChmZWVkTWVTZXltb3IgKyB5ZWFzdC5oYXBweSA+PSBhbW91bnQpIHtcbiAgICAgICAgLy8gRmVlZGluZyBhbGwgdGhlIHJlYWxseSBodW5ncnkgeWVhc3QsIHBsdXMgc29tZSB0aGUgeWVhc3QgdGhhdCBjb3VsZCBoYXZlIGEgYml0ZVxuICAgICAgICBjb25zb2xlLmxvZygnQicpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmVkOiB5ZWFzdC5mZWQgKyBhbW91bnQgKyBhbW91bnQsXG4gICAgICAgICAgICBoYXBweTogeWVhc3QuaGFwcHkgLSAoYW1vdW50IC0gZmVlZE1lU2V5bW9yKSxcbiAgICAgICAgICAgIHdhaXRpbmc6IDAsXG4gICAgICAgICAgICBodW5ncnk6IDAsXG4gICAgICAgICAgICBzdGFydmluZzogMCxcbiAgICAgICAgICAgIGRlYWQ6IHllYXN0LmRlYWQsXG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU29tZSBmZWVkIGdvZXMgdG8gd2FzdGUgYXMgZGVhZCBtYXRlcmlhbFxuICAgICAgICBjb25zb2xlLmxvZygnQycpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmVkOiB5ZWFzdC5mZWQgKyAoeWVhc3QuaGFwcHkgKyB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmcpICogMixcbiAgICAgICAgICAgIGhhcHB5OiAwLFxuICAgICAgICAgICAgd2FpdGluZzogMCxcbiAgICAgICAgICAgIGh1bmdyeTogMCxcbiAgICAgICAgICAgIHN0YXJ2aW5nOiAwLFxuICAgICAgICAgICAgZGVhZDogeWVhc3QuZGVhZCArIGFtb3VudCAtICh5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZyksXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlRnJhY3Rpb25zKHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICBjb25zdCB0b3RhbCA9IHllYXN0LmZlZCArIHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nICsgeWVhc3QuZGVhZDtcbiAgICByZXR1cm4ge1xuICAgICAgICBmZWQ6IHllYXN0LmZlZCAvIHRvdGFsLFxuICAgICAgICBoYXBweTogeWVhc3QuaGFwcHkgLyB0b3RhbCxcbiAgICAgICAgd2FpdGluZzogeWVhc3Qud2FpdGluZyAvIHRvdGFsLFxuICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSAvIHRvdGFsLFxuICAgICAgICBzdGFydmluZzogeWVhc3Quc3RhcnZpbmcgLyB0b3RhbCxcbiAgICAgICAgZGVhZDogeWVhc3QuZGVhZCAvIHRvdGFsLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdFZvbHVtZSh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICAgIHllYXN0LmZlZCAqIGNvbnN0YW50cy52b2x1bWVNdWx0aXBsaWVyLmZlZCArXG4gICAgICAgIHllYXN0LmhhcHB5ICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIuaGFwcHkgK1xuICAgICAgICB5ZWFzdC53YWl0aW5nICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIud2FpdGluZyArXG4gICAgICAgIHllYXN0Lmh1bmdyeSAqIGNvbnN0YW50cy52b2x1bWVNdWx0aXBsaWVyLmh1bmdyeSArXG4gICAgICAgIHllYXN0LnN0YXJ2aW5nICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIuc3RhcnZpbmcgK1xuICAgICAgICB5ZWFzdC5kZWFkICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIuZGVhZFxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcFllYXN0KG1heFZvbHVtZTogbnVtYmVyLCB5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBbWWVhc3R5R29vZG5lc3MsIG51bWJlcl0ge1xuICAgIGNvbnN0IHZvbHVtZSA9IHllYXN0Vm9sdW1lKHllYXN0KTtcbiAgICBpZiAodm9sdW1lIDw9IG1heFZvbHVtZSkgcmV0dXJuIFt5ZWFzdCwgMF07XG4gICAgY29uc3QgbG9zcyA9ICh2b2x1bWUgLSBtYXhWb2x1bWUpIC8gdm9sdW1lO1xuICAgIHJldHVybiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZlZDogeWVhc3QuZmVkICogKDEgLSBsb3NzKSxcbiAgICAgICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSAqICgxIC0gbG9zcyksXG4gICAgICAgICAgICB3YWl0aW5nOiB5ZWFzdC53YWl0aW5nICogKDEgLSBsb3NzKSxcbiAgICAgICAgICAgIGh1bmdyeTogeWVhc3QuaHVuZ3J5ICogKDEgLSBsb3NzKSxcbiAgICAgICAgICAgIHN0YXJ2aW5nOiB5ZWFzdC5zdGFydmluZyAqICgxIC0gbG9zcyksXG4gICAgICAgICAgICBkZWFkOiB5ZWFzdC5kZWFkICogKDEgLSBsb3NzKSxcbiAgICAgICAgfSxcbiAgICAgICAgdm9sdW1lIC0gbWF4Vm9sdW1lLFxuICAgIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdEFtb3VudCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBudW1iZXIge1xuICAgIHJldHVybiB5ZWFzdC5mZWQgKyB5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZyArIHllYXN0LmRlYWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXZpbmdZZWFzdEFtb3VudCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBudW1iZXIge1xuICAgIHJldHVybiB5ZWFzdC5mZWQgKyB5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVllYXN0KHllYXN0OiBZZWFzdHlHb29kbmVzcywgYW1vdW50OiBudW1iZXIpOiB7IHJlbWFpbmluZzogWWVhc3R5R29vZG5lc3MsIHJlbW92ZWQ6IFllYXN0eUdvb2RuZXNzIH0gfCBudWxsIHtcbiAgICBjb25zdCB0YWtlb3V0ID0gTWF0aC5mbG9vcihhbW91bnQpO1xuICAgIGNvbnN0IGN1cnJlbnRBbW91bnQgPSB5ZWFzdEFtb3VudCh5ZWFzdCk7XG4gICAgaWYgKHRha2VvdXQgPCAxKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICh0YWtlb3V0ID4gY3VycmVudEFtb3VudCAtIDEpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgdGFrZW91dEZyYWN0aW9uID0gdGFrZW91dCAvIHllYXN0QW1vdW50KHllYXN0KTtcbiAgICBsZXQgcmVtb3ZlZCA9IG1hcFllYXN0KHllYXN0LCAocHJvcCkgPT4gTWF0aC5taW4ocHJvcCAqIHRha2VvdXRGcmFjdGlvbiwgcHJvcCkpO1xuICAgIGxldCByZW1haW5pbmcgPSBzdWJ0cmFjdFllYXN0KHllYXN0LCByZW1vdmVkKTtcbiAgICAvLyBKdXN0IGluIGNhc2Ugc29tZXRoaW5nIHdlbnQgbmVnYXRpdmUhXG4gICAgcmVtYWluaW5nID0gbWFwWWVhc3QocmVtYWluaW5nLCAocHJvcCkgPT4gTWF0aC5tYXgoMCwgcHJvcCkpO1xuICAgIGNvbnN0IHJlbW92ZWRBbW91bnQgPSB5ZWFzdEFtb3VudCh5ZWFzdCk7XG4gICAgaWYgKHJlbW92ZWRBbW91bnQgPCB0YWtlb3V0KSB7XG4gICAgICAgIHJlbW92ZWQuZGVhZCA9IHJlbW92ZWRBbW91bnQgLSB0YWtlb3V0O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1haW5pbmc6IHJlbWFpbmluZywgcmVtb3ZlZDogcmVtb3ZlZCB9O1xufSIsImltcG9ydCB7XG4gICAgeWVhc3RWb2x1bWUsXG4gICAgeWVhc3RBbW91bnQsXG4gICAgcmVtb3ZlWWVhc3QsXG4gICAgaHVuZ2VyLFxuICAgIGhlYWx0aCxcbiAgICBzdGVwWWVhc3QsXG4gICAgY2xhbXBZZWFzdCxcbiAgICBmZWVkWWVhc3QsXG4gICAgWWVhc3R5R29vZG5lc3MsXG4gICAgY2FsY3VsYXRlRnJhY3Rpb25zLFxufSBmcm9tICcuL1llYXN0TG9naWMnO1xuXG5sZXQgbGFzdEVwb2NoTVM6IG51bWJlciA9IDA7XG5sZXQgZXBvY2hJbk1TOiBudW1iZXIgPSAxMDAwO1xubGV0IGphclZvbHVtZTogbnVtYmVyID0gMzI7XG5sZXQgZmlsbGVkVm9sdW1lOiBudW1iZXIgPSAwO1xubGV0IHNwaWxsYWdlOiBudW1iZXIgPSAwO1xuXG50eXBlIFJlc291cmNlc1R5cGUgPSB7XG4gICAgeWVhc3Q6IFllYXN0eUdvb2RuZXNzLFxuICAgIGdvb2Q6IG51bWJlcixcbiAgICBicmVhZDogbnVtYmVyLFxufVxuXG5sZXQgUmVzb3VyY2VzOiBSZXNvdXJjZXNUeXBlID0ge1xuICAgIHllYXN0OiB7IGZlZDogMSwgaGFwcHk6IDAsIHdhaXRpbmc6IDAsIGh1bmdyeTogMCwgc3RhcnZpbmc6IDAsIGRlYWQ6IDIgfSxcbiAgICBnb29kOiAwLFxuICAgIGJyZWFkOiAwLFxufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50KGlkOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZWxlbSkgcmV0dXJuO1xuICAgIGVsZW0uaW5uZXJUZXh0ID0gY29udGVudHM7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAvLyBSZW5kZXIgdGhlIGphclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqYXItY2FwYWNpdHknKSEuaW5uZXJUZXh0ID0gJycgKyBqYXJWb2x1bWU7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZWQnKSEuaW5uZXJUZXh0ID0gJycgKyBmaWxsZWRWb2x1bWU7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaWxsYWdlJykhLmlubmVyVGV4dCA9ICcnICsgc3BpbGxhZ2U7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZWQnKSEuaW5uZXJUZXh0ID0gYCR7eWVhc3RWb2x1bWUoUmVzb3VyY2VzLnllYXN0KX1gO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW5nZXInKSEuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChodW5nZXIoUmVzb3VyY2VzLnllYXN0KSAqIDEwMCl9JWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWx0aCcpIS5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKGhlYWx0aChSZXNvdXJjZXMueWVhc3QpICogMTAwKX0lYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Rhc2gtYnJlYWQnKSEuaW5uZXJUZXh0ID0gYCR7UmVzb3VyY2VzLmJyZWFkfWA7XG5cbiAgICBjb25zdCBmcmFjdGlvbnM6IFllYXN0eUdvb2RuZXNzID0gY2FsY3VsYXRlRnJhY3Rpb25zKFJlc291cmNlcy55ZWFzdCk7XG4gICAgc2V0RWxlbWVudChcbiAgICAgICAgJ2RlYnVnX3F1YW50aXR5JyxcbiAgICAgICAgYCR7XG4gICAgICAgIFJlc291cmNlcy55ZWFzdC5mZWQgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QuaGFwcHkgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3Qud2FpdGluZyArXG4gICAgICAgIFJlc291cmNlcy55ZWFzdC5odW5ncnkgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3Quc3RhcnZpbmcgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QuZGVhZFxuICAgICAgICB9YFxuICAgICk7XG4gICAgc2V0RWxlbWVudCgnZGVidWdfZmVkJywgYCR7TWF0aC5yb3VuZChmcmFjdGlvbnMuZmVkICogMTAwKX0lYCk7XG4gICAgc2V0RWxlbWVudCgnZGVidWdfaGFwcHknLCBgJHtNYXRoLnJvdW5kKGZyYWN0aW9ucy5oYXBweSAqIDEwMCl9JWApO1xuICAgIHNldEVsZW1lbnQoJ2RlYnVnX3dhaXRpbmcnLCBgJHtNYXRoLnJvdW5kKGZyYWN0aW9ucy53YWl0aW5nICogMTAwKX0lYCk7XG4gICAgc2V0RWxlbWVudCgnZGVidWdfaHVuZ3J5JywgYCR7TWF0aC5yb3VuZChmcmFjdGlvbnMuaHVuZ3J5ICogMTAwKX0lYCk7XG4gICAgc2V0RWxlbWVudCgnZGVidWdfc3RhcnZpbmcnLCBgJHtNYXRoLnJvdW5kKGZyYWN0aW9ucy5zdGFydmluZyAqIDEwMCl9JWApO1xuICAgIHNldEVsZW1lbnQoJ2RlYnVnX2RlYWQnLCBgJHtNYXRoLnJvdW5kKGZyYWN0aW9ucy5kZWFkICogMTAwKX0lYCk7XG59XG5cbmZ1bmN0aW9uIGV2b2x2ZVJlc291cmNlcyhlcG9jaHM6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXBvY2hzOyBpKyspIHtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0ID0gc3RlcFllYXN0KFJlc291cmNlcy55ZWFzdCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnYW1lTG9vcChldmVudDogY3JlYXRlanMuVGlja2VyRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlcG9jaERlbHRhID0gY3JlYXRlanMuVGlja2VyLmdldFRpbWUodHJ1ZSkgLSBsYXN0RXBvY2hNUztcbiAgICBjb25zdCByZXNvdXJjZUVwb2NocyA9IE1hdGguZmxvb3IoZXBvY2hEZWx0YSAvIGVwb2NoSW5NUyk7XG4gICAgZXZvbHZlUmVzb3VyY2VzKHJlc291cmNlRXBvY2hzKTtcbiAgICBpZiAocmVzb3VyY2VFcG9jaHMgPiAwKSB7XG4gICAgICAgIGxhc3RFcG9jaE1TICs9IHJlc291cmNlRXBvY2hzICogZXBvY2hJbk1TO1xuICAgIH1cblxuICAgIGNvbnN0IFtuZXdZZWFzdCwgbmV3U3BpbGxdID0gY2xhbXBZZWFzdChqYXJWb2x1bWUsIFJlc291cmNlcy55ZWFzdCk7XG4gICAgUmVzb3VyY2VzLnllYXN0ID0gbmV3WWVhc3Q7XG4gICAgc3BpbGxhZ2UgKz0gbmV3U3BpbGw7XG5cbiAgICByZW5kZXIoKTtcbn1cblxuY3JlYXRlanMuVGlja2VyLmZyYW1lcmF0ZSA9IDMwLjA7XG5jcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIGZ1bmN0aW9uIChldmVudE9iajogT2JqZWN0KSB7XG4gICAgZ2FtZUxvb3AoPGNyZWF0ZWpzLlRpY2tlckV2ZW50PmV2ZW50T2JqKTtcbn0pO1xuXG5mdW5jdGlvbiBhZGRGb29kKCkge1xuICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgZm9vZCcpITtcbiAgICBjb25zb2xlLmxvZyhSZXNvdXJjZXMueWVhc3QpO1xuICAgIFJlc291cmNlcy55ZWFzdCA9IGZlZWRZZWFzdCgxLCBSZXNvdXJjZXMueWVhc3QpO1xuICAgIGNvbnNvbGUubG9nKFJlc291cmNlcy55ZWFzdCk7XG4gICAgY29uc3QgW25ld1llYXN0LCBuZXdTcGlsbF0gPSBjbGFtcFllYXN0KGphclZvbHVtZSwgUmVzb3VyY2VzLnllYXN0KTtcbiAgICBSZXNvdXJjZXMueWVhc3QgPSBuZXdZZWFzdDtcbiAgICBjb25zb2xlLmxvZyhuZXdZZWFzdCk7XG4gICAgc3BpbGxhZ2UgKz0gbmV3U3BpbGw7XG4gICAgY29uc29sZS5sb2coUmVzb3VyY2VzLnllYXN0KTtcbn1cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAvLyBBZGQgYnV0dG9uIGNsaWNrIGxpc3RlbmVyc1xuICAgIGxldCBhZGRGb29kQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1mb29kJyk7XG4gICAgYWRkRm9vZEJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RyeWluZyB0byBhZGQgZm9vZCcpO1xuICAgICAgICBhZGRGb29kKCk7XG4gICAgfTtcblxuICAgIC8qIGFsbCBhY3Rpb25zIGJlbG93IChjdXJyZW50bHkgNSAtIGJha2UgLyBhbm90aGVyLWphciAvIHRyYWRlIC8gZ2EgLyB0YSlcbiAgbmVlZCB0byBkZWNyZWFzZSB0aGUgdm9sdW1lIGJ5IDUwJVxuICAqL1xuICAgIGxldCBiYWtlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWtlXCIpO1xuICAgIGJha2VCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHllYXN0TG9zdCA9IGhhbGYoeWVhc3RBbW91bnQoUmVzb3VyY2VzLnllYXN0KSk7XG4gICAgICAgIGxldCByZXN1bHQgPSByZW1vdmVZZWFzdChSZXNvdXJjZXMueWVhc3QsIHllYXN0TG9zdCk7XG4gICAgICAgIGlmICghcmVzdWx0KSByZXR1cm5cbiAgICAgICAgUmVzb3VyY2VzLnllYXN0ID0gcmVzdWx0LnJlbWFpbmluZztcbiAgICAgICAgUmVzb3VyY2VzLmJyZWFkICs9IHllYXN0TG9zdDtcbiAgICB9O1xuXG4gICAgbGV0IGFub3RoZXJKYXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFub3RoZXItamFyXCIpO1xuICAgIGFub3RoZXJKYXJCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIC8vIFNwYWNlIGxlZnQgaW4gamFyIGluY3JlYXNlcyBieSAxMDI0IChqYXIgY2FwYWNpdHkpXG4gICAgICAgIC8vICUgSGVhbHRoIGluY3JlYXNlc1xuICAgIH07XG5cbiAgICBsZXQgdHJhZGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYWRlXCIpO1xuICAgIHRyYWRlQnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAvLyBZb3UgZ2FpbiBhIOKAnHNvbWV0aGluZ+KAnSAod2UgZG9u4oCZdCBrbm93IHRoZSB2YWx1ZSB5ZXQpXG4gICAgfTtcblxuICAgIGxldCBnaXZlYXdheUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2l2ZWF3YXlcIik7XG4gICAgZ2l2ZWF3YXlCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIC8vIFlvdSBnYWluIHNvbWUgYW1vdW50IG9mIOKAnGdvb2TigJ0gLS0gaGlkZGVuIGNvdW50ZXIgdG8gYmUgcmV2ZWFsZWQgbGF0ZXJcbiAgICAgICAgY29uc3QgeWVhc3RMb3N0ID0gaGFsZih5ZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHJlbW92ZVllYXN0KFJlc291cmNlcy55ZWFzdCwgeWVhc3RMb3N0KTtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVyblxuICAgICAgICBSZXNvdXJjZXMueWVhc3QgPSByZXN1bHQucmVtYWluaW5nO1xuICAgICAgICBSZXNvdXJjZXMuZ29vZCArPSB5ZWFzdExvc3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKFJlc291cmNlcy5nb29kKVxuICAgIH07XG5cbiAgICBsZXQgdGhyb3dhd2F5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aHJvd2F3YXlcIik7XG4gICAgdGhyb3dhd2F5QnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB5ZWFzdExvc3QgPSBoYWxmKHllYXN0QW1vdW50KFJlc291cmNlcy55ZWFzdCkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gcmVtb3ZlWWVhc3QoUmVzb3VyY2VzLnllYXN0LCB5ZWFzdExvc3QpO1xuICAgICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuXG4gICAgICAgIFJlc291cmNlcy55ZWFzdCA9IHJlc3VsdC5yZW1haW5pbmc7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaGFsZihhbW91bnQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoYW1vdW50IC8gMilcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=