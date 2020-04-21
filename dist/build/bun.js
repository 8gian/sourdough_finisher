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

/***/ "./node_modules/linked-list-typescript/lib/src/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/linked-list-typescript/lib/src/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LinkedList {
    constructor(...values) {
        this._head = this._tail = null;
        this._length = 0;
        if (values.length > 0) {
            values.forEach((value) => {
                this.append(value);
            });
        }
    }
    *iterator() {
        let currentItem = this._head;
        while (currentItem) {
            yield currentItem.value;
            currentItem = currentItem.next;
        }
    }
    [Symbol.iterator]() {
        return this.iterator();
    }
    get head() {
        return this._head ? this._head.value : null;
    }
    get tail() {
        return this._tail ? this._tail.value : null;
    }
    get length() {
        return this._length;
    }
    // Adds the element at a specific position inside the linked list
    insert(val, previousItem, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        let currentItem = this._head;
        if (!currentItem) {
            return false;
        }
        else {
            while (true) {
                if (currentItem.value === previousItem) {
                    newItem.next = currentItem.next;
                    newItem.prev = currentItem;
                    currentItem.next = newItem;
                    if (newItem.next) {
                        newItem.next.prev = newItem;
                    }
                    else {
                        this._tail = newItem;
                    }
                    this._length++;
                    return true;
                }
                else {
                    if (currentItem.next) {
                        currentItem = currentItem.next;
                    }
                    else {
                        // can't locate previousItem
                        return false;
                    }
                }
            }
        }
    }
    // Adds the element at the end of the linked list
    append(val, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        if (!this._tail) {
            this._head = this._tail = newItem;
        }
        else {
            this._tail.next = newItem;
            newItem.prev = this._tail;
            this._tail = newItem;
        }
        this._length++;
        return true;
    }
    // Add the element at the beginning of the linked list
    prepend(val, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        if (!this._head) {
            this._head = this._tail = newItem;
        }
        else {
            newItem.next = this._head;
            this._head.prev = newItem;
            this._head = newItem;
        }
        this._length++;
        return true;
    }
    remove(val) {
        let currentItem = this._head;
        if (!currentItem) {
            return;
        }
        if (currentItem.value === val) {
            this._head = currentItem.next;
            this._head.prev = null;
            currentItem.next = currentItem.prev = null;
            this._length--;
            return currentItem.value;
        }
        else {
            while (true) {
                if (currentItem.value === val) {
                    if (currentItem.next) { // special case for last element
                        currentItem.prev.next = currentItem.next;
                        currentItem.next.prev = currentItem.prev;
                        currentItem.next = currentItem.prev = null;
                    }
                    else {
                        currentItem.prev.next = null;
                        this._tail = currentItem.prev;
                        currentItem.next = currentItem.prev = null;
                    }
                    this._length--;
                    return currentItem.value;
                }
                else {
                    if (currentItem.next) {
                        currentItem = currentItem.next;
                    }
                    else {
                        return;
                    }
                }
            }
        }
    }
    removeHead() {
        let currentItem = this._head;
        // empty list
        if (!currentItem) {
            return;
        }
        // single item list
        if (!this._head.next) {
            this._head = null;
            this._tail = null;
            // full list
        }
        else {
            this._head.next.prev = null;
            this._head = this._head.next;
            currentItem.next = currentItem.prev = null;
        }
        this._length--;
        return currentItem.value;
    }
    removeTail() {
        let currentItem = this._tail;
        // empty list
        if (!currentItem) {
            return;
        }
        // single item list
        if (!this._tail.prev) {
            this._head = null;
            this._tail = null;
            // full list
        }
        else {
            this._tail.prev.next = null;
            this._tail = this._tail.prev;
            currentItem.next = currentItem.prev = null;
        }
        this._length--;
        return currentItem.value;
    }
    first(num) {
        let iter = this.iterator();
        let result = [];
        let n = Math.min(num, this.length);
        for (let i = 0; i < n; i++) {
            let val = iter.next();
            result.push(val.value);
        }
        return result;
    }
    toArray() {
        return [...this];
    }
    isDuplicate(val) {
        let set = new Set(this.toArray());
        return set.has(val);
    }
}
exports.LinkedList = LinkedList;
class LinkedListItem {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}
exports.LinkedListItem = LinkedListItem;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/queue-typescript/lib/src/index.js":
/*!********************************************************!*\
  !*** ./node_modules/queue-typescript/lib/src/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_typescript_1 = __webpack_require__(/*! linked-list-typescript */ "./node_modules/linked-list-typescript/lib/src/index.js");
class Queue extends linked_list_typescript_1.LinkedList {
    constructor(...values) {
        super(...values);
    }
    get front() {
        return this.head;
    }
    enqueue(val) {
        this.append(val);
    }
    dequeue() {
        return this.removeHead();
    }
}
exports.Queue = Queue;
//# sourceMappingURL=index.js.map

/***/ }),

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
        starving: f(yeast.starving),
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
function removeYeast(yeast, amount, jars) {
    const takeout = Math.floor(amount);
    const currentAmount = yeastAmount(yeast);
    if (takeout < 1) {
        return null;
    }
    if (takeout > currentAmount - jars) {
        return null;
    }
    const takeoutFraction = takeout / currentAmount;
    console.log(`taking out ${takeout}, fraction: ${takeoutFraction}`);
    let removed = mapYeast(yeast, (prop) => Math.min(prop * takeoutFraction, prop));
    let remaining = subtractYeast(yeast, removed);
    // Just in case something went negative!
    remaining = mapYeast(remaining, (prop) => Math.max(0, prop));
    const removedAmount = yeastAmount(removed);
    if (removedAmount < takeout) {
        removed.dead = removedAmount - takeout;
    }
    console.log(removed);
    return { remaining: remaining, removed: removed };
}
exports.removeYeast = removeYeast;


/***/ }),

/***/ "./src/events.ts":
/*!***********************!*\
  !*** ./src/events.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const queue_typescript_1 = __webpack_require__(/*! queue-typescript */ "./node_modules/queue-typescript/lib/src/index.js");
class EventQueue {
    constructor() {
        this.events = new queue_typescript_1.Queue();
        this.eventListeners = {};
    }
    addEvent(event) {
        this.events.enqueue(event);
    }
    addEventListener(event, f) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(f);
    }
    removeAllEventListeners(event) {
        if (this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
    }
    removeEventListener(event, f) {
        let listeners = this.eventListeners[event];
        if (listeners) {
            const index = listeners.indexOf(f, 0);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
    processEvent(event) {
        let listeners = this.eventListeners[event];
        if (listeners) {
            listeners.forEach((value) => { value(); });
        }
    }
    clearAll() {
        this.events = new queue_typescript_1.Queue();
    }
    processEvents() {
        while (this.events.length > 0) {
            this.processEvent(this.events.dequeue());
        }
    }
}
exports.EventQueue = EventQueue;


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
const events_1 = __webpack_require__(/*! ./events */ "./src/events.ts");
const inventory_1 = __webpack_require__(/*! ./inventory */ "./src/inventory.ts");
var E;
(function (E) {
    E[E["feed"] = 0] = "feed";
    E[E["bake"] = 1] = "bake";
    E[E["addJar"] = 2] = "addJar";
    E[E["giveaway"] = 3] = "giveaway";
    E[E["throwaway"] = 4] = "throwaway";
    E[E["enterCompetition"] = 5] = "enterCompetition";
    E[E["trade"] = 6] = "trade";
})(E || (E = {}));
const events = new events_1.EventQueue();
let lastEpochMS = 0;
let epochInMS = 1000;
let runStartInMS = 0;
const newJarVolume = 32;
// Initialize
let spillage = 0;
let ovenSize = 1;
let canBake = false;
let canGiveaway = false;
let canTrade = false;
let jarVolume = 32;
let gameStarted = false;
let filledVolume = 0;
let playerInventory = new inventory_1.Inventory();
let playerPrize = 0;
class IntegralRefillingResource {
    constructor(amount, increasePerRefresh, epochsPerRefresh, limit, onIncrease) {
        this.amount = 0;
        this.epochsPerRefresh = 0;
        this.remainingEpochs = 0;
        this.increasePerRefresh = 0;
        this.limit = 0;
        this.amount = amount;
        this.epochsPerRefresh = epochsPerRefresh;
        this.increasePerRefresh = increasePerRefresh;
        this.remainingEpochs = Math.max(Math.floor(epochsPerRefresh), 1);
        this.limit = limit;
        this.onIncrease = onIncrease;
    }
    step() {
        const epr = Math.max(Math.floor(this.epochsPerRefresh), 1);
        const ipr = Math.max(Math.floor(this.increasePerRefresh), 0);
        if (ipr < 1) {
            return;
        }
        this.remainingEpochs--;
        if (this.remainingEpochs < 1) {
            this.remainingEpochs = epr;
            this.amount += ipr;
            if (this.amount > this.limit) {
                this.amount = this.limit;
            }
            else if (this.onIncrease) {
                this.onIncrease();
            }
        }
    }
}
let dead = false;
function onFindJar() {
    let anotherJarButton = document.getElementById("another-jar");
    if (anotherJarButton) {
        anotherJarButton.style.display = "inline";
    }
    addMessage("You found another jar!");
}
function onNewFriend() {
    let tradeButton = document.getElementById("trade");
    if (tradeButton) {
        tradeButton.style.display = "inline";
    }
    addMessage("A friend asks if they can have some of your starter. They offer a present in return.");
}
function onNewComp() {
    let enterCompButton = document.getElementById("enter-competition");
    if (enterCompButton) {
        enterCompButton.style.display = "inline";
    }
    addMessage("You hear about a baking competition! You need 5 loaves to enter.");
}
function checkFirstBake() {
    if (canBake) {
        return;
    }
    if (YeastLogic_1.yeastAmount(Resources.yeast) >= Resources.jars + 4 && YeastLogic_1.health(Resources.yeast) >= .8) {
        onAllowBake();
    }
}
let Resources = {
    yeast: { fed: 2, happy: 0, waiting: 0, hungry: 0, starving: 0, dead: 1 },
    good: 0,
    bread: 0,
    jars: 1,
    newJars: new IntegralRefillingResource(0, 1, 120, 1),
    friendsToTrade: new IntegralRefillingResource(1, 1, 60, 1),
    competitions: new IntegralRefillingResource(0, 1, 245, 1),
};
let resetButtons = () => { };
let onAllowBake = () => { };
let onFirstJar = () => { };
let gotoStart = () => { };
let renderButtons = () => { };
function initializeGame() {
    if (!gameStarted) {
        gameStarted = true;
        createjs.Ticker.framerate = 30.0;
        createjs.Ticker.addEventListener('tick', function (eventObj) {
            gameLoop(eventObj);
        });
    }
    messages = [];
    jarVolume = 32;
    filledVolume = 0;
    ovenSize = 1;
    spillage = 0;
    dead = false;
    canBake = false;
    canGiveaway = false;
    playerPrize = 0;
    events.clearAll();
    Resources = {
        yeast: { fed: 2, happy: 0, waiting: 0, hungry: 0, starving: 0, dead: 1 },
        good: 0,
        bread: 0,
        jars: 1,
        newJars: new IntegralRefillingResource(0, 1, 120, 1, onFindJar),
        friendsToTrade: new IntegralRefillingResource(0, 1, 55, 1, onNewFriend),
        competitions: new IntegralRefillingResource(0, 1, 245, 1, onNewComp),
    };
    playerInventory = new inventory_1.Inventory();
    resetButtons();
    addMessage("Unfortunately, you are starting from scratch. Your friend has given you a starter, but you'll need to feed it. He says that he already fed it so you might want to wait a bit.");
    runStartInMS = createjs.Ticker.getTime(true);
}
let messages = [];
function addMessage(message) {
    messages.unshift(message);
    if (messages.length > 10) {
        messages.pop();
    }
}
function renderMessages(messages) {
    return '<p>' + messages.map((value, index, array) => `${value}`).join('\n<br>\n') + '</p>';
}
function setElement(id, contents) {
    const elem = document.getElementById(id);
    if (!elem)
        return;
    elem.innerText = contents;
}
function setElementHTML(id, contents) {
    const elem = document.getElementById(id);
    if (!elem)
        return;
    elem.innerHTML = contents;
}
function placedText() {
    if (playerPrize < 1) {
        return "You never placed in competition";
    }
    else if (playerPrize >= 1 && playerPrize < 2) {
        return "You reached third place in competition!";
    }
    else if (playerPrize >= 2 && playerPrize < 3) {
        return "You reached second place in competition!";
    }
    else {
        return "Wow, you reached first place in competition and achieved your goal of becoming a master baker!";
    }
}
function render() {
    // Render the jar
    document.getElementById('jar-capacity').innerText = '' + jarVolume;
    document.getElementById('jars-filled').innerText = '' + Resources.jars;
    document.getElementById('usable-starter-amount').innerText = '' + (Math.round(YeastLogic_1.yeastAmount(Resources.yeast)) - Resources.jars);
    document.getElementById('total-starter-amount').innerText = '' + Math.round(YeastLogic_1.yeastAmount(Resources.yeast));
    document.getElementById('used').innerText = `${Math.floor(YeastLogic_1.yeastVolume(Resources.yeast) / jarVolume * 100)}%`;
    document.getElementById('hunger').innerText = `${Math.round(YeastLogic_1.hunger(Resources.yeast) * 100)}%`;
    document.getElementById('health').innerText = `${Math.round(YeastLogic_1.health(Resources.yeast) * 100)}%`;
    document.getElementById('stash-bread').innerText = `${Resources.bread}`;
    document.getElementById('food-waste').innerText = `${Math.round(spillage)}`;
    setElementHTML('message-log', renderMessages(messages));
    setElement("place-reached", placedText());
    setElement("loaves-donated", "" + Resources.good);
    const fractions = YeastLogic_1.calculateFractions(Resources.yeast);
    setElement('debug_quantity', `${Resources.yeast.fed +
        Resources.yeast.happy +
        Resources.yeast.waiting +
        Resources.yeast.hungry +
        Resources.yeast.starving +
        Resources.yeast.dead}`);
    renderButtons();
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
        Resources.newJars.step();
        Resources.friendsToTrade.step();
        Resources.competitions.step();
    }
    checkFirstBake();
}
function gameLoop(event) {
    const epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
    const resourceEpochs = Math.floor(epochDelta / epochInMS);
    events.processEvents();
    if (!dead) {
        evolveResources(resourceEpochs);
    }
    if (resourceEpochs > 0) {
        lastEpochMS += resourceEpochs * epochInMS;
    }
    if (!dead) {
        if (YeastLogic_1.livingYeastAmount(Resources.yeast) < .5) {
            dead = true;
            addMessage("Your poor yeast is dead.");
            onLose();
        }
    }
    if (!dead) {
        const [newYeast, newSpill] = YeastLogic_1.clampYeast(jarVolume, Resources.yeast);
        Resources.yeast = newYeast;
        if (newSpill > 0) {
            addMessage("Oh no! Your starter overflowed, and yeast is all over the floor.");
        }
        spillage += newSpill;
    }
    render();
}
function addFood() {
    // console.log('Adding food')!;k
    // console.log(Resources.yeast);
    const oldHealth = YeastLogic_1.health(Resources.yeast);
    Resources.yeast = YeastLogic_1.feedYeast(1, Resources.yeast);
    //console.log(Resources.yeast);
    const [newYeast, newSpill] = YeastLogic_1.clampYeast(jarVolume, Resources.yeast);
    Resources.yeast = newYeast;
    spillage += newSpill;
    const newHealth = YeastLogic_1.health(Resources.yeast);
    if (newHealth > oldHealth) {
        addMessage('You fed your sourdough starter, and it looks better!');
    }
    else if (newHealth == oldHealth) {
        addMessage('You fed your sourdough starter');
    }
    else {
        addMessage('You fed your sourdough starter, but you think you might have overfed it...');
    }
}
let onLose = () => { };
window.onload = () => {
    let gameDiv = document.getElementById('game');
    gameDiv.style.display = "none";
    let inventoryDiv = document.getElementById("inventory");
    inventoryDiv.style.display = "none";
    // Add button click listeners
    let addFoodButton = document.getElementById('add-food');
    addFoodButton.onclick = () => {
        events.addEvent(E[E.feed]);
    };
    let onAddFood = () => {
        console.log('trying to add food');
        addFood();
    };
    events.addEventListener(E[E.feed], onAddFood);
    /* all actions below (currently 5 - bake / another-jar / trade / ga / ta)
  need to decrease the volume by 50%
  */
    function enoughToBake() {
        let loaves = Math.floor(Math.min(YeastLogic_1.yeastAmount(Resources.yeast) - Resources.jars, 4 * ovenSize) / 4);
        if (loaves < 1) {
            return null;
        }
        return loaves;
    }
    let bakeButton = document.getElementById("bake");
    function onBake() {
        if (!canBake) {
            addMessage("You don't have a bread recipe yet! How did you even hit this button???");
            return;
        }
        let loaves = enoughToBake();
        if (!loaves) {
            addMessage("There's not enough yeast to bake with!");
            return;
        }
        let yeastLost = loaves * 4;
        let result = YeastLogic_1.removeYeast(Resources.yeast, yeastLost, Resources.jars);
        if (!result) {
            addMessage("There's not enough yeast to bake with!");
            return;
        }
        Resources.yeast = result.remaining;
        if (YeastLogic_1.health(result.removed) < 0.8) {
            console.log(`tried to bake with ${YeastLogic_1.health(result.removed)}`);
            addMessage("You tried to bake with the yeast but it turned out terrible!");
            return;
        }
        if (loaves > 1) {
            addMessage(`You baked ${loaves} delicious loaves of bread!`);
        }
        else {
            addMessage(`You baked a delicious loaf of bread!`);
        }
        canGiveaway = true;
        let giveawayButton = document.getElementById("giveaway");
        if (giveawayButton) {
            giveawayButton.style.display = "inline";
        }
        Resources.bread += loaves;
    }
    events.addEventListener(E[E.bake], onBake);
    bakeButton.onclick = () => {
        events.addEvent(E[E.bake]);
    };
    let anotherJarButton = document.getElementById("another-jar");
    function onAddJar() {
        if (Resources.newJars.amount < 1) {
            addMessage("Drat! You can't find any more jars right now.");
        }
        else if (YeastLogic_1.yeastVolume(Resources.yeast) > Resources.jars + 1) {
            addMessage("You scoop some starter from each of your jars and put it in a new jar!");
            Resources.jars++;
            Resources.newJars.amount--;
            jarVolume += 32;
        }
        else {
            addMessage("There isn't enough yeast to move into a new jar.");
        }
        // Space left in jar increases by 1024 (jar capacity)
        // % Health increases
    }
    events.addEventListener(E[E.addJar], onAddJar);
    anotherJarButton.onclick = () => {
        events.addEvent(E[E.addJar]);
    };
    let tradeButton = document.getElementById("trade");
    tradeButton.onclick = () => {
        events.addEvent(E[E.trade]);
    };
    function enoughToTrade() {
        let tradeAmount = Math.floor(Math.min(YeastLogic_1.yeastAmount(Resources.yeast) - Resources.jars, 4));
        if (tradeAmount < 4) {
            return null;
        }
        return tradeAmount;
    }
    function onTrade() {
        let tradeAmount = enoughToTrade();
        if (!tradeAmount) {
            addMessage("You don't have enough starter to trade away.");
            return;
        }
        let result = YeastLogic_1.removeYeast(Resources.yeast, tradeAmount, Resources.jars);
        if (!result) {
            addMessage("You don't have enough starter to trade away.");
            return;
        }
        Resources.yeast = result.remaining;
        Resources.friendsToTrade.amount--;
        if (YeastLogic_1.health(result.removed) < 0) {
            addMessage("Your friend reports that the starter wouldn't grow for them and doesn't give you anything.");
        }
        else {
            inventoryDiv.style.display = "block";
            const item = playerInventory.addNewItem();
            if (item) {
                addMessage("You trade your friend some starter for " + item);
                playerInventory.render("item-list");
            }
            else {
                addMessage("Your friend accepts the starter but lied and doesn't have anything to give you.");
            }
        }
    }
    ;
    events.addEventListener(E[E.trade], onTrade);
    function enoughForComp() {
        if (Resources.bread > 5) {
            return 5;
        }
        return null;
    }
    let enterCompetitionButton = document.getElementById("enter-competition");
    enterCompetitionButton.onclick = () => {
        events.addEvent(E[E.enterCompetition]);
    };
    let onEnterCompetition = () => {
        let enterCompAmount = enoughForComp();
        if (!enterCompAmount) {
            addMessage("You don't have enough bread to enter into the competition. You need 5 loaves.");
            return;
        }
        Resources.bread -= 5;
        if (playerInventory.bakingItems.length == 4) {
            addMessage("You entered the competition and won 3rd place!");
            playerPrize = 1;
        }
        else if (playerInventory.bakingItems.length == 5) {
            addMessage("You entered the competition and won 2nd place!");
            playerPrize = 2;
        }
        else if (playerInventory.bakingItems.length == 6) {
            addMessage("You entered the competition and won 2nd place!");
            playerPrize = 3;
        }
        else {
            addMessage("You entered the competition but didn't place... :( Maybe you need some more tools to make your bread better!");
            playerPrize = 0;
        }
    };
    events.addEventListener(E[E.enterCompetition], onEnterCompetition);
    let giveawayButton = document.getElementById("giveaway");
    giveawayButton.onclick = () => {
        events.addEvent(E[E.giveaway]);
    };
    let onGiveaway = () => {
        if (!canGiveaway) {
            addMessage("Why do you think you can give away bread that you don't have? How did you even click this button???");
            return;
        }
        if (Resources.bread < 1) {
            addMessage("You don't have any bread to give away.");
            return;
        }
        Resources.good += Resources.bread;
        Resources.bread = 0;
        addMessage("You give away your bread to your local middle school. They use it in a bake sale.");
    };
    events.addEventListener(E[E.giveaway], onGiveaway);
    let throwawayButton = document.getElementById("throwaway");
    throwawayButton.onclick = () => {
        events.addEvent(E[E.throwaway]);
    };
    let onThrowaway = () => {
        const yeastLost = half(YeastLogic_1.yeastAmount(Resources.yeast));
        let result = YeastLogic_1.removeYeast(Resources.yeast, yeastLost, Resources.jars);
        if (!result) {
            addMessage("There's not enough yeast to throw away and still keep enough for growing.");
            return;
        }
        spillage += yeastLost;
        Resources.yeast = result.remaining;
        addMessage("You threw away half of your starter!");
    };
    events.addEventListener(E[E.throwaway], onThrowaway);
    let splashScreenDiv = document.getElementById('splash-screen');
    splashScreenDiv.style.display = "block";
    let playAgainButton = document.getElementById("play-again");
    playAgainButton.onclick = () => {
        gotoStart();
    };
    gotoStart = () => {
        splashScreenDiv.style.display = "block";
        gameDiv.style.display = "none";
        inventoryDiv.style.display = "none";
    };
    resetButtons = () => {
        throwawayButton.style.display = "inline";
        giveawayButton.style.display = "none";
        anotherJarButton.style.display = "none";
        bakeButton.style.display = "none";
        addFoodButton.style.display = "inline";
        tradeButton.style.display = "none";
        enterCompetitionButton.style.display = "none";
        splashScreenDiv.style.display = "none";
        gameDiv.style.display = "block";
        inventoryDiv.style.display = "none";
    };
    onAllowBake = () => {
        canBake = true;
        bakeButton.style.display = "inline";
        addMessage("Your parents call and give you a delicious bread recipe.");
    };
    renderButtons = () => {
        if (Resources.newJars.amount > 0) {
            anotherJarButton.disabled = false;
        }
        else {
            anotherJarButton.disabled = true;
        }
        if (enoughToBake()) {
            bakeButton.disabled = false;
        }
        else {
            bakeButton.disabled = true;
        }
        if (Resources.bread > 0) {
            giveawayButton.disabled = false;
        }
        else {
            giveawayButton.disabled = true;
        }
        if (enoughToTrade()) {
            tradeButton.disabled = false;
        }
        else {
            bakeButton.disabled = true;
        }
        if (enoughForComp()) {
            enterCompetitionButton.disabled = false;
        }
        else {
            enterCompetitionButton.disabled = true;
        }
    };
    onLose = () => {
        throwawayButton.style.display = "none";
        giveawayButton.style.display = "none";
        anotherJarButton.style.display = "none";
        bakeButton.style.display = "none";
        addFoodButton.style.display = "none";
        tradeButton.style.display = "none";
        enterCompetitionButton.style.display = "none";
        events.clearAll();
    };
    let startGameButton = document.getElementById('start-game');
    startGameButton.onclick = () => {
        initializeGame();
        document.getElementById('bg-music').play();
    };
};
function half(amount) {
    return Math.floor(amount / 2);
}


/***/ }),

/***/ "./src/inventory.ts":
/*!**************************!*\
  !*** ./src/inventory.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const randomItemsSet = [
    "an old shoe",
    "a frog",
    "a pomegranate",
    "the Hitchhiker's Guide to the Galaxy",
    "a gaggle of geese",
    "a fruit rollup",
    "a marker",
    "a bag of peanuts",
];
const bakingItemsSet = [
    "a baker's hat",
    "an apron",
    "a rolling pin",
    "a thermometer",
    "a kitchen timer",
    "oven mitts",
];
class Inventory {
    constructor() {
        this.bakingItemsRemaining = bakingItemsSet.map((value, index) => value);
        this.bakingItems = [];
        this.randomItemsRemaining = randomItemsSet.map((value, index) => value);
        this.randomItems = [];
        this.items = [];
    }
    canAddNewItem() {
        let itemsReceived = this.items.length;
        return itemsReceived != randomItemsSet.length + bakingItemsSet.length;
    }
    getAllItems() {
        return this.items.map((value, index) => value);
    }
    addNewItem() {
        if (!this.canAddNewItem()) {
            return null;
        }
        let itemsReceived = this.bakingItems.length + this.randomItems.length + 1;
        let getBakingItemThreshold = (this.bakingItems.length / itemsReceived);
        let received = "";
        if (this.randomItemsRemaining.length == 0 || Math.random() > getBakingItemThreshold) {
            const itemIndex = Math.floor(Math.random() * this.bakingItemsRemaining.length);
            received = this.bakingItemsRemaining[itemIndex];
            this.bakingItemsRemaining.splice(itemIndex, 1);
        }
        else {
            const itemIndex = Math.floor(Math.random() * this.randomItemsRemaining.length);
            received = this.randomItemsRemaining[itemIndex];
            this.randomItemsRemaining.splice(itemIndex, 1);
        }
        this.items.push(received);
        return received;
    }
    ;
    render(elem) {
        let itemList = document.getElementById(elem);
        if (!itemList) {
            return;
        }
        itemList.innerHTML = "<li>" + this.items.join("</li><li>") + "</li>";
    }
}
exports.Inventory = Inventory;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtlZC1saXN0LXR5cGVzY3JpcHQvbGliL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVldWUtdHlwZXNjcmlwdC9saWIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ZZWFzdExvZ2ljLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7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IiwiZmlsZSI6ImJ1aWxkL2J1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dhbWUudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIExpbmtlZExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKC4uLnZhbHVlcykge1xuICAgICAgICB0aGlzLl9oZWFkID0gdGhpcy5fdGFpbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xlbmd0aCA9IDA7XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmQodmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgKml0ZXJhdG9yKCkge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW0gPSB0aGlzLl9oZWFkO1xuICAgICAgICB3aGlsZSAoY3VycmVudEl0ZW0pIHtcbiAgICAgICAgICAgIHlpZWxkIGN1cnJlbnRJdGVtLnZhbHVlO1xuICAgICAgICAgICAgY3VycmVudEl0ZW0gPSBjdXJyZW50SXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVyYXRvcigpO1xuICAgIH1cbiAgICBnZXQgaGVhZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWQgPyB0aGlzLl9oZWFkLnZhbHVlIDogbnVsbDtcbiAgICB9XG4gICAgZ2V0IHRhaWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWlsID8gdGhpcy5fdGFpbC52YWx1ZSA6IG51bGw7XG4gICAgfVxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XG4gICAgfVxuICAgIC8vIEFkZHMgdGhlIGVsZW1lbnQgYXQgYSBzcGVjaWZpYyBwb3NpdGlvbiBpbnNpZGUgdGhlIGxpbmtlZCBsaXN0XG4gICAgaW5zZXJ0KHZhbCwgcHJldmlvdXNJdGVtLCBjaGVja0R1cGxpY2F0ZXMgPSBmYWxzZSkge1xuICAgICAgICBpZiAoY2hlY2tEdXBsaWNhdGVzICYmIHRoaXMuaXNEdXBsaWNhdGUodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdJdGVtID0gbmV3IExpbmtlZExpc3RJdGVtKHZhbCk7XG4gICAgICAgIGxldCBjdXJyZW50SXRlbSA9IHRoaXMuX2hlYWQ7XG4gICAgICAgIGlmICghY3VycmVudEl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLnZhbHVlID09PSBwcmV2aW91c0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbS5uZXh0ID0gY3VycmVudEl0ZW0ubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbS5wcmV2ID0gY3VycmVudEl0ZW07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLm5leHQgPSBuZXdJdGVtO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3SXRlbS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLm5leHQucHJldiA9IG5ld0l0ZW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWlsID0gbmV3SXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0ubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0gPSBjdXJyZW50SXRlbS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuJ3QgbG9jYXRlIHByZXZpb3VzSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEFkZHMgdGhlIGVsZW1lbnQgYXQgdGhlIGVuZCBvZiB0aGUgbGlua2VkIGxpc3RcbiAgICBhcHBlbmQodmFsLCBjaGVja0R1cGxpY2F0ZXMgPSBmYWxzZSkge1xuICAgICAgICBpZiAoY2hlY2tEdXBsaWNhdGVzICYmIHRoaXMuaXNEdXBsaWNhdGUodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdJdGVtID0gbmV3IExpbmtlZExpc3RJdGVtKHZhbCk7XG4gICAgICAgIGlmICghdGhpcy5fdGFpbCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IHRoaXMuX3RhaWwgPSBuZXdJdGVtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbmV3SXRlbTtcbiAgICAgICAgICAgIG5ld0l0ZW0ucHJldiA9IHRoaXMuX3RhaWw7XG4gICAgICAgICAgICB0aGlzLl90YWlsID0gbmV3SXRlbTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sZW5ndGgrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgZWxlbWVudCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaW5rZWQgbGlzdFxuICAgIHByZXBlbmQodmFsLCBjaGVja0R1cGxpY2F0ZXMgPSBmYWxzZSkge1xuICAgICAgICBpZiAoY2hlY2tEdXBsaWNhdGVzICYmIHRoaXMuaXNEdXBsaWNhdGUodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdJdGVtID0gbmV3IExpbmtlZExpc3RJdGVtKHZhbCk7XG4gICAgICAgIGlmICghdGhpcy5faGVhZCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IHRoaXMuX3RhaWwgPSBuZXdJdGVtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV3SXRlbS5uZXh0ID0gdGhpcy5faGVhZDtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQucHJldiA9IG5ld0l0ZW07XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gbmV3SXRlbTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sZW5ndGgrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJlbW92ZSh2YWwpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gdGhpcy5faGVhZDtcbiAgICAgICAgaWYgKCFjdXJyZW50SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50SXRlbS52YWx1ZSA9PT0gdmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gY3VycmVudEl0ZW0ubmV4dDtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQucHJldiA9IG51bGw7XG4gICAgICAgICAgICBjdXJyZW50SXRlbS5uZXh0ID0gY3VycmVudEl0ZW0ucHJldiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9sZW5ndGgtLTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50SXRlbS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLnZhbHVlID09PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLm5leHQpIHsgLy8gc3BlY2lhbCBjYXNlIGZvciBsYXN0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLnByZXYubmV4dCA9IGN1cnJlbnRJdGVtLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5uZXh0LnByZXYgPSBjdXJyZW50SXRlbS5wcmV2O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0ubmV4dCA9IGN1cnJlbnRJdGVtLnByZXYgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0ucHJldi5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBjdXJyZW50SXRlbS5wcmV2O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0ubmV4dCA9IGN1cnJlbnRJdGVtLnByZXYgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xlbmd0aC0tO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudEl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0ubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0gPSBjdXJyZW50SXRlbS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUhlYWQoKSB7XG4gICAgICAgIGxldCBjdXJyZW50SXRlbSA9IHRoaXMuX2hlYWQ7XG4gICAgICAgIC8vIGVtcHR5IGxpc3RcbiAgICAgICAgaWYgKCFjdXJyZW50SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNpbmdsZSBpdGVtIGxpc3RcbiAgICAgICAgaWYgKCF0aGlzLl9oZWFkLm5leHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fdGFpbCA9IG51bGw7XG4gICAgICAgICAgICAvLyBmdWxsIGxpc3RcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dC5wcmV2ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSB0aGlzLl9oZWFkLm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50SXRlbS5uZXh0ID0gY3VycmVudEl0ZW0ucHJldiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGVuZ3RoLS07XG4gICAgICAgIHJldHVybiBjdXJyZW50SXRlbS52YWx1ZTtcbiAgICB9XG4gICAgcmVtb3ZlVGFpbCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gdGhpcy5fdGFpbDtcbiAgICAgICAgLy8gZW1wdHkgbGlzdFxuICAgICAgICBpZiAoIWN1cnJlbnRJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2luZ2xlIGl0ZW0gbGlzdFxuICAgICAgICBpZiAoIXRoaXMuX3RhaWwucHJldikge1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl90YWlsID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGZ1bGwgbGlzdFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGFpbC5wcmV2Lm5leHQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fdGFpbCA9IHRoaXMuX3RhaWwucHJldjtcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtLm5leHQgPSBjdXJyZW50SXRlbS5wcmV2ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sZW5ndGgtLTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtLnZhbHVlO1xuICAgIH1cbiAgICBmaXJzdChudW0pIHtcbiAgICAgICAgbGV0IGl0ZXIgPSB0aGlzLml0ZXJhdG9yKCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLm1pbihudW0sIHRoaXMubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2YWwgPSBpdGVyLm5leHQoKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzXTtcbiAgICB9XG4gICAgaXNEdXBsaWNhdGUodmFsKSB7XG4gICAgICAgIGxldCBzZXQgPSBuZXcgU2V0KHRoaXMudG9BcnJheSgpKTtcbiAgICAgICAgcmV0dXJuIHNldC5oYXModmFsKTtcbiAgICB9XG59XG5leHBvcnRzLkxpbmtlZExpc3QgPSBMaW5rZWRMaXN0O1xuY2xhc3MgTGlua2VkTGlzdEl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHZhbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgICB0aGlzLm5leHQgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXYgPSBudWxsO1xuICAgIH1cbn1cbmV4cG9ydHMuTGlua2VkTGlzdEl0ZW0gPSBMaW5rZWRMaXN0SXRlbTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbGlua2VkX2xpc3RfdHlwZXNjcmlwdF8xID0gcmVxdWlyZShcImxpbmtlZC1saXN0LXR5cGVzY3JpcHRcIik7XG5jbGFzcyBRdWV1ZSBleHRlbmRzIGxpbmtlZF9saXN0X3R5cGVzY3JpcHRfMS5MaW5rZWRMaXN0IHtcbiAgICBjb25zdHJ1Y3RvciguLi52YWx1ZXMpIHtcbiAgICAgICAgc3VwZXIoLi4udmFsdWVzKTtcbiAgICB9XG4gICAgZ2V0IGZyb250KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFkO1xuICAgIH1cbiAgICBlbnF1ZXVlKHZhbCkge1xuICAgICAgICB0aGlzLmFwcGVuZCh2YWwpO1xuICAgIH1cbiAgICBkZXF1ZXVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVIZWFkKCk7XG4gICAgfVxufVxuZXhwb3J0cy5RdWV1ZSA9IFF1ZXVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IGludGVyZmFjZSBZZWFzdHlHb29kbmVzcyB7XG4gICAgZmVkOiBudW1iZXI7XG4gICAgaGFwcHk6IG51bWJlcjtcbiAgICB3YWl0aW5nOiBudW1iZXI7XG4gICAgaHVuZ3J5OiBudW1iZXI7XG4gICAgc3RhcnZpbmc6IG51bWJlcjtcbiAgICBkZWFkOiBudW1iZXI7XG59XG5cbmNvbnN0IGNvbnN0YW50czoge1xuICAgIG1hdHVyYXRpb25SYXRlOiBZZWFzdHlHb29kbmVzcztcbiAgICBoZWFsdGhNdWx0aXBsaWVyOiBZZWFzdHlHb29kbmVzcztcbiAgICBodW5nZXJNdWx0aXBsaWVyOiBZZWFzdHlHb29kbmVzcztcbiAgICB2b2x1bWVNdWx0aXBsaWVyOiBZZWFzdHlHb29kbmVzcztcbn0gPSB7XG4gICAgbWF0dXJhdGlvblJhdGU6IHtcbiAgICAgICAgZmVkOiAwLjEsXG4gICAgICAgIGhhcHB5OiAwLjEsXG4gICAgICAgIHdhaXRpbmc6IDAuMDUsXG4gICAgICAgIGh1bmdyeTogMC4wNSxcbiAgICAgICAgc3RhcnZpbmc6IDAuMDUsXG4gICAgICAgIGRlYWQ6IDAuMCxcbiAgICB9LFxuICAgIGhlYWx0aE11bHRpcGxpZXI6IHtcbiAgICAgICAgZmVkOiAxLjAsXG4gICAgICAgIGhhcHB5OiAxLjAsXG4gICAgICAgIHdhaXRpbmc6IDEuMCxcbiAgICAgICAgaHVuZ3J5OiAwLjc1LFxuICAgICAgICBzdGFydmluZzogMC4yNSxcbiAgICAgICAgZGVhZDogMC4wLFxuICAgIH0sXG4gICAgaHVuZ2VyTXVsdGlwbGllcjoge1xuICAgICAgICBmZWQ6IDAuMCxcbiAgICAgICAgaGFwcHk6IDAuMSxcbiAgICAgICAgd2FpdGluZzogMC41LFxuICAgICAgICBodW5ncnk6IDAuOSxcbiAgICAgICAgc3RhcnZpbmc6IDEuMCxcbiAgICAgICAgZGVhZDogMC4wLFxuICAgIH0sXG4gICAgdm9sdW1lTXVsdGlwbGllcjoge1xuICAgICAgICBmZWQ6IDEuMCxcbiAgICAgICAgaGFwcHk6IDEuNzUsXG4gICAgICAgIHdhaXRpbmc6IDIuNSxcbiAgICAgICAgaHVuZ3J5OiAxLjc1LFxuICAgICAgICBzdGFydmluZzogMS4yNSxcbiAgICAgICAgZGVhZDogMS4wLFxuICAgIH0sXG59O1xuXG50eXBlIENvbnN0YW50WWVhc3QgPSB7XG4gICAgcmVhZG9ubHkgZmVkOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgaGFwcHk6IG51bWJlcixcbiAgICByZWFkb25seSB3YWl0aW5nOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgaHVuZ3J5OiBudW1iZXIsXG4gICAgcmVhZG9ubHkgc3RhcnZpbmc6IG51bWJlcixcbiAgICByZWFkb25seSBkZWFkOiBudW1iZXIsXG59XG5cbmNvbnN0IGVtcHR5WWVhc3Q6IENvbnN0YW50WWVhc3QgPSB7XG4gICAgZmVkOiAwLFxuICAgIGhhcHB5OiAwLFxuICAgIHdhaXRpbmc6IDAsXG4gICAgaHVuZ3J5OiAwLFxuICAgIHN0YXJ2aW5nOiAwLFxuICAgIGRlYWQ6IDAsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdGFudFllYXN0KHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IENvbnN0YW50WWVhc3Qge1xuICAgIHJldHVybiB5ZWFzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFllYXN0KHllYXN0OiBZZWFzdHlHb29kbmVzcywgbmV3WWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZlZDogeWVhc3QuZmVkICsgbmV3WWVhc3QuZmVkLFxuICAgICAgICBoYXBweTogeWVhc3QuaGFwcHkgKyBuZXdZZWFzdC5oYXBweSxcbiAgICAgICAgd2FpdGluZzogeWVhc3Qud2FpdGluZyArIG5ld1llYXN0LndhaXRpbmcsXG4gICAgICAgIGh1bmdyeTogeWVhc3QuaHVuZ3J5ICsgbmV3WWVhc3QuaHVuZ3J5LFxuICAgICAgICBzdGFydmluZzogeWVhc3Quc3RhcnZpbmcgKyBuZXdZZWFzdC5zdGFydmluZyxcbiAgICAgICAgZGVhZDogeWVhc3QuZGVhZCArIG5ld1llYXN0LmRlYWQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFllYXN0KHllYXN0OiBZZWFzdHlHb29kbmVzcywgZjogKHByb3A6IG51bWJlcikgPT4gbnVtYmVyKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZlZDogZih5ZWFzdC5mZWQpLFxuICAgICAgICBoYXBweTogZih5ZWFzdC5oYXBweSksXG4gICAgICAgIHdhaXRpbmc6IGYoeWVhc3Qud2FpdGluZyksXG4gICAgICAgIGh1bmdyeTogZih5ZWFzdC5odW5ncnkpLFxuICAgICAgICBzdGFydmluZzogZih5ZWFzdC5zdGFydmluZyksXG4gICAgICAgIGRlYWQ6IGYoeWVhc3QuZGVhZCksXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVllYXN0KHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgeWVhc3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhc3RMZXNzVGhhbkVxdWFsKHllYXN0OiBZZWFzdHlHb29kbmVzcywgeWVhc3QyOiBZZWFzdHlHb29kbmVzcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB5ZWFzdC5mZWQgPD0geWVhc3QyLmZlZCAmJiB5ZWFzdC5oYXBweSA8PSB5ZWFzdDIuaGFwcHkgJiYgeWVhc3Qud2FpdGluZyA8PSB5ZWFzdDIud2FpdGluZyAmJiB5ZWFzdC5odW5ncnkgPD0geWVhc3QyLmh1bmdyeSAmJiB5ZWFzdC5zdGFydmluZyA8PSB5ZWFzdDIuc3RhcnZpbmcgJiYgeWVhc3QuZGVhZCA8PSB5ZWFzdDIuZGVhZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXN0TGVzc1RoYW4oeWVhc3Q6IFllYXN0eUdvb2RuZXNzLCB5ZWFzdDI6IFllYXN0eUdvb2RuZXNzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHllYXN0LmZlZCA8IHllYXN0Mi5mZWQgJiYgeWVhc3QuaGFwcHkgPD0geWVhc3QyLmhhcHB5ICYmIHllYXN0LndhaXRpbmcgPD0geWVhc3QyLndhaXRpbmcgJiYgeWVhc3QuaHVuZ3J5IDw9IHllYXN0Mi5odW5ncnkgJiYgeWVhc3Quc3RhcnZpbmcgPD0geWVhc3QyLnN0YXJ2aW5nICYmIHllYXN0LmRlYWQgPD0geWVhc3QyLmRlYWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdFllYXN0KHllYXN0OiBZZWFzdHlHb29kbmVzcywgeWVhc3QyOiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICBjb25zdCByZXN1bHRZZWFzdCA9IHtcbiAgICAgICAgZmVkOiB5ZWFzdC5mZWQgLSB5ZWFzdDIuZmVkLFxuICAgICAgICBoYXBweTogeWVhc3QuaGFwcHkgLSB5ZWFzdDIuaGFwcHksXG4gICAgICAgIHdhaXRpbmc6IHllYXN0LndhaXRpbmcgLSB5ZWFzdDIud2FpdGluZyxcbiAgICAgICAgaHVuZ3J5OiB5ZWFzdC5odW5ncnkgLSB5ZWFzdDIuaHVuZ3J5LFxuICAgICAgICBzdGFydmluZzogeWVhc3Quc3RhcnZpbmcgLSB5ZWFzdDIuc3RhcnZpbmcsXG4gICAgICAgIGRlYWQ6IHllYXN0LmRlYWQgLSB5ZWFzdDIuZGVhZCxcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHRZZWFzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh1bmdlcih5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBudW1iZXIge1xuICAgIGNvbnN0IGFsaXZlID0geWVhc3QuZmVkICsgeWVhc3QuaGFwcHkgKyB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmc7XG4gICAgY29uc3QgaHVuZ2VyQWJzb2x1dGUgPVxuICAgICAgICB5ZWFzdC5mZWQgKiBjb25zdGFudHMuaHVuZ2VyTXVsdGlwbGllci5mZWQgK1xuICAgICAgICB5ZWFzdC5oYXBweSAqIGNvbnN0YW50cy5odW5nZXJNdWx0aXBsaWVyLmhhcHB5ICtcbiAgICAgICAgeWVhc3Qud2FpdGluZyAqIGNvbnN0YW50cy5odW5nZXJNdWx0aXBsaWVyLndhaXRpbmcgK1xuICAgICAgICB5ZWFzdC5odW5ncnkgKiBjb25zdGFudHMuaHVuZ2VyTXVsdGlwbGllci5odW5ncnkgK1xuICAgICAgICB5ZWFzdC5zdGFydmluZyAqIGNvbnN0YW50cy5odW5nZXJNdWx0aXBsaWVyLnN0YXJ2aW5nO1xuICAgIHJldHVybiBodW5nZXJBYnNvbHV0ZSAvIGFsaXZlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVhbHRoKHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IG51bWJlciB7XG4gICAgY29uc3QgdG90YWwgPSB5ZWFzdC5mZWQgKyB5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZyArIHllYXN0LmRlYWQ7XG4gICAgY29uc3QgaHVuZ2VyQWJzb2x1dGUgPVxuICAgICAgICB5ZWFzdC5mZWQgKiBjb25zdGFudHMuaGVhbHRoTXVsdGlwbGllci5mZWQgK1xuICAgICAgICB5ZWFzdC5oYXBweSAqIGNvbnN0YW50cy5oZWFsdGhNdWx0aXBsaWVyLmhhcHB5ICtcbiAgICAgICAgeWVhc3Qud2FpdGluZyAqIGNvbnN0YW50cy5oZWFsdGhNdWx0aXBsaWVyLndhaXRpbmcgK1xuICAgICAgICB5ZWFzdC5odW5ncnkgKiBjb25zdGFudHMuaGVhbHRoTXVsdGlwbGllci5odW5ncnkgK1xuICAgICAgICB5ZWFzdC5zdGFydmluZyAqIGNvbnN0YW50cy5oZWFsdGhNdWx0aXBsaWVyLnN0YXJ2aW5nO1xuICAgIHJldHVybiBodW5nZXJBYnNvbHV0ZSAvIHRvdGFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RlcFllYXN0KHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICBjb25zdCBnb3RIYXBweSA9IHllYXN0LmZlZCAqIGNvbnN0YW50cy5tYXR1cmF0aW9uUmF0ZS5mZWQ7XG4gICAgY29uc3QgZ290V2FpdGluZyA9IHllYXN0LmhhcHB5ICogY29uc3RhbnRzLm1hdHVyYXRpb25SYXRlLmhhcHB5O1xuICAgIGNvbnN0IGdvdEh1bmdyeSA9IHllYXN0LndhaXRpbmcgKiBjb25zdGFudHMubWF0dXJhdGlvblJhdGUud2FpdGluZztcbiAgICBjb25zdCBnb3RTdGFydmluZyA9IHllYXN0Lmh1bmdyeSAqIGNvbnN0YW50cy5tYXR1cmF0aW9uUmF0ZS5odW5ncnk7XG4gICAgY29uc3QgZ290RGVhZCA9IHllYXN0LnN0YXJ2aW5nICogY29uc3RhbnRzLm1hdHVyYXRpb25SYXRlLnN0YXJ2aW5nO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmVkOiB5ZWFzdC5mZWQgLSBnb3RIYXBweSxcbiAgICAgICAgaGFwcHk6IGdvdEhhcHB5ICsgeWVhc3QuaGFwcHkgLSBnb3RXYWl0aW5nLFxuICAgICAgICB3YWl0aW5nOiBnb3RXYWl0aW5nICsgeWVhc3Qud2FpdGluZyAtIGdvdEh1bmdyeSxcbiAgICAgICAgaHVuZ3J5OiBnb3RIdW5ncnkgKyB5ZWFzdC5odW5ncnkgLSBnb3RTdGFydmluZyxcbiAgICAgICAgc3RhcnZpbmc6IGdvdFN0YXJ2aW5nICsgeWVhc3Quc3RhcnZpbmcgLSBnb3REZWFkLFxuICAgICAgICBkZWFkOiBnb3REZWFkICsgeWVhc3QuZGVhZCxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmVlZFllYXN0KGFtb3VudDogbnVtYmVyLCB5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBZZWFzdHlHb29kbmVzcyB7XG4gICAgY29uc3QgZmVlZE1lU2V5bW9yID0geWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nO1xuICAgIGlmIChmZWVkTWVTZXltb3IgPj0gYW1vdW50KSB7XG4gICAgICAgIC8vIE5vdCBlbm91Z2ggZm9vZCB0byBmZWVkIGFsbCB0aGUgcmVhbGx5IGh1bmdyeSB5ZWFzdFxuICAgICAgICBjb25zb2xlLmxvZygnQScpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmVkOiB5ZWFzdC5mZWQgKyBhbW91bnQgKyBhbW91bnQsXG4gICAgICAgICAgICBoYXBweTogeWVhc3QuaGFwcHksXG4gICAgICAgICAgICB3YWl0aW5nOiB5ZWFzdC53YWl0aW5nIC0gKHllYXN0LndhaXRpbmcgLyBmZWVkTWVTZXltb3IpICogYW1vdW50LFxuICAgICAgICAgICAgaHVuZ3J5OiB5ZWFzdC5odW5ncnkgLSAoeWVhc3QuaHVuZ3J5IC8gZmVlZE1lU2V5bW9yKSAqIGFtb3VudCxcbiAgICAgICAgICAgIHN0YXJ2aW5nOiB5ZWFzdC5zdGFydmluZyAtICh5ZWFzdC5zdGFydmluZyAvIGZlZWRNZVNleW1vcikgKiBhbW91bnQsXG4gICAgICAgICAgICBkZWFkOiB5ZWFzdC5kZWFkLFxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZmVlZE1lU2V5bW9yICsgeWVhc3QuaGFwcHkgPj0gYW1vdW50KSB7XG4gICAgICAgIC8vIEZlZWRpbmcgYWxsIHRoZSByZWFsbHkgaHVuZ3J5IHllYXN0LCBwbHVzIHNvbWUgdGhlIHllYXN0IHRoYXQgY291bGQgaGF2ZSBhIGJpdGVcbiAgICAgICAgY29uc29sZS5sb2coJ0InKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZlZDogeWVhc3QuZmVkICsgYW1vdW50ICsgYW1vdW50LFxuICAgICAgICAgICAgaGFwcHk6IHllYXN0LmhhcHB5IC0gKGFtb3VudCAtIGZlZWRNZVNleW1vciksXG4gICAgICAgICAgICB3YWl0aW5nOiAwLFxuICAgICAgICAgICAgaHVuZ3J5OiAwLFxuICAgICAgICAgICAgc3RhcnZpbmc6IDAsXG4gICAgICAgICAgICBkZWFkOiB5ZWFzdC5kZWFkLFxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNvbWUgZmVlZCBnb2VzIHRvIHdhc3RlIGFzIGRlYWQgbWF0ZXJpYWxcbiAgICAgICAgY29uc29sZS5sb2coJ0MnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZlZDogeWVhc3QuZmVkICsgKHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nKSAqIDIsXG4gICAgICAgICAgICBoYXBweTogMCxcbiAgICAgICAgICAgIHdhaXRpbmc6IDAsXG4gICAgICAgICAgICBodW5ncnk6IDAsXG4gICAgICAgICAgICBzdGFydmluZzogMCxcbiAgICAgICAgICAgIGRlYWQ6IHllYXN0LmRlYWQgKyBhbW91bnQgLSAoeWVhc3QuaGFwcHkgKyB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmcpLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUZyYWN0aW9ucyh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBZZWFzdHlHb29kbmVzcyB7XG4gICAgY29uc3QgdG90YWwgPSB5ZWFzdC5mZWQgKyB5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZyArIHllYXN0LmRlYWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmVkOiB5ZWFzdC5mZWQgLyB0b3RhbCxcbiAgICAgICAgaGFwcHk6IHllYXN0LmhhcHB5IC8gdG90YWwsXG4gICAgICAgIHdhaXRpbmc6IHllYXN0LndhaXRpbmcgLyB0b3RhbCxcbiAgICAgICAgaHVuZ3J5OiB5ZWFzdC5odW5ncnkgLyB0b3RhbCxcbiAgICAgICAgc3RhcnZpbmc6IHllYXN0LnN0YXJ2aW5nIC8gdG90YWwsXG4gICAgICAgIGRlYWQ6IHllYXN0LmRlYWQgLyB0b3RhbCxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhc3RWb2x1bWUoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgICB5ZWFzdC5mZWQgKiBjb25zdGFudHMudm9sdW1lTXVsdGlwbGllci5mZWQgK1xuICAgICAgICB5ZWFzdC5oYXBweSAqIGNvbnN0YW50cy52b2x1bWVNdWx0aXBsaWVyLmhhcHB5ICtcbiAgICAgICAgeWVhc3Qud2FpdGluZyAqIGNvbnN0YW50cy52b2x1bWVNdWx0aXBsaWVyLndhaXRpbmcgK1xuICAgICAgICB5ZWFzdC5odW5ncnkgKiBjb25zdGFudHMudm9sdW1lTXVsdGlwbGllci5odW5ncnkgK1xuICAgICAgICB5ZWFzdC5zdGFydmluZyAqIGNvbnN0YW50cy52b2x1bWVNdWx0aXBsaWVyLnN0YXJ2aW5nICtcbiAgICAgICAgeWVhc3QuZGVhZCAqIGNvbnN0YW50cy52b2x1bWVNdWx0aXBsaWVyLmRlYWRcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXBZZWFzdChtYXhWb2x1bWU6IG51bWJlciwgeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogW1llYXN0eUdvb2RuZXNzLCBudW1iZXJdIHtcbiAgICBjb25zdCB2b2x1bWUgPSB5ZWFzdFZvbHVtZSh5ZWFzdCk7XG4gICAgaWYgKHZvbHVtZSA8PSBtYXhWb2x1bWUpIHJldHVybiBbeWVhc3QsIDBdO1xuICAgIGNvbnN0IGxvc3MgPSAodm9sdW1lIC0gbWF4Vm9sdW1lKSAvIHZvbHVtZTtcbiAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgICBmZWQ6IHllYXN0LmZlZCAqICgxIC0gbG9zcyksXG4gICAgICAgICAgICBoYXBweTogeWVhc3QuaGFwcHkgKiAoMSAtIGxvc3MpLFxuICAgICAgICAgICAgd2FpdGluZzogeWVhc3Qud2FpdGluZyAqICgxIC0gbG9zcyksXG4gICAgICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSAqICgxIC0gbG9zcyksXG4gICAgICAgICAgICBzdGFydmluZzogeWVhc3Quc3RhcnZpbmcgKiAoMSAtIGxvc3MpLFxuICAgICAgICAgICAgZGVhZDogeWVhc3QuZGVhZCAqICgxIC0gbG9zcyksXG4gICAgICAgIH0sXG4gICAgICAgIHZvbHVtZSAtIG1heFZvbHVtZSxcbiAgICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhc3RBbW91bnQoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogbnVtYmVyIHtcbiAgICByZXR1cm4geWVhc3QuZmVkICsgeWVhc3QuaGFwcHkgKyB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmcgKyB5ZWFzdC5kZWFkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGl2aW5nWWVhc3RBbW91bnQoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogbnVtYmVyIHtcbiAgICByZXR1cm4geWVhc3QuZmVkICsgeWVhc3QuaGFwcHkgKyB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MsIGFtb3VudDogbnVtYmVyLCBqYXJzOiBudW1iZXIpOiB7IHJlbWFpbmluZzogWWVhc3R5R29vZG5lc3MsIHJlbW92ZWQ6IFllYXN0eUdvb2RuZXNzIH0gfCBudWxsIHtcbiAgICBjb25zdCB0YWtlb3V0ID0gTWF0aC5mbG9vcihhbW91bnQpO1xuICAgIGNvbnN0IGN1cnJlbnRBbW91bnQgPSB5ZWFzdEFtb3VudCh5ZWFzdCk7XG4gICAgaWYgKHRha2VvdXQgPCAxKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICh0YWtlb3V0ID4gY3VycmVudEFtb3VudCAtIGphcnMpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgdGFrZW91dEZyYWN0aW9uID0gdGFrZW91dCAvIGN1cnJlbnRBbW91bnQ7XG4gICAgY29uc29sZS5sb2coYHRha2luZyBvdXQgJHt0YWtlb3V0fSwgZnJhY3Rpb246ICR7dGFrZW91dEZyYWN0aW9ufWApO1xuICAgIGxldCByZW1vdmVkID0gbWFwWWVhc3QoeWVhc3QsIChwcm9wKSA9PiBNYXRoLm1pbihwcm9wICogdGFrZW91dEZyYWN0aW9uLCBwcm9wKSk7XG4gICAgbGV0IHJlbWFpbmluZyA9IHN1YnRyYWN0WWVhc3QoeWVhc3QsIHJlbW92ZWQpO1xuICAgIC8vIEp1c3QgaW4gY2FzZSBzb21ldGhpbmcgd2VudCBuZWdhdGl2ZSFcbiAgICByZW1haW5pbmcgPSBtYXBZZWFzdChyZW1haW5pbmcsIChwcm9wKSA9PiBNYXRoLm1heCgwLCBwcm9wKSk7XG4gICAgY29uc3QgcmVtb3ZlZEFtb3VudCA9IHllYXN0QW1vdW50KHJlbW92ZWQpO1xuICAgIGlmIChyZW1vdmVkQW1vdW50IDwgdGFrZW91dCkge1xuICAgICAgICByZW1vdmVkLmRlYWQgPSByZW1vdmVkQW1vdW50IC0gdGFrZW91dDtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocmVtb3ZlZCk7XG4gICAgcmV0dXJuIHsgcmVtYWluaW5nOiByZW1haW5pbmcsIHJlbW92ZWQ6IHJlbW92ZWQgfTtcbn0iLCJpbXBvcnQgeyBRdWV1ZSB9IGZyb20gJ3F1ZXVlLXR5cGVzY3JpcHQnO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRRdWV1ZSB7XG4gIGV2ZW50cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XG4gIGV2ZW50TGlzdGVuZXJzOiBSZWNvcmQ8c3RyaW5nLCAoKCkgPT4gdm9pZClbXT4gPSB7fTtcblxuICBhZGRFdmVudChldmVudDogc3RyaW5nKSB7XG4gICAgdGhpcy5ldmVudHMuZW5xdWV1ZShldmVudCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGY6ICgpID0+IHZvaWQpIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XS5wdXNoKGYpO1xuICB9XG5cbiAgcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMoZXZlbnQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGY6ICgpID0+IHZvaWQpIHtcbiAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5ldmVudExpc3RlbmVyc1tldmVudF07XG4gICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihmLCAwKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NFdmVudChldmVudDogc3RyaW5nKSB7XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdO1xuICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKCh2YWx1ZSkgPT4geyB2YWx1ZSgpOyB9KTtcbiAgICB9XG4gIH1cblxuICBjbGVhckFsbCgpIHtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XG4gIH1cblxuICBwcm9jZXNzRXZlbnRzKCkge1xuICAgIHdoaWxlICh0aGlzLmV2ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnByb2Nlc3NFdmVudCh0aGlzLmV2ZW50cy5kZXF1ZXVlKCkpO1xuICAgIH1cbiAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICB5ZWFzdFZvbHVtZSxcbiAgICB5ZWFzdEFtb3VudCxcbiAgICByZW1vdmVZZWFzdCxcbiAgICBodW5nZXIsXG4gICAgaGVhbHRoLFxuICAgIHN0ZXBZZWFzdCxcbiAgICBjbGFtcFllYXN0LFxuICAgIGZlZWRZZWFzdCxcbiAgICBZZWFzdHlHb29kbmVzcyxcbiAgICBjYWxjdWxhdGVGcmFjdGlvbnMsXG4gICAgbGl2aW5nWWVhc3RBbW91bnQsXG59IGZyb20gJy4vWWVhc3RMb2dpYyc7XG5cbmltcG9ydCB7IEV2ZW50UXVldWUgfSBmcm9tIFwiLi9ldmVudHNcIjtcbmltcG9ydCB7IEludmVudG9yeSB9IGZyb20gJy4vaW52ZW50b3J5JztcblxuZW51bSBFIHtcbiAgICBmZWVkLCBiYWtlLCBhZGRKYXIsIGdpdmVhd2F5LCB0aHJvd2F3YXksIGVudGVyQ29tcGV0aXRpb24sIHRyYWRlXG59XG5cbmNvbnN0IGV2ZW50cyA9IG5ldyBFdmVudFF1ZXVlKCk7XG5cbmxldCBsYXN0RXBvY2hNUzogbnVtYmVyID0gMDtcbmxldCBlcG9jaEluTVM6IG51bWJlciA9IDEwMDA7XG5sZXQgcnVuU3RhcnRJbk1TOiBudW1iZXIgPSAwO1xuY29uc3QgbmV3SmFyVm9sdW1lOiBudW1iZXIgPSAzMjtcblxuLy8gSW5pdGlhbGl6ZVxubGV0IHNwaWxsYWdlOiBudW1iZXIgPSAwO1xubGV0IG92ZW5TaXplOiBudW1iZXIgPSAxO1xubGV0IGNhbkJha2U6IGJvb2xlYW4gPSBmYWxzZTtcbmxldCBjYW5HaXZlYXdheTogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGNhblRyYWRlOiBib29sZWFuID0gZmFsc2U7XG5sZXQgamFyVm9sdW1lOiBudW1iZXIgPSAzMjtcbmxldCBnYW1lU3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGZpbGxlZFZvbHVtZTogbnVtYmVyID0gMDtcbmxldCBwbGF5ZXJJbnZlbnRvcnkgPSBuZXcgSW52ZW50b3J5KCk7XG5sZXQgcGxheWVyUHJpemU6IG51bWJlciA9IDA7XG5cbmNsYXNzIEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2Uge1xuICAgIGFtb3VudDogbnVtYmVyID0gMDtcbiAgICBlcG9jaHNQZXJSZWZyZXNoOiBudW1iZXIgPSAwO1xuICAgIHJlbWFpbmluZ0Vwb2NoczogbnVtYmVyID0gMDtcbiAgICBpbmNyZWFzZVBlclJlZnJlc2g6IG51bWJlciA9IDA7XG4gICAgbGltaXQ6IG51bWJlciA9IDA7XG4gICAgb25JbmNyZWFzZTogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoYW1vdW50OiBudW1iZXIsIGluY3JlYXNlUGVyUmVmcmVzaDogbnVtYmVyLCBlcG9jaHNQZXJSZWZyZXNoOiBudW1iZXIsIGxpbWl0OiBudW1iZXIsIG9uSW5jcmVhc2U/OiAoKCkgPT4gdm9pZCkpIHtcbiAgICAgICAgdGhpcy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICAgIHRoaXMuZXBvY2hzUGVyUmVmcmVzaCA9IGVwb2Noc1BlclJlZnJlc2g7XG4gICAgICAgIHRoaXMuaW5jcmVhc2VQZXJSZWZyZXNoID0gaW5jcmVhc2VQZXJSZWZyZXNoO1xuICAgICAgICB0aGlzLnJlbWFpbmluZ0Vwb2NocyA9IE1hdGgubWF4KE1hdGguZmxvb3IoZXBvY2hzUGVyUmVmcmVzaCksIDEpO1xuICAgICAgICB0aGlzLmxpbWl0ID0gbGltaXQ7XG4gICAgICAgIHRoaXMub25JbmNyZWFzZSA9IG9uSW5jcmVhc2U7XG4gICAgfVxuXG4gICAgc3RlcCgpIHtcbiAgICAgICAgY29uc3QgZXByID0gTWF0aC5tYXgoTWF0aC5mbG9vcih0aGlzLmVwb2Noc1BlclJlZnJlc2gpLCAxKTtcbiAgICAgICAgY29uc3QgaXByID0gTWF0aC5tYXgoTWF0aC5mbG9vcih0aGlzLmluY3JlYXNlUGVyUmVmcmVzaCksIDApO1xuICAgICAgICBpZiAoaXByIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtYWluaW5nRXBvY2hzLS07XG4gICAgICAgIGlmICh0aGlzLnJlbWFpbmluZ0Vwb2NocyA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVtYWluaW5nRXBvY2hzID0gZXByO1xuICAgICAgICAgICAgdGhpcy5hbW91bnQgKz0gaXByO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW1vdW50ID4gdGhpcy5saW1pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW1vdW50ID0gdGhpcy5saW1pdDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vbkluY3JlYXNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkluY3JlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnR5cGUgUmVzb3VyY2VzVHlwZSA9IHtcbiAgICB5ZWFzdDogWWVhc3R5R29vZG5lc3MsXG4gICAgZ29vZDogbnVtYmVyLFxuICAgIGJyZWFkOiBudW1iZXIsXG4gICAgamFyczogbnVtYmVyLFxuICAgIG5ld0phcnM6IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UsXG4gICAgZnJpZW5kc1RvVHJhZGU6IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UsXG4gICAgY29tcGV0aXRpb25zOiBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlXG59O1xuXG5sZXQgZGVhZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBvbkZpbmRKYXIoKSB7XG4gICAgbGV0IGFub3RoZXJKYXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFub3RoZXItamFyXCIpO1xuICAgIGlmIChhbm90aGVySmFyQnV0dG9uKSB7XG4gICAgICAgIGFub3RoZXJKYXJCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgfVxuICAgIGFkZE1lc3NhZ2UoXCJZb3UgZm91bmQgYW5vdGhlciBqYXIhXCIpO1xufVxuXG5mdW5jdGlvbiBvbk5ld0ZyaWVuZCgpIHtcbiAgICBsZXQgdHJhZGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYWRlXCIpO1xuICAgIGlmICh0cmFkZUJ1dHRvbikge1xuICAgICAgICB0cmFkZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICB9XG4gICAgYWRkTWVzc2FnZShcIkEgZnJpZW5kIGFza3MgaWYgdGhleSBjYW4gaGF2ZSBzb21lIG9mIHlvdXIgc3RhcnRlci4gVGhleSBvZmZlciBhIHByZXNlbnQgaW4gcmV0dXJuLlwiKTtcbn1cblxuXG5mdW5jdGlvbiBvbk5ld0NvbXAoKSB7XG4gICAgbGV0IGVudGVyQ29tcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW50ZXItY29tcGV0aXRpb25cIik7XG4gICAgaWYgKGVudGVyQ29tcEJ1dHRvbikge1xuICAgICAgICBlbnRlckNvbXBCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgfVxuICAgIGFkZE1lc3NhZ2UoXCJZb3UgaGVhciBhYm91dCBhIGJha2luZyBjb21wZXRpdGlvbiEgWW91IG5lZWQgNSBsb2F2ZXMgdG8gZW50ZXIuXCIpO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZpcnN0QmFrZSgpIHtcbiAgICBpZiAoY2FuQmFrZSkge1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHllYXN0QW1vdW50KFJlc291cmNlcy55ZWFzdCkgPj0gUmVzb3VyY2VzLmphcnMgKyA0ICYmIGhlYWx0aChSZXNvdXJjZXMueWVhc3QpID49IC44KSB7XG4gICAgICAgIG9uQWxsb3dCYWtlKCk7XG4gICAgfVxufVxuXG5sZXQgUmVzb3VyY2VzOiBSZXNvdXJjZXNUeXBlID0ge1xuICAgIHllYXN0OiB7IGZlZDogMiwgaGFwcHk6IDAsIHdhaXRpbmc6IDAsIGh1bmdyeTogMCwgc3RhcnZpbmc6IDAsIGRlYWQ6IDEgfSxcbiAgICBnb29kOiAwLFxuICAgIGJyZWFkOiAwLFxuICAgIGphcnM6IDEsXG4gICAgbmV3SmFyczogbmV3IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UoMCwgMSwgMTIwLCAxKSxcbiAgICBmcmllbmRzVG9UcmFkZTogbmV3IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UoMSwgMSwgNjAsIDEpLFxuICAgIGNvbXBldGl0aW9uczogbmV3IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UoMCwgMSwgMjQ1LCAxKSxcbn07XG5cbmxldCByZXNldEJ1dHRvbnMgPSAoKSA9PiB7IH07XG5sZXQgb25BbGxvd0Jha2UgPSAoKSA9PiB7IH07XG5sZXQgb25GaXJzdEphciA9ICgpID0+IHsgfTtcbmxldCBnb3RvU3RhcnQgPSAoKSA9PiB7IH07XG5sZXQgcmVuZGVyQnV0dG9ucyA9ICgpID0+IHsgfTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWUoKSB7XG4gICAgaWYgKCFnYW1lU3RhcnRlZCkge1xuICAgICAgICBnYW1lU3RhcnRlZCA9IHRydWU7XG4gICAgICAgIGNyZWF0ZWpzLlRpY2tlci5mcmFtZXJhdGUgPSAzMC4wO1xuICAgICAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIGZ1bmN0aW9uIChldmVudE9iajogT2JqZWN0KSB7XG4gICAgICAgICAgICBnYW1lTG9vcCg8Y3JlYXRlanMuVGlja2VyRXZlbnQ+ZXZlbnRPYmopO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWVzc2FnZXMgPSBbXTtcbiAgICBqYXJWb2x1bWUgPSAzMjtcbiAgICBmaWxsZWRWb2x1bWUgPSAwO1xuICAgIG92ZW5TaXplID0gMTtcbiAgICBzcGlsbGFnZSA9IDA7XG4gICAgZGVhZCA9IGZhbHNlO1xuICAgIGNhbkJha2UgPSBmYWxzZTtcbiAgICBjYW5HaXZlYXdheSA9IGZhbHNlO1xuICAgIHBsYXllclByaXplID0gMDtcbiAgICBldmVudHMuY2xlYXJBbGwoKTtcbiAgICBSZXNvdXJjZXMgPSB7XG4gICAgICAgIHllYXN0OiB7IGZlZDogMiwgaGFwcHk6IDAsIHdhaXRpbmc6IDAsIGh1bmdyeTogMCwgc3RhcnZpbmc6IDAsIGRlYWQ6IDEgfSxcbiAgICAgICAgZ29vZDogMCxcbiAgICAgICAgYnJlYWQ6IDAsXG4gICAgICAgIGphcnM6IDEsXG4gICAgICAgIG5ld0phcnM6IG5ldyBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlKDAsIDEsIDEyMCwgMSwgb25GaW5kSmFyKSxcbiAgICAgICAgZnJpZW5kc1RvVHJhZGU6IG5ldyBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlKDAsIDEsIDU1LCAxLCBvbk5ld0ZyaWVuZCksXG4gICAgICAgIGNvbXBldGl0aW9uczogbmV3IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UoMCwgMSwgMjQ1LCAxLCBvbk5ld0NvbXApLFxuICAgIH07XG4gICAgcGxheWVySW52ZW50b3J5ID0gbmV3IEludmVudG9yeSgpO1xuICAgIHJlc2V0QnV0dG9ucygpO1xuICAgIGFkZE1lc3NhZ2UoXCJVbmZvcnR1bmF0ZWx5LCB5b3UgYXJlIHN0YXJ0aW5nIGZyb20gc2NyYXRjaC4gWW91ciBmcmllbmQgaGFzIGdpdmVuIHlvdSBhIHN0YXJ0ZXIsIGJ1dCB5b3UnbGwgbmVlZCB0byBmZWVkIGl0LiBIZSBzYXlzIHRoYXQgaGUgYWxyZWFkeSBmZWQgaXQgc28geW91IG1pZ2h0IHdhbnQgdG8gd2FpdCBhIGJpdC5cIik7XG4gICAgcnVuU3RhcnRJbk1TID0gY3JlYXRlanMuVGlja2VyLmdldFRpbWUodHJ1ZSk7XG59XG5cbmxldCBtZXNzYWdlczogc3RyaW5nW10gPSBbXTtcblxuZnVuY3Rpb24gYWRkTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBtZXNzYWdlcy51bnNoaWZ0KG1lc3NhZ2UpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAxMCkge1xuICAgICAgICBtZXNzYWdlcy5wb3AoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuICc8cD4nICsgbWVzc2FnZXMubWFwKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiBgJHt2YWx1ZX1gKS5qb2luKCdcXG48YnI+XFxuJykgKyAnPC9wPidcbn1cblxuZnVuY3Rpb24gc2V0RWxlbWVudChpZDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSB7XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWVsZW0pIHJldHVybjtcbiAgICBlbGVtLmlubmVyVGV4dCA9IGNvbnRlbnRzO1xufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50SFRNTChpZDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSB7XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWVsZW0pIHJldHVybjtcbiAgICBlbGVtLmlubmVySFRNTCA9IGNvbnRlbnRzO1xufVxuXG5mdW5jdGlvbiBwbGFjZWRUZXh0KCk6IHN0cmluZyB7XG4gICAgaWYgKHBsYXllclByaXplIDwgMSkge1xuICAgICAgICByZXR1cm4gXCJZb3UgbmV2ZXIgcGxhY2VkIGluIGNvbXBldGl0aW9uXCI7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXJQcml6ZSA+PSAxICYmIHBsYXllclByaXplIDwgMikge1xuICAgICAgICByZXR1cm4gXCJZb3UgcmVhY2hlZCB0aGlyZCBwbGFjZSBpbiBjb21wZXRpdGlvbiFcIlxuICAgIH0gZWxzZSBpZiAocGxheWVyUHJpemUgPj0gMiAmJiBwbGF5ZXJQcml6ZSA8IDMpIHtcbiAgICAgICAgcmV0dXJuIFwiWW91IHJlYWNoZWQgc2Vjb25kIHBsYWNlIGluIGNvbXBldGl0aW9uIVwiXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiV293LCB5b3UgcmVhY2hlZCBmaXJzdCBwbGFjZSBpbiBjb21wZXRpdGlvbiBhbmQgYWNoaWV2ZWQgeW91ciBnb2FsIG9mIGJlY29taW5nIGEgbWFzdGVyIGJha2VyIVwiXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8gUmVuZGVyIHRoZSBqYXJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnamFyLWNhcGFjaXR5JykhLmlubmVyVGV4dCA9ICcnICsgamFyVm9sdW1lO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqYXJzLWZpbGxlZCcpIS5pbm5lclRleHQgPSAnJyArIFJlc291cmNlcy5qYXJzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2FibGUtc3RhcnRlci1hbW91bnQnKSEuaW5uZXJUZXh0ID0gJycgKyAoTWF0aC5yb3VuZCh5ZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpKSAtIFJlc291cmNlcy5qYXJzKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWwtc3RhcnRlci1hbW91bnQnKSEuaW5uZXJUZXh0ID0gJycgKyBNYXRoLnJvdW5kKHllYXN0QW1vdW50KFJlc291cmNlcy55ZWFzdCkpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VkJykhLmlubmVyVGV4dCA9IGAke01hdGguZmxvb3IoeWVhc3RWb2x1bWUoUmVzb3VyY2VzLnllYXN0KSAvIGphclZvbHVtZSAqIDEwMCl9JWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bmdlcicpIS5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKGh1bmdlcihSZXNvdXJjZXMueWVhc3QpICogMTAwKX0lYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhbHRoJykhLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoaGVhbHRoKFJlc291cmNlcy55ZWFzdCkgKiAxMDApfSVgO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFzaC1icmVhZCcpIS5pbm5lclRleHQgPSBgJHtSZXNvdXJjZXMuYnJlYWR9YDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vZC13YXN0ZScpIS5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKHNwaWxsYWdlKX1gO1xuICAgIHNldEVsZW1lbnRIVE1MKCdtZXNzYWdlLWxvZycsIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzKSk7XG4gICAgc2V0RWxlbWVudChcInBsYWNlLXJlYWNoZWRcIiwgcGxhY2VkVGV4dCgpKVxuICAgIHNldEVsZW1lbnQoXCJsb2F2ZXMtZG9uYXRlZFwiLCBcIlwiICsgUmVzb3VyY2VzLmdvb2QpO1xuXG4gICAgY29uc3QgZnJhY3Rpb25zOiBZZWFzdHlHb29kbmVzcyA9IGNhbGN1bGF0ZUZyYWN0aW9ucyhSZXNvdXJjZXMueWVhc3QpO1xuICAgIHNldEVsZW1lbnQoXG4gICAgICAgICdkZWJ1Z19xdWFudGl0eScsXG4gICAgICAgIGAke1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QuZmVkICtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0LmhhcHB5ICtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0LndhaXRpbmcgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QuaHVuZ3J5ICtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0LnN0YXJ2aW5nICtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0LmRlYWRcbiAgICAgICAgfWBcbiAgICApO1xuICAgIHJlbmRlckJ1dHRvbnMoKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19mZWQnLCBgJHtNYXRoLnJvdW5kKGZyYWN0aW9ucy5mZWQgKiAxMDApfSVgKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19oYXBweScsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLmhhcHB5ICogMTAwKX0lYCk7XG4gICAgc2V0RWxlbWVudCgnZGVidWdfd2FpdGluZycsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLndhaXRpbmcgKiAxMDApfSVgKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19odW5ncnknLCBgJHtNYXRoLnJvdW5kKGZyYWN0aW9ucy5odW5ncnkgKiAxMDApfSVgKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19zdGFydmluZycsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLnN0YXJ2aW5nICogMTAwKX0lYCk7XG4gICAgc2V0RWxlbWVudCgnZGVidWdfZGVhZCcsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLmRlYWQgKiAxMDApfSVgKTtcbn1cblxuZnVuY3Rpb24gZXZvbHZlUmVzb3VyY2VzKGVwb2NoczogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlcG9jaHM7IGkrKykge1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QgPSBzdGVwWWVhc3QoUmVzb3VyY2VzLnllYXN0KTtcbiAgICAgICAgUmVzb3VyY2VzLm5ld0phcnMuc3RlcCgpO1xuICAgICAgICBSZXNvdXJjZXMuZnJpZW5kc1RvVHJhZGUuc3RlcCgpO1xuICAgICAgICBSZXNvdXJjZXMuY29tcGV0aXRpb25zLnN0ZXAoKTtcbiAgICB9XG4gICAgY2hlY2tGaXJzdEJha2UoKTtcbn1cblxuZnVuY3Rpb24gZ2FtZUxvb3AoZXZlbnQ6IGNyZWF0ZWpzLlRpY2tlckV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZXBvY2hEZWx0YSA9IGNyZWF0ZWpzLlRpY2tlci5nZXRUaW1lKHRydWUpIC0gbGFzdEVwb2NoTVM7XG4gICAgY29uc3QgcmVzb3VyY2VFcG9jaHMgPSBNYXRoLmZsb29yKGVwb2NoRGVsdGEgLyBlcG9jaEluTVMpO1xuICAgIGV2ZW50cy5wcm9jZXNzRXZlbnRzKCk7XG4gICAgaWYgKCFkZWFkKSB7XG4gICAgICAgIGV2b2x2ZVJlc291cmNlcyhyZXNvdXJjZUVwb2Nocyk7XG4gICAgfVxuICAgIGlmIChyZXNvdXJjZUVwb2NocyA+IDApIHtcbiAgICAgICAgbGFzdEVwb2NoTVMgKz0gcmVzb3VyY2VFcG9jaHMgKiBlcG9jaEluTVM7XG4gICAgfVxuICAgIGlmICghZGVhZCkge1xuICAgICAgICBpZiAobGl2aW5nWWVhc3RBbW91bnQoUmVzb3VyY2VzLnllYXN0KSA8IC41KSB7XG4gICAgICAgICAgICBkZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3VyIHBvb3IgeWVhc3QgaXMgZGVhZC5cIilcbiAgICAgICAgICAgIG9uTG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFkZWFkKSB7XG4gICAgICAgIGNvbnN0IFtuZXdZZWFzdCwgbmV3U3BpbGxdID0gY2xhbXBZZWFzdChqYXJWb2x1bWUsIFJlc291cmNlcy55ZWFzdCk7XG4gICAgICAgIFJlc291cmNlcy55ZWFzdCA9IG5ld1llYXN0O1xuICAgICAgICBpZiAobmV3U3BpbGwgPiAwKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiT2ggbm8hIFlvdXIgc3RhcnRlciBvdmVyZmxvd2VkLCBhbmQgeWVhc3QgaXMgYWxsIG92ZXIgdGhlIGZsb29yLlwiKVxuICAgICAgICB9XG4gICAgICAgIHNwaWxsYWdlICs9IG5ld1NwaWxsO1xuICAgIH1cblxuICAgIHJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBhZGRGb29kKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdBZGRpbmcgZm9vZCcpITtrXG4gICAgLy8gY29uc29sZS5sb2coUmVzb3VyY2VzLnllYXN0KTtcbiAgICBjb25zdCBvbGRIZWFsdGggPSBoZWFsdGgoUmVzb3VyY2VzLnllYXN0KTtcblxuICAgIFJlc291cmNlcy55ZWFzdCA9IGZlZWRZZWFzdCgxLCBSZXNvdXJjZXMueWVhc3QpO1xuICAgIC8vY29uc29sZS5sb2coUmVzb3VyY2VzLnllYXN0KTtcbiAgICBjb25zdCBbbmV3WWVhc3QsIG5ld1NwaWxsXSA9IGNsYW1wWWVhc3QoamFyVm9sdW1lLCBSZXNvdXJjZXMueWVhc3QpO1xuICAgIFJlc291cmNlcy55ZWFzdCA9IG5ld1llYXN0O1xuICAgIHNwaWxsYWdlICs9IG5ld1NwaWxsO1xuICAgIGNvbnN0IG5ld0hlYWx0aCA9IGhlYWx0aChSZXNvdXJjZXMueWVhc3QpO1xuICAgIGlmIChuZXdIZWFsdGggPiBvbGRIZWFsdGgpIHtcbiAgICAgICAgYWRkTWVzc2FnZSgnWW91IGZlZCB5b3VyIHNvdXJkb3VnaCBzdGFydGVyLCBhbmQgaXQgbG9va3MgYmV0dGVyIScpO1xuICAgIH0gZWxzZSBpZiAobmV3SGVhbHRoID09IG9sZEhlYWx0aCkge1xuICAgICAgICBhZGRNZXNzYWdlKCdZb3UgZmVkIHlvdXIgc291cmRvdWdoIHN0YXJ0ZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhZGRNZXNzYWdlKCdZb3UgZmVkIHlvdXIgc291cmRvdWdoIHN0YXJ0ZXIsIGJ1dCB5b3UgdGhpbmsgeW91IG1pZ2h0IGhhdmUgb3ZlcmZlZCBpdC4uLicpO1xuICAgIH1cbn1cblxubGV0IG9uTG9zZSA9ICgpID0+IHsgfTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBsZXQgZ2FtZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XG4gICAgZ2FtZURpdiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGxldCBpbnZlbnRvcnlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImludmVudG9yeVwiKTtcbiAgICBpbnZlbnRvcnlEaXYhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAvLyBBZGQgYnV0dG9uIGNsaWNrIGxpc3RlbmVyc1xuICAgIGxldCBhZGRGb29kQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1mb29kJyk7XG4gICAgYWRkRm9vZEJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS5mZWVkXSk7XG4gICAgfVxuICAgIGxldCBvbkFkZEZvb2QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0cnlpbmcgdG8gYWRkIGZvb2QnKTtcbiAgICAgICAgYWRkRm9vZCgpO1xuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmZlZWRdLCBvbkFkZEZvb2QpO1xuXG4gICAgLyogYWxsIGFjdGlvbnMgYmVsb3cgKGN1cnJlbnRseSA1IC0gYmFrZSAvIGFub3RoZXItamFyIC8gdHJhZGUgLyBnYSAvIHRhKVxuICBuZWVkIHRvIGRlY3JlYXNlIHRoZSB2b2x1bWUgYnkgNTAlXG4gICovXG4gICAgZnVuY3Rpb24gZW5vdWdoVG9CYWtlKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICBsZXQgbG9hdmVzID0gTWF0aC5mbG9vcihNYXRoLm1pbih5ZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpIC0gUmVzb3VyY2VzLmphcnMsIDQgKiBvdmVuU2l6ZSkgLyA0KTtcbiAgICAgICAgaWYgKGxvYXZlcyA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2F2ZXM7XG4gICAgfVxuICAgIGxldCBiYWtlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWtlXCIpO1xuICAgIGZ1bmN0aW9uIG9uQmFrZSgpIHtcbiAgICAgICAgaWYgKCFjYW5CYWtlKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGRvbid0IGhhdmUgYSBicmVhZCByZWNpcGUgeWV0ISBIb3cgZGlkIHlvdSBldmVuIGhpdCB0aGlzIGJ1dHRvbj8/P1wiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBsb2F2ZXMgPSBlbm91Z2hUb0Jha2UoKTtcbiAgICAgICAgaWYgKCFsb2F2ZXMpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJUaGVyZSdzIG5vdCBlbm91Z2ggeWVhc3QgdG8gYmFrZSB3aXRoIVwiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCB5ZWFzdExvc3QgPSBsb2F2ZXMgKiA0O1xuICAgICAgICBsZXQgcmVzdWx0ID0gcmVtb3ZlWWVhc3QoUmVzb3VyY2VzLnllYXN0LCB5ZWFzdExvc3QsIFJlc291cmNlcy5qYXJzKTtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJUaGVyZSdzIG5vdCBlbm91Z2ggeWVhc3QgdG8gYmFrZSB3aXRoIVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBSZXNvdXJjZXMueWVhc3QgPSByZXN1bHQucmVtYWluaW5nO1xuICAgICAgICBpZiAoaGVhbHRoKHJlc3VsdC5yZW1vdmVkKSA8IDAuOCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHRyaWVkIHRvIGJha2Ugd2l0aCAke2hlYWx0aChyZXN1bHQucmVtb3ZlZCl9YCk7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IHRyaWVkIHRvIGJha2Ugd2l0aCB0aGUgeWVhc3QgYnV0IGl0IHR1cm5lZCBvdXQgdGVycmlibGUhXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2F2ZXMgPiAxKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKGBZb3UgYmFrZWQgJHtsb2F2ZXN9IGRlbGljaW91cyBsb2F2ZXMgb2YgYnJlYWQhYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKGBZb3UgYmFrZWQgYSBkZWxpY2lvdXMgbG9hZiBvZiBicmVhZCFgKTtcbiAgICAgICAgfVxuICAgICAgICBjYW5HaXZlYXdheSA9IHRydWU7XG4gICAgICAgIGxldCBnaXZlYXdheUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2l2ZWF3YXlcIik7XG4gICAgICAgIGlmIChnaXZlYXdheUJ1dHRvbikge1xuICAgICAgICAgICAgZ2l2ZWF3YXlCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgIH1cbiAgICAgICAgUmVzb3VyY2VzLmJyZWFkICs9IGxvYXZlcztcbiAgICB9XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmJha2VdLCBvbkJha2UpO1xuICAgIGJha2VCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGV2ZW50cy5hZGRFdmVudChFW0UuYmFrZV0pO1xuICAgIH07XG5cbiAgICBsZXQgYW5vdGhlckphckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5vdGhlci1qYXJcIik7XG4gICAgZnVuY3Rpb24gb25BZGRKYXIoKSB7XG4gICAgICAgIGlmIChSZXNvdXJjZXMubmV3SmFycy5hbW91bnQgPCAxKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiRHJhdCEgWW91IGNhbid0IGZpbmQgYW55IG1vcmUgamFycyByaWdodCBub3cuXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHllYXN0Vm9sdW1lKFJlc291cmNlcy55ZWFzdCkgPiBSZXNvdXJjZXMuamFycyArIDEpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3Ugc2Nvb3Agc29tZSBzdGFydGVyIGZyb20gZWFjaCBvZiB5b3VyIGphcnMgYW5kIHB1dCBpdCBpbiBhIG5ldyBqYXIhXCIpO1xuICAgICAgICAgICAgUmVzb3VyY2VzLmphcnMrKztcbiAgICAgICAgICAgIFJlc291cmNlcy5uZXdKYXJzLmFtb3VudC0tO1xuICAgICAgICAgICAgamFyVm9sdW1lICs9IDMyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIlRoZXJlIGlzbid0IGVub3VnaCB5ZWFzdCB0byBtb3ZlIGludG8gYSBuZXcgamFyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTcGFjZSBsZWZ0IGluIGphciBpbmNyZWFzZXMgYnkgMTAyNCAoamFyIGNhcGFjaXR5KVxuICAgICAgICAvLyAlIEhlYWx0aCBpbmNyZWFzZXNcbiAgICB9XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmFkZEphcl0sIG9uQWRkSmFyKTtcbiAgICBhbm90aGVySmFyQnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBldmVudHMuYWRkRXZlbnQoRVtFLmFkZEphcl0pO1xuICAgIH07XG5cblxuXG4gICAgbGV0IHRyYWRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFkZVwiKTtcbiAgICB0cmFkZUJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS50cmFkZV0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gZW5vdWdoVG9UcmFkZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgbGV0IHRyYWRlQW1vdW50ID0gTWF0aC5mbG9vcihNYXRoLm1pbih5ZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpIC0gUmVzb3VyY2VzLmphcnMsIDQpKTtcbiAgICAgICAgaWYgKHRyYWRlQW1vdW50IDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYWRlQW1vdW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblRyYWRlKCkge1xuICAgICAgICBsZXQgdHJhZGVBbW91bnQgPSBlbm91Z2hUb1RyYWRlKClcbiAgICAgICAgaWYgKCF0cmFkZUFtb3VudCkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBkb24ndCBoYXZlIGVub3VnaCBzdGFydGVyIHRvIHRyYWRlIGF3YXkuXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9IHJlbW92ZVllYXN0KFJlc291cmNlcy55ZWFzdCwgdHJhZGVBbW91bnQsIFJlc291cmNlcy5qYXJzKTtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RhcnRlciB0byB0cmFkZSBhd2F5LlwiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFJlc291cmNlcy55ZWFzdCA9IHJlc3VsdC5yZW1haW5pbmc7XG4gICAgICAgIFJlc291cmNlcy5mcmllbmRzVG9UcmFkZS5hbW91bnQtLTtcbiAgICAgICAgaWYgKGhlYWx0aChyZXN1bHQucmVtb3ZlZCkgPCAwKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91ciBmcmllbmQgcmVwb3J0cyB0aGF0IHRoZSBzdGFydGVyIHdvdWxkbid0IGdyb3cgZm9yIHRoZW0gYW5kIGRvZXNuJ3QgZ2l2ZSB5b3UgYW55dGhpbmcuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW52ZW50b3J5RGl2IS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHBsYXllckludmVudG9yeS5hZGROZXdJdGVtKCk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgdHJhZGUgeW91ciBmcmllbmQgc29tZSBzdGFydGVyIGZvciBcIiArIGl0ZW0pO1xuICAgICAgICAgICAgICAgIHBsYXllckludmVudG9yeS5yZW5kZXIoXCJpdGVtLWxpc3RcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3VyIGZyaWVuZCBhY2NlcHRzIHRoZSBzdGFydGVyIGJ1dCBsaWVkIGFuZCBkb2Vzbid0IGhhdmUgYW55dGhpbmcgdG8gZ2l2ZSB5b3UuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGV2ZW50cy5hZGRFdmVudExpc3RlbmVyKEVbRS50cmFkZV0sIG9uVHJhZGUpO1xuXG4gICAgZnVuY3Rpb24gZW5vdWdoRm9yQ29tcCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgaWYgKFJlc291cmNlcy5icmVhZCA+IDUpIHtcbiAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgZW50ZXJDb21wZXRpdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW50ZXItY29tcGV0aXRpb25cIik7XG4gICAgZW50ZXJDb21wZXRpdGlvbkJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS5lbnRlckNvbXBldGl0aW9uXSk7XG4gICAgfTtcbiAgICBsZXQgb25FbnRlckNvbXBldGl0aW9uID0gKCkgPT4ge1xuICAgICAgICBsZXQgZW50ZXJDb21wQW1vdW50ID0gZW5vdWdoRm9yQ29tcCgpO1xuICAgICAgICBpZiAoIWVudGVyQ29tcEFtb3VudCkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBkb24ndCBoYXZlIGVub3VnaCBicmVhZCB0byBlbnRlciBpbnRvIHRoZSBjb21wZXRpdGlvbi4gWW91IG5lZWQgNSBsb2F2ZXMuXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgUmVzb3VyY2VzLmJyZWFkIC09IDU7XG4gICAgICAgIGlmIChwbGF5ZXJJbnZlbnRvcnkuYmFraW5nSXRlbXMubGVuZ3RoID09IDQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZW50ZXJlZCB0aGUgY29tcGV0aXRpb24gYW5kIHdvbiAzcmQgcGxhY2UhXCIpXG4gICAgICAgICAgICBwbGF5ZXJQcml6ZSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVySW52ZW50b3J5LmJha2luZ0l0ZW1zLmxlbmd0aCA9PSA1KSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGVudGVyZWQgdGhlIGNvbXBldGl0aW9uIGFuZCB3b24gMm5kIHBsYWNlIVwiKVxuICAgICAgICAgICAgcGxheWVyUHJpemUgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXllckludmVudG9yeS5iYWtpbmdJdGVtcy5sZW5ndGggPT0gNikge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBlbnRlcmVkIHRoZSBjb21wZXRpdGlvbiBhbmQgd29uIDJuZCBwbGFjZSFcIilcbiAgICAgICAgICAgIHBsYXllclByaXplID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZW50ZXJlZCB0aGUgY29tcGV0aXRpb24gYnV0IGRpZG4ndCBwbGFjZS4uLiA6KCBNYXliZSB5b3UgbmVlZCBzb21lIG1vcmUgdG9vbHMgdG8gbWFrZSB5b3VyIGJyZWFkIGJldHRlciFcIilcbiAgICAgICAgICAgIHBsYXllclByaXplID0gMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmVudGVyQ29tcGV0aXRpb25dLCBvbkVudGVyQ29tcGV0aXRpb24pO1xuXG4gICAgbGV0IGdpdmVhd2F5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnaXZlYXdheVwiKTtcbiAgICBnaXZlYXdheUJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS5naXZlYXdheV0pO1xuICAgIH07XG4gICAgbGV0IG9uR2l2ZWF3YXkgPSAoKSA9PiB7XG4gICAgICAgIGlmICghY2FuR2l2ZWF3YXkpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJXaHkgZG8geW91IHRoaW5rIHlvdSBjYW4gZ2l2ZSBhd2F5IGJyZWFkIHRoYXQgeW91IGRvbid0IGhhdmU/IEhvdyBkaWQgeW91IGV2ZW4gY2xpY2sgdGhpcyBidXR0b24/Pz9cIik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVzb3VyY2VzLmJyZWFkIDwgMSkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBkb24ndCBoYXZlIGFueSBicmVhZCB0byBnaXZlIGF3YXkuXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgUmVzb3VyY2VzLmdvb2QgKz0gUmVzb3VyY2VzLmJyZWFkO1xuICAgICAgICBSZXNvdXJjZXMuYnJlYWQgPSAwO1xuICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGdpdmUgYXdheSB5b3VyIGJyZWFkIHRvIHlvdXIgbG9jYWwgbWlkZGxlIHNjaG9vbC4gVGhleSB1c2UgaXQgaW4gYSBiYWtlIHNhbGUuXCIpO1xuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmdpdmVhd2F5XSwgb25HaXZlYXdheSk7XG5cbiAgICBsZXQgdGhyb3dhd2F5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aHJvd2F3YXlcIik7XG4gICAgdGhyb3dhd2F5QnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBldmVudHMuYWRkRXZlbnQoRVtFLnRocm93YXdheV0pO1xuICAgIH07XG4gICAgbGV0IG9uVGhyb3dhd2F5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB5ZWFzdExvc3QgPSBoYWxmKHllYXN0QW1vdW50KFJlc291cmNlcy55ZWFzdCkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gcmVtb3ZlWWVhc3QoUmVzb3VyY2VzLnllYXN0LCB5ZWFzdExvc3QsIFJlc291cmNlcy5qYXJzKTtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJUaGVyZSdzIG5vdCBlbm91Z2ggeWVhc3QgdG8gdGhyb3cgYXdheSBhbmQgc3RpbGwga2VlcCBlbm91Z2ggZm9yIGdyb3dpbmcuXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc3BpbGxhZ2UgKz0geWVhc3RMb3N0O1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QgPSByZXN1bHQucmVtYWluaW5nO1xuICAgICAgICBhZGRNZXNzYWdlKFwiWW91IHRocmV3IGF3YXkgaGFsZiBvZiB5b3VyIHN0YXJ0ZXIhXCIpO1xuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLnRocm93YXdheV0sIG9uVGhyb3dhd2F5KTtcbiAgICBsZXQgc3BsYXNoU2NyZWVuRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwbGFzaC1zY3JlZW4nKTtcbiAgICBzcGxhc2hTY3JlZW5EaXYhLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgbGV0IHBsYXlBZ2FpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheS1hZ2FpblwiKTtcbiAgICBwbGF5QWdhaW5CdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGdvdG9TdGFydCgpO1xuICAgIH07XG5cbiAgICBnb3RvU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIHNwbGFzaFNjcmVlbkRpdiEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZ2FtZURpdiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBpbnZlbnRvcnlEaXYhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICByZXNldEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICAgIHRocm93YXdheUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgIGdpdmVhd2F5QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFub3RoZXJKYXJCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYmFrZUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhZGRGb29kQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICAgICAgdHJhZGVCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZW50ZXJDb21wZXRpdGlvbkJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBzcGxhc2hTY3JlZW5EaXYhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZ2FtZURpdiEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgaW52ZW50b3J5RGl2IS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfTtcbiAgICBvbkFsbG93QmFrZSA9ICgpID0+IHtcbiAgICAgICAgY2FuQmFrZSA9IHRydWU7XG4gICAgICAgIGJha2VCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICBhZGRNZXNzYWdlKFwiWW91ciBwYXJlbnRzIGNhbGwgYW5kIGdpdmUgeW91IGEgZGVsaWNpb3VzIGJyZWFkIHJlY2lwZS5cIik7XG4gICAgfVxuXG4gICAgcmVuZGVyQnV0dG9ucyA9ICgpID0+IHtcbiAgICAgICAgaWYgKFJlc291cmNlcy5uZXdKYXJzLmFtb3VudCA+IDApIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+YW5vdGhlckphckJ1dHRvbikhLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmFub3RoZXJKYXJCdXR0b24pIS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVub3VnaFRvQmFrZSgpKSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmJha2VCdXR0b24pIS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5iYWtlQnV0dG9uKSEuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChSZXNvdXJjZXMuYnJlYWQgPiAwKSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmdpdmVhd2F5QnV0dG9uKSEuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+Z2l2ZWF3YXlCdXR0b24pIS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVub3VnaFRvVHJhZGUoKSkge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD50cmFkZUJ1dHRvbikhLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmJha2VCdXR0b24pIS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVub3VnaEZvckNvbXAoKSkge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5lbnRlckNvbXBldGl0aW9uQnV0dG9uKSEuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+ZW50ZXJDb21wZXRpdGlvbkJ1dHRvbikhLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9zZSA9ICgpID0+IHtcbiAgICAgICAgdGhyb3dhd2F5QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGdpdmVhd2F5QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFub3RoZXJKYXJCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYmFrZUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhZGRGb29kQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRyYWRlQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGVudGVyQ29tcGV0aXRpb25CdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZXZlbnRzLmNsZWFyQWxsKCk7XG4gICAgfTtcblxuXG4gICAgbGV0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1nYW1lJyk7XG4gICAgc3RhcnRHYW1lQnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpbml0aWFsaXplR2FtZSgpO1xuICAgICAgICAoPEhUTUxBdWRpb0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JnLW11c2ljJykpIS5wbGF5KCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYWxmKGFtb3VudDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihhbW91bnQgLyAyKVxufVxuIiwiXG5jb25zdCByYW5kb21JdGVtc1NldDogc3RyaW5nW10gPSBbXG4gIFwiYW4gb2xkIHNob2VcIixcbiAgXCJhIGZyb2dcIixcbiAgXCJhIHBvbWVncmFuYXRlXCIsXG4gIFwidGhlIEhpdGNoaGlrZXIncyBHdWlkZSB0byB0aGUgR2FsYXh5XCIsXG4gIFwiYSBnYWdnbGUgb2YgZ2Vlc2VcIixcbiAgXCJhIGZydWl0IHJvbGx1cFwiLFxuICBcImEgbWFya2VyXCIsXG4gIFwiYSBiYWcgb2YgcGVhbnV0c1wiLFxuXTtcblxuY29uc3QgYmFraW5nSXRlbXNTZXQ6IHN0cmluZ1tdID0gW1xuICBcImEgYmFrZXIncyBoYXRcIixcbiAgXCJhbiBhcHJvblwiLFxuICBcImEgcm9sbGluZyBwaW5cIixcbiAgXCJhIHRoZXJtb21ldGVyXCIsXG4gIFwiYSBraXRjaGVuIHRpbWVyXCIsXG4gIFwib3ZlbiBtaXR0c1wiLFxuXTtcblxuZXhwb3J0IGNsYXNzIEludmVudG9yeSB7XG4gIGJha2luZ0l0ZW1zUmVtYWluaW5nOiBzdHJpbmdbXTtcbiAgYmFraW5nSXRlbXM6IHN0cmluZ1tdO1xuICByYW5kb21JdGVtc1JlbWFpbmluZzogc3RyaW5nW107XG4gIHJhbmRvbUl0ZW1zOiBzdHJpbmdbXTtcbiAgaXRlbXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYmFraW5nSXRlbXNSZW1haW5pbmcgPSBiYWtpbmdJdGVtc1NldC5tYXAoKHZhbHVlLCBpbmRleCkgPT4gdmFsdWUpO1xuICAgIHRoaXMuYmFraW5nSXRlbXMgPSBbXTtcbiAgICB0aGlzLnJhbmRvbUl0ZW1zUmVtYWluaW5nID0gcmFuZG9tSXRlbXNTZXQubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlKTtcbiAgICB0aGlzLnJhbmRvbUl0ZW1zID0gW107XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgY2FuQWRkTmV3SXRlbSgpOiBib29sZWFuIHtcbiAgICBsZXQgaXRlbXNSZWNlaXZlZCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIHJldHVybiBpdGVtc1JlY2VpdmVkICE9IHJhbmRvbUl0ZW1zU2V0Lmxlbmd0aCArIGJha2luZ0l0ZW1zU2V0Lmxlbmd0aFxuICB9XG5cbiAgZ2V0QWxsSXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlKTtcbiAgfVxuXG4gIGFkZE5ld0l0ZW0oKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLmNhbkFkZE5ld0l0ZW0oKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgbGV0IGl0ZW1zUmVjZWl2ZWQgPSB0aGlzLmJha2luZ0l0ZW1zLmxlbmd0aCArIHRoaXMucmFuZG9tSXRlbXMubGVuZ3RoICsgMTtcbiAgICBsZXQgZ2V0QmFraW5nSXRlbVRocmVzaG9sZCA9ICh0aGlzLmJha2luZ0l0ZW1zLmxlbmd0aCAvIGl0ZW1zUmVjZWl2ZWQpO1xuICAgIGxldCByZWNlaXZlZCA9IFwiXCI7XG4gICAgaWYgKHRoaXMucmFuZG9tSXRlbXNSZW1haW5pbmcubGVuZ3RoID09IDAgfHwgTWF0aC5yYW5kb20oKSA+IGdldEJha2luZ0l0ZW1UaHJlc2hvbGQpIHtcbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYmFraW5nSXRlbXNSZW1haW5pbmcubGVuZ3RoKTtcbiAgICAgIHJlY2VpdmVkID0gdGhpcy5iYWtpbmdJdGVtc1JlbWFpbmluZ1tpdGVtSW5kZXhdO1xuICAgICAgdGhpcy5iYWtpbmdJdGVtc1JlbWFpbmluZy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaXRlbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5yYW5kb21JdGVtc1JlbWFpbmluZy5sZW5ndGgpO1xuICAgICAgcmVjZWl2ZWQgPSB0aGlzLnJhbmRvbUl0ZW1zUmVtYWluaW5nW2l0ZW1JbmRleF07XG4gICAgICB0aGlzLnJhbmRvbUl0ZW1zUmVtYWluaW5nLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnB1c2gocmVjZWl2ZWQpO1xuXG4gICAgcmV0dXJuIHJlY2VpdmVkO1xuICB9O1xuXG4gIHJlbmRlcihlbGVtOiBzdHJpbmcpIHtcbiAgICBsZXQgaXRlbUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtKVxuICAgIGlmICghaXRlbUxpc3QpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpdGVtTGlzdC5pbm5lckhUTUwgPSBcIjxsaT5cIiArIHRoaXMuaXRlbXMuam9pbihcIjwvbGk+PGxpPlwiKSArIFwiPC9saT5cIjtcbiAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==