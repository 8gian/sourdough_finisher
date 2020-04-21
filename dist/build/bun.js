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
    friendsToTrade: new IntegralRefillingResource(1, 1, 32, 1),
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
        friendsToTrade: new IntegralRefillingResource(0, 1, 32, 1, onNewFriend),
        competitions: new IntegralRefillingResource(0, 1, 189, 1, onNewComp),
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
    const oldHealth = YeastLogic_1.health(Resources.yeast);
    Resources.yeast = YeastLogic_1.feedYeast(1, Resources.yeast);
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
        if (YeastLogic_1.health(result.removed) < .7) {
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
        if (Resources.bread >= 5) {
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
            addMessage("You entered the competition and won 1st place!");
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
        let randItem = Math.random();
        if (this.bakingItemsRemaining.length > 0 && (this.randomItemsRemaining.length == 0 || randItem > getBakingItemThreshold)) {
            const itemIndex = Math.floor(Math.random() * this.bakingItemsRemaining.length);
            received = this.bakingItemsRemaining[itemIndex];
            this.bakingItemsRemaining.splice(itemIndex, 1);
            this.bakingItems.push(received);
        }
        else {
            const itemIndex = Math.floor(Math.random() * this.randomItemsRemaining.length);
            received = this.randomItemsRemaining[itemIndex];
            this.randomItemsRemaining.splice(itemIndex, 1);
            this.randomItems.push(received);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtlZC1saXN0LXR5cGVzY3JpcHQvbGliL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVldWUtdHlwZXNjcmlwdC9saWIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ZZWFzdExvZ2ljLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7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QUMsUUFBUSxFQUFFO1lBQ2IsT0FBTTtTQUNQO1FBQ0QsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ3ZFLENBQUM7Q0FDRjtBQXZERCw4QkF1REMiLCJmaWxlIjoiYnVpbGQvYnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZ2FtZS50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTGlua2VkTGlzdCB7XG4gICAgY29uc3RydWN0b3IoLi4udmFsdWVzKSB7XG4gICAgICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGVuZ3RoID0gMDtcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZCh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAqaXRlcmF0b3IoKSB7XG4gICAgICAgIGxldCBjdXJyZW50SXRlbSA9IHRoaXMuX2hlYWQ7XG4gICAgICAgIHdoaWxlIChjdXJyZW50SXRlbSkge1xuICAgICAgICAgICAgeWllbGQgY3VycmVudEl0ZW0udmFsdWU7XG4gICAgICAgICAgICBjdXJyZW50SXRlbSA9IGN1cnJlbnRJdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZXJhdG9yKCk7XG4gICAgfVxuICAgIGdldCBoZWFkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZCA/IHRoaXMuX2hlYWQudmFsdWUgOiBudWxsO1xuICAgIH1cbiAgICBnZXQgdGFpbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhaWwgPyB0aGlzLl90YWlsLnZhbHVlIDogbnVsbDtcbiAgICB9XG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcbiAgICB9XG4gICAgLy8gQWRkcyB0aGUgZWxlbWVudCBhdCBhIHNwZWNpZmljIHBvc2l0aW9uIGluc2lkZSB0aGUgbGlua2VkIGxpc3RcbiAgICBpbnNlcnQodmFsLCBwcmV2aW91c0l0ZW0sIGNoZWNrRHVwbGljYXRlcyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChjaGVja0R1cGxpY2F0ZXMgJiYgdGhpcy5pc0R1cGxpY2F0ZSh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0l0ZW0gPSBuZXcgTGlua2VkTGlzdEl0ZW0odmFsKTtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gdGhpcy5faGVhZDtcbiAgICAgICAgaWYgKCFjdXJyZW50SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0udmFsdWUgPT09IHByZXZpb3VzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLm5leHQgPSBjdXJyZW50SXRlbS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtLnByZXYgPSBjdXJyZW50SXRlbTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0ubmV4dCA9IG5ld0l0ZW07XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdJdGVtLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0l0ZW0ubmV4dC5wcmV2ID0gbmV3SXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBuZXdJdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xlbmd0aCsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbSA9IGN1cnJlbnRJdGVtLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW4ndCBsb2NhdGUgcHJldmlvdXNJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQWRkcyB0aGUgZWxlbWVudCBhdCB0aGUgZW5kIG9mIHRoZSBsaW5rZWQgbGlzdFxuICAgIGFwcGVuZCh2YWwsIGNoZWNrRHVwbGljYXRlcyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChjaGVja0R1cGxpY2F0ZXMgJiYgdGhpcy5pc0R1cGxpY2F0ZSh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0l0ZW0gPSBuZXcgTGlua2VkTGlzdEl0ZW0odmFsKTtcbiAgICAgICAgaWYgKCF0aGlzLl90YWlsKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gdGhpcy5fdGFpbCA9IG5ld0l0ZW07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBuZXdJdGVtO1xuICAgICAgICAgICAgbmV3SXRlbS5wcmV2ID0gdGhpcy5fdGFpbDtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBuZXdJdGVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xlbmd0aCsrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gQWRkIHRoZSBlbGVtZW50IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpbmtlZCBsaXN0XG4gICAgcHJlcGVuZCh2YWwsIGNoZWNrRHVwbGljYXRlcyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChjaGVja0R1cGxpY2F0ZXMgJiYgdGhpcy5pc0R1cGxpY2F0ZSh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0l0ZW0gPSBuZXcgTGlua2VkTGlzdEl0ZW0odmFsKTtcbiAgICAgICAgaWYgKCF0aGlzLl9oZWFkKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gdGhpcy5fdGFpbCA9IG5ld0l0ZW07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdJdGVtLm5leHQgPSB0aGlzLl9oZWFkO1xuICAgICAgICAgICAgdGhpcy5faGVhZC5wcmV2ID0gbmV3SXRlbTtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBuZXdJdGVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xlbmd0aCsrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmVtb3ZlKHZhbCkge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW0gPSB0aGlzLl9oZWFkO1xuICAgICAgICBpZiAoIWN1cnJlbnRJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRJdGVtLnZhbHVlID09PSB2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBjdXJyZW50SXRlbS5uZXh0O1xuICAgICAgICAgICAgdGhpcy5faGVhZC5wcmV2ID0gbnVsbDtcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtLm5leHQgPSBjdXJyZW50SXRlbS5wcmV2ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2xlbmd0aC0tO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0udmFsdWUgPT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0ubmV4dCkgeyAvLyBzcGVjaWFsIGNhc2UgZm9yIGxhc3QgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0ucHJldi5uZXh0ID0gY3VycmVudEl0ZW0ubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLm5leHQucHJldiA9IGN1cnJlbnRJdGVtLnByZXY7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5uZXh0ID0gY3VycmVudEl0ZW0ucHJldiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5wcmV2Lm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbCA9IGN1cnJlbnRJdGVtLnByZXY7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5uZXh0ID0gY3VycmVudEl0ZW0ucHJldiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGVuZ3RoLS07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50SXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbSA9IGN1cnJlbnRJdGVtLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlSGVhZCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gdGhpcy5faGVhZDtcbiAgICAgICAgLy8gZW1wdHkgbGlzdFxuICAgICAgICBpZiAoIWN1cnJlbnRJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2luZ2xlIGl0ZW0gbGlzdFxuICAgICAgICBpZiAoIXRoaXMuX2hlYWQubmV4dCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl90YWlsID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGZ1bGwgbGlzdFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0LnByZXYgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IHRoaXMuX2hlYWQubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtLm5leHQgPSBjdXJyZW50SXRlbS5wcmV2ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sZW5ndGgtLTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtLnZhbHVlO1xuICAgIH1cbiAgICByZW1vdmVUYWlsKCkge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW0gPSB0aGlzLl90YWlsO1xuICAgICAgICAvLyBlbXB0eSBsaXN0XG4gICAgICAgIGlmICghY3VycmVudEl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBzaW5nbGUgaXRlbSBsaXN0XG4gICAgICAgIGlmICghdGhpcy5fdGFpbC5wcmV2KSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBudWxsO1xuICAgICAgICAgICAgLy8gZnVsbCBsaXN0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90YWlsLnByZXYubmV4dCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl90YWlsID0gdGhpcy5fdGFpbC5wcmV2O1xuICAgICAgICAgICAgY3VycmVudEl0ZW0ubmV4dCA9IGN1cnJlbnRJdGVtLnByZXYgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xlbmd0aC0tO1xuICAgICAgICByZXR1cm4gY3VycmVudEl0ZW0udmFsdWU7XG4gICAgfVxuICAgIGZpcnN0KG51bSkge1xuICAgICAgICBsZXQgaXRlciA9IHRoaXMuaXRlcmF0b3IoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgbiA9IE1hdGgubWluKG51bSwgdGhpcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IHZhbCA9IGl0ZXIubmV4dCgpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0b0FycmF5KCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXNdO1xuICAgIH1cbiAgICBpc0R1cGxpY2F0ZSh2YWwpIHtcbiAgICAgICAgbGV0IHNldCA9IG5ldyBTZXQodGhpcy50b0FycmF5KCkpO1xuICAgICAgICByZXR1cm4gc2V0Lmhhcyh2YWwpO1xuICAgIH1cbn1cbmV4cG9ydHMuTGlua2VkTGlzdCA9IExpbmtlZExpc3Q7XG5jbGFzcyBMaW5rZWRMaXN0SXRlbSB7XG4gICAgY29uc3RydWN0b3IodmFsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgIHRoaXMubmV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldiA9IG51bGw7XG4gICAgfVxufVxuZXhwb3J0cy5MaW5rZWRMaXN0SXRlbSA9IExpbmtlZExpc3RJdGVtO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsaW5rZWRfbGlzdF90eXBlc2NyaXB0XzEgPSByZXF1aXJlKFwibGlua2VkLWxpc3QtdHlwZXNjcmlwdFwiKTtcbmNsYXNzIFF1ZXVlIGV4dGVuZHMgbGlua2VkX2xpc3RfdHlwZXNjcmlwdF8xLkxpbmtlZExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKC4uLnZhbHVlcykge1xuICAgICAgICBzdXBlciguLi52YWx1ZXMpO1xuICAgIH1cbiAgICBnZXQgZnJvbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYWQ7XG4gICAgfVxuICAgIGVucXVldWUodmFsKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKHZhbCk7XG4gICAgfVxuICAgIGRlcXVldWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUhlYWQoKTtcbiAgICB9XG59XG5leHBvcnRzLlF1ZXVlID0gUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgaW50ZXJmYWNlIFllYXN0eUdvb2RuZXNzIHtcbiAgICBmZWQ6IG51bWJlcjtcbiAgICBoYXBweTogbnVtYmVyO1xuICAgIHdhaXRpbmc6IG51bWJlcjtcbiAgICBodW5ncnk6IG51bWJlcjtcbiAgICBzdGFydmluZzogbnVtYmVyO1xuICAgIGRlYWQ6IG51bWJlcjtcbn1cblxuY29uc3QgY29uc3RhbnRzOiB7XG4gICAgbWF0dXJhdGlvblJhdGU6IFllYXN0eUdvb2RuZXNzO1xuICAgIGhlYWx0aE11bHRpcGxpZXI6IFllYXN0eUdvb2RuZXNzO1xuICAgIGh1bmdlck11bHRpcGxpZXI6IFllYXN0eUdvb2RuZXNzO1xuICAgIHZvbHVtZU11bHRpcGxpZXI6IFllYXN0eUdvb2RuZXNzO1xufSA9IHtcbiAgICBtYXR1cmF0aW9uUmF0ZToge1xuICAgICAgICBmZWQ6IDAuMSxcbiAgICAgICAgaGFwcHk6IDAuMSxcbiAgICAgICAgd2FpdGluZzogMC4wNSxcbiAgICAgICAgaHVuZ3J5OiAwLjA1LFxuICAgICAgICBzdGFydmluZzogMC4wNSxcbiAgICAgICAgZGVhZDogMC4wLFxuICAgIH0sXG4gICAgaGVhbHRoTXVsdGlwbGllcjoge1xuICAgICAgICBmZWQ6IDEuMCxcbiAgICAgICAgaGFwcHk6IDEuMCxcbiAgICAgICAgd2FpdGluZzogMS4wLFxuICAgICAgICBodW5ncnk6IDAuNzUsXG4gICAgICAgIHN0YXJ2aW5nOiAwLjI1LFxuICAgICAgICBkZWFkOiAwLjAsXG4gICAgfSxcbiAgICBodW5nZXJNdWx0aXBsaWVyOiB7XG4gICAgICAgIGZlZDogMC4wLFxuICAgICAgICBoYXBweTogMC4xLFxuICAgICAgICB3YWl0aW5nOiAwLjUsXG4gICAgICAgIGh1bmdyeTogMC45LFxuICAgICAgICBzdGFydmluZzogMS4wLFxuICAgICAgICBkZWFkOiAwLjAsXG4gICAgfSxcbiAgICB2b2x1bWVNdWx0aXBsaWVyOiB7XG4gICAgICAgIGZlZDogMS4wLFxuICAgICAgICBoYXBweTogMS43NSxcbiAgICAgICAgd2FpdGluZzogMi41LFxuICAgICAgICBodW5ncnk6IDEuNzUsXG4gICAgICAgIHN0YXJ2aW5nOiAxLjI1LFxuICAgICAgICBkZWFkOiAxLjAsXG4gICAgfSxcbn07XG5cbnR5cGUgQ29uc3RhbnRZZWFzdCA9IHtcbiAgICByZWFkb25seSBmZWQ6IG51bWJlcixcbiAgICByZWFkb25seSBoYXBweTogbnVtYmVyLFxuICAgIHJlYWRvbmx5IHdhaXRpbmc6IG51bWJlcixcbiAgICByZWFkb25seSBodW5ncnk6IG51bWJlcixcbiAgICByZWFkb25seSBzdGFydmluZzogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGRlYWQ6IG51bWJlcixcbn1cblxuY29uc3QgZW1wdHlZZWFzdDogQ29uc3RhbnRZZWFzdCA9IHtcbiAgICBmZWQ6IDAsXG4gICAgaGFwcHk6IDAsXG4gICAgd2FpdGluZzogMCxcbiAgICBodW5ncnk6IDAsXG4gICAgc3RhcnZpbmc6IDAsXG4gICAgZGVhZDogMCxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0YW50WWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogQ29uc3RhbnRZZWFzdCB7XG4gICAgcmV0dXJuIHllYXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkWWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzLCBuZXdZZWFzdDogWWVhc3R5R29vZG5lc3MpOiBZZWFzdHlHb29kbmVzcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmVkOiB5ZWFzdC5mZWQgKyBuZXdZZWFzdC5mZWQsXG4gICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSArIG5ld1llYXN0LmhhcHB5LFxuICAgICAgICB3YWl0aW5nOiB5ZWFzdC53YWl0aW5nICsgbmV3WWVhc3Qud2FpdGluZyxcbiAgICAgICAgaHVuZ3J5OiB5ZWFzdC5odW5ncnkgKyBuZXdZZWFzdC5odW5ncnksXG4gICAgICAgIHN0YXJ2aW5nOiB5ZWFzdC5zdGFydmluZyArIG5ld1llYXN0LnN0YXJ2aW5nLFxuICAgICAgICBkZWFkOiB5ZWFzdC5kZWFkICsgbmV3WWVhc3QuZGVhZCxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwWWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzLCBmOiAocHJvcDogbnVtYmVyKSA9PiBudW1iZXIpOiBZZWFzdHlHb29kbmVzcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmVkOiBmKHllYXN0LmZlZCksXG4gICAgICAgIGhhcHB5OiBmKHllYXN0LmhhcHB5KSxcbiAgICAgICAgd2FpdGluZzogZih5ZWFzdC53YWl0aW5nKSxcbiAgICAgICAgaHVuZ3J5OiBmKHllYXN0Lmh1bmdyeSksXG4gICAgICAgIHN0YXJ2aW5nOiBmKHllYXN0LnN0YXJ2aW5nKSxcbiAgICAgICAgZGVhZDogZih5ZWFzdC5kZWFkKSxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5WWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB5ZWFzdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdExlc3NUaGFuRXF1YWwoeWVhc3Q6IFllYXN0eUdvb2RuZXNzLCB5ZWFzdDI6IFllYXN0eUdvb2RuZXNzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHllYXN0LmZlZCA8PSB5ZWFzdDIuZmVkICYmIHllYXN0LmhhcHB5IDw9IHllYXN0Mi5oYXBweSAmJiB5ZWFzdC53YWl0aW5nIDw9IHllYXN0Mi53YWl0aW5nICYmIHllYXN0Lmh1bmdyeSA8PSB5ZWFzdDIuaHVuZ3J5ICYmIHllYXN0LnN0YXJ2aW5nIDw9IHllYXN0Mi5zdGFydmluZyAmJiB5ZWFzdC5kZWFkIDw9IHllYXN0Mi5kZWFkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geWVhc3RMZXNzVGhhbih5ZWFzdDogWWVhc3R5R29vZG5lc3MsIHllYXN0MjogWWVhc3R5R29vZG5lc3MpOiBib29sZWFuIHtcbiAgICByZXR1cm4geWVhc3QuZmVkIDwgeWVhc3QyLmZlZCAmJiB5ZWFzdC5oYXBweSA8PSB5ZWFzdDIuaGFwcHkgJiYgeWVhc3Qud2FpdGluZyA8PSB5ZWFzdDIud2FpdGluZyAmJiB5ZWFzdC5odW5ncnkgPD0geWVhc3QyLmh1bmdyeSAmJiB5ZWFzdC5zdGFydmluZyA8PSB5ZWFzdDIuc3RhcnZpbmcgJiYgeWVhc3QuZGVhZCA8PSB5ZWFzdDIuZGVhZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0WWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzLCB5ZWFzdDI6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIGNvbnN0IHJlc3VsdFllYXN0ID0ge1xuICAgICAgICBmZWQ6IHllYXN0LmZlZCAtIHllYXN0Mi5mZWQsXG4gICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSAtIHllYXN0Mi5oYXBweSxcbiAgICAgICAgd2FpdGluZzogeWVhc3Qud2FpdGluZyAtIHllYXN0Mi53YWl0aW5nLFxuICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSAtIHllYXN0Mi5odW5ncnksXG4gICAgICAgIHN0YXJ2aW5nOiB5ZWFzdC5zdGFydmluZyAtIHllYXN0Mi5zdGFydmluZyxcbiAgICAgICAgZGVhZDogeWVhc3QuZGVhZCAtIHllYXN0Mi5kZWFkLFxuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdFllYXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVuZ2VyKHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IG51bWJlciB7XG4gICAgY29uc3QgYWxpdmUgPSB5ZWFzdC5mZWQgKyB5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZztcbiAgICBjb25zdCBodW5nZXJBYnNvbHV0ZSA9XG4gICAgICAgIHllYXN0LmZlZCAqIGNvbnN0YW50cy5odW5nZXJNdWx0aXBsaWVyLmZlZCArXG4gICAgICAgIHllYXN0LmhhcHB5ICogY29uc3RhbnRzLmh1bmdlck11bHRpcGxpZXIuaGFwcHkgK1xuICAgICAgICB5ZWFzdC53YWl0aW5nICogY29uc3RhbnRzLmh1bmdlck11bHRpcGxpZXIud2FpdGluZyArXG4gICAgICAgIHllYXN0Lmh1bmdyeSAqIGNvbnN0YW50cy5odW5nZXJNdWx0aXBsaWVyLmh1bmdyeSArXG4gICAgICAgIHllYXN0LnN0YXJ2aW5nICogY29uc3RhbnRzLmh1bmdlck11bHRpcGxpZXIuc3RhcnZpbmc7XG4gICAgcmV0dXJuIGh1bmdlckFic29sdXRlIC8gYWxpdmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZWFsdGgoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogbnVtYmVyIHtcbiAgICBjb25zdCB0b3RhbCA9IHllYXN0LmZlZCArIHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nICsgeWVhc3QuZGVhZDtcbiAgICBjb25zdCBodW5nZXJBYnNvbHV0ZSA9XG4gICAgICAgIHllYXN0LmZlZCAqIGNvbnN0YW50cy5oZWFsdGhNdWx0aXBsaWVyLmZlZCArXG4gICAgICAgIHllYXN0LmhhcHB5ICogY29uc3RhbnRzLmhlYWx0aE11bHRpcGxpZXIuaGFwcHkgK1xuICAgICAgICB5ZWFzdC53YWl0aW5nICogY29uc3RhbnRzLmhlYWx0aE11bHRpcGxpZXIud2FpdGluZyArXG4gICAgICAgIHllYXN0Lmh1bmdyeSAqIGNvbnN0YW50cy5oZWFsdGhNdWx0aXBsaWVyLmh1bmdyeSArXG4gICAgICAgIHllYXN0LnN0YXJ2aW5nICogY29uc3RhbnRzLmhlYWx0aE11bHRpcGxpZXIuc3RhcnZpbmc7XG4gICAgcmV0dXJuIGh1bmdlckFic29sdXRlIC8gdG90YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGVwWWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIGNvbnN0IGdvdEhhcHB5ID0geWVhc3QuZmVkICogY29uc3RhbnRzLm1hdHVyYXRpb25SYXRlLmZlZDtcbiAgICBjb25zdCBnb3RXYWl0aW5nID0geWVhc3QuaGFwcHkgKiBjb25zdGFudHMubWF0dXJhdGlvblJhdGUuaGFwcHk7XG4gICAgY29uc3QgZ290SHVuZ3J5ID0geWVhc3Qud2FpdGluZyAqIGNvbnN0YW50cy5tYXR1cmF0aW9uUmF0ZS53YWl0aW5nO1xuICAgIGNvbnN0IGdvdFN0YXJ2aW5nID0geWVhc3QuaHVuZ3J5ICogY29uc3RhbnRzLm1hdHVyYXRpb25SYXRlLmh1bmdyeTtcbiAgICBjb25zdCBnb3REZWFkID0geWVhc3Quc3RhcnZpbmcgKiBjb25zdGFudHMubWF0dXJhdGlvblJhdGUuc3RhcnZpbmc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmZWQ6IHllYXN0LmZlZCAtIGdvdEhhcHB5LFxuICAgICAgICBoYXBweTogZ290SGFwcHkgKyB5ZWFzdC5oYXBweSAtIGdvdFdhaXRpbmcsXG4gICAgICAgIHdhaXRpbmc6IGdvdFdhaXRpbmcgKyB5ZWFzdC53YWl0aW5nIC0gZ290SHVuZ3J5LFxuICAgICAgICBodW5ncnk6IGdvdEh1bmdyeSArIHllYXN0Lmh1bmdyeSAtIGdvdFN0YXJ2aW5nLFxuICAgICAgICBzdGFydmluZzogZ290U3RhcnZpbmcgKyB5ZWFzdC5zdGFydmluZyAtIGdvdERlYWQsXG4gICAgICAgIGRlYWQ6IGdvdERlYWQgKyB5ZWFzdC5kZWFkLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWVkWWVhc3QoYW1vdW50OiBudW1iZXIsIHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICBjb25zdCBmZWVkTWVTZXltb3IgPSB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmc7XG4gICAgaWYgKGZlZWRNZVNleW1vciA+PSBhbW91bnQpIHtcbiAgICAgICAgLy8gTm90IGVub3VnaCBmb29kIHRvIGZlZWQgYWxsIHRoZSByZWFsbHkgaHVuZ3J5IHllYXN0XG4gICAgICAgIGNvbnNvbGUubG9nKCdBJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmZWQ6IHllYXN0LmZlZCArIGFtb3VudCArIGFtb3VudCxcbiAgICAgICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSxcbiAgICAgICAgICAgIHdhaXRpbmc6IHllYXN0LndhaXRpbmcgLSAoeWVhc3Qud2FpdGluZyAvIGZlZWRNZVNleW1vcikgKiBhbW91bnQsXG4gICAgICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSAtICh5ZWFzdC5odW5ncnkgLyBmZWVkTWVTZXltb3IpICogYW1vdW50LFxuICAgICAgICAgICAgc3RhcnZpbmc6IHllYXN0LnN0YXJ2aW5nIC0gKHllYXN0LnN0YXJ2aW5nIC8gZmVlZE1lU2V5bW9yKSAqIGFtb3VudCxcbiAgICAgICAgICAgIGRlYWQ6IHllYXN0LmRlYWQsXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChmZWVkTWVTZXltb3IgKyB5ZWFzdC5oYXBweSA+PSBhbW91bnQpIHtcbiAgICAgICAgLy8gRmVlZGluZyBhbGwgdGhlIHJlYWxseSBodW5ncnkgeWVhc3QsIHBsdXMgc29tZSB0aGUgeWVhc3QgdGhhdCBjb3VsZCBoYXZlIGEgYml0ZVxuICAgICAgICBjb25zb2xlLmxvZygnQicpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmVkOiB5ZWFzdC5mZWQgKyBhbW91bnQgKyBhbW91bnQsXG4gICAgICAgICAgICBoYXBweTogeWVhc3QuaGFwcHkgLSAoYW1vdW50IC0gZmVlZE1lU2V5bW9yKSxcbiAgICAgICAgICAgIHdhaXRpbmc6IDAsXG4gICAgICAgICAgICBodW5ncnk6IDAsXG4gICAgICAgICAgICBzdGFydmluZzogMCxcbiAgICAgICAgICAgIGRlYWQ6IHllYXN0LmRlYWQsXG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU29tZSBmZWVkIGdvZXMgdG8gd2FzdGUgYXMgZGVhZCBtYXRlcmlhbFxuICAgICAgICBjb25zb2xlLmxvZygnQycpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmVkOiB5ZWFzdC5mZWQgKyAoeWVhc3QuaGFwcHkgKyB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmcpICogMixcbiAgICAgICAgICAgIGhhcHB5OiAwLFxuICAgICAgICAgICAgd2FpdGluZzogMCxcbiAgICAgICAgICAgIGh1bmdyeTogMCxcbiAgICAgICAgICAgIHN0YXJ2aW5nOiAwLFxuICAgICAgICAgICAgZGVhZDogeWVhc3QuZGVhZCArIGFtb3VudCAtICh5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZyksXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlRnJhY3Rpb25zKHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICBjb25zdCB0b3RhbCA9IHllYXN0LmZlZCArIHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nICsgeWVhc3QuZGVhZDtcbiAgICByZXR1cm4ge1xuICAgICAgICBmZWQ6IHllYXN0LmZlZCAvIHRvdGFsLFxuICAgICAgICBoYXBweTogeWVhc3QuaGFwcHkgLyB0b3RhbCxcbiAgICAgICAgd2FpdGluZzogeWVhc3Qud2FpdGluZyAvIHRvdGFsLFxuICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSAvIHRvdGFsLFxuICAgICAgICBzdGFydmluZzogeWVhc3Quc3RhcnZpbmcgLyB0b3RhbCxcbiAgICAgICAgZGVhZDogeWVhc3QuZGVhZCAvIHRvdGFsLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdFZvbHVtZSh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICAgIHllYXN0LmZlZCAqIGNvbnN0YW50cy52b2x1bWVNdWx0aXBsaWVyLmZlZCArXG4gICAgICAgIHllYXN0LmhhcHB5ICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIuaGFwcHkgK1xuICAgICAgICB5ZWFzdC53YWl0aW5nICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIud2FpdGluZyArXG4gICAgICAgIHllYXN0Lmh1bmdyeSAqIGNvbnN0YW50cy52b2x1bWVNdWx0aXBsaWVyLmh1bmdyeSArXG4gICAgICAgIHllYXN0LnN0YXJ2aW5nICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIuc3RhcnZpbmcgK1xuICAgICAgICB5ZWFzdC5kZWFkICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIuZGVhZFxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcFllYXN0KG1heFZvbHVtZTogbnVtYmVyLCB5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBbWWVhc3R5R29vZG5lc3MsIG51bWJlcl0ge1xuICAgIGNvbnN0IHZvbHVtZSA9IHllYXN0Vm9sdW1lKHllYXN0KTtcbiAgICBpZiAodm9sdW1lIDw9IG1heFZvbHVtZSkgcmV0dXJuIFt5ZWFzdCwgMF07XG4gICAgY29uc3QgbG9zcyA9ICh2b2x1bWUgLSBtYXhWb2x1bWUpIC8gdm9sdW1lO1xuICAgIHJldHVybiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZlZDogeWVhc3QuZmVkICogKDEgLSBsb3NzKSxcbiAgICAgICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSAqICgxIC0gbG9zcyksXG4gICAgICAgICAgICB3YWl0aW5nOiB5ZWFzdC53YWl0aW5nICogKDEgLSBsb3NzKSxcbiAgICAgICAgICAgIGh1bmdyeTogeWVhc3QuaHVuZ3J5ICogKDEgLSBsb3NzKSxcbiAgICAgICAgICAgIHN0YXJ2aW5nOiB5ZWFzdC5zdGFydmluZyAqICgxIC0gbG9zcyksXG4gICAgICAgICAgICBkZWFkOiB5ZWFzdC5kZWFkICogKDEgLSBsb3NzKSxcbiAgICAgICAgfSxcbiAgICAgICAgdm9sdW1lIC0gbWF4Vm9sdW1lLFxuICAgIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdEFtb3VudCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBudW1iZXIge1xuICAgIHJldHVybiB5ZWFzdC5mZWQgKyB5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZyArIHllYXN0LmRlYWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXZpbmdZZWFzdEFtb3VudCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBudW1iZXIge1xuICAgIHJldHVybiB5ZWFzdC5mZWQgKyB5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVllYXN0KHllYXN0OiBZZWFzdHlHb29kbmVzcywgYW1vdW50OiBudW1iZXIsIGphcnM6IG51bWJlcik6IHsgcmVtYWluaW5nOiBZZWFzdHlHb29kbmVzcywgcmVtb3ZlZDogWWVhc3R5R29vZG5lc3MgfSB8IG51bGwge1xuICAgIGNvbnN0IHRha2VvdXQgPSBNYXRoLmZsb29yKGFtb3VudCk7XG4gICAgY29uc3QgY3VycmVudEFtb3VudCA9IHllYXN0QW1vdW50KHllYXN0KTtcbiAgICBpZiAodGFrZW91dCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKHRha2VvdXQgPiBjdXJyZW50QW1vdW50IC0gamFycykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBjb25zdCB0YWtlb3V0RnJhY3Rpb24gPSB0YWtlb3V0IC8gY3VycmVudEFtb3VudDtcbiAgICBjb25zb2xlLmxvZyhgdGFraW5nIG91dCAke3Rha2VvdXR9LCBmcmFjdGlvbjogJHt0YWtlb3V0RnJhY3Rpb259YCk7XG4gICAgbGV0IHJlbW92ZWQgPSBtYXBZZWFzdCh5ZWFzdCwgKHByb3ApID0+IE1hdGgubWluKHByb3AgKiB0YWtlb3V0RnJhY3Rpb24sIHByb3ApKTtcbiAgICBsZXQgcmVtYWluaW5nID0gc3VidHJhY3RZZWFzdCh5ZWFzdCwgcmVtb3ZlZCk7XG4gICAgLy8gSnVzdCBpbiBjYXNlIHNvbWV0aGluZyB3ZW50IG5lZ2F0aXZlIVxuICAgIHJlbWFpbmluZyA9IG1hcFllYXN0KHJlbWFpbmluZywgKHByb3ApID0+IE1hdGgubWF4KDAsIHByb3ApKTtcbiAgICBjb25zdCByZW1vdmVkQW1vdW50ID0geWVhc3RBbW91bnQocmVtb3ZlZCk7XG4gICAgaWYgKHJlbW92ZWRBbW91bnQgPCB0YWtlb3V0KSB7XG4gICAgICAgIHJlbW92ZWQuZGVhZCA9IHJlbW92ZWRBbW91bnQgLSB0YWtlb3V0O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyZW1vdmVkKTtcbiAgICByZXR1cm4geyByZW1haW5pbmc6IHJlbWFpbmluZywgcmVtb3ZlZDogcmVtb3ZlZCB9O1xufSIsImltcG9ydCB7IFF1ZXVlIH0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XG5cbmV4cG9ydCBjbGFzcyBFdmVudFF1ZXVlIHtcbiAgZXZlbnRzID0gbmV3IFF1ZXVlPHN0cmluZz4oKTtcbiAgZXZlbnRMaXN0ZW5lcnM6IFJlY29yZDxzdHJpbmcsICgoKSA9PiB2b2lkKVtdPiA9IHt9O1xuXG4gIGFkZEV2ZW50KGV2ZW50OiBzdHJpbmcpIHtcbiAgICB0aGlzLmV2ZW50cy5lbnF1ZXVlKGV2ZW50KTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgZjogKCkgPT4gdm9pZCkge1xuICAgIGlmICghdGhpcy5ldmVudExpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgfVxuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdLnB1c2goZik7XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyhldmVudDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgZjogKCkgPT4gdm9pZCkge1xuICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XTtcbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGYsIDApO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc0V2ZW50KGV2ZW50OiBzdHJpbmcpIHtcbiAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5ldmVudExpc3RlbmVyc1tldmVudF07XG4gICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goKHZhbHVlKSA9PiB7IHZhbHVlKCk7IH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyQWxsKCkge1xuICAgIHRoaXMuZXZlbnRzID0gbmV3IFF1ZXVlPHN0cmluZz4oKTtcbiAgfVxuXG4gIHByb2Nlc3NFdmVudHMoKSB7XG4gICAgd2hpbGUgKHRoaXMuZXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucHJvY2Vzc0V2ZW50KHRoaXMuZXZlbnRzLmRlcXVldWUoKSk7XG4gICAgfVxuICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIHllYXN0Vm9sdW1lLFxuICAgIHllYXN0QW1vdW50LFxuICAgIHJlbW92ZVllYXN0LFxuICAgIGh1bmdlcixcbiAgICBoZWFsdGgsXG4gICAgc3RlcFllYXN0LFxuICAgIGNsYW1wWWVhc3QsXG4gICAgZmVlZFllYXN0LFxuICAgIFllYXN0eUdvb2RuZXNzLFxuICAgIGNhbGN1bGF0ZUZyYWN0aW9ucyxcbiAgICBsaXZpbmdZZWFzdEFtb3VudCxcbn0gZnJvbSAnLi9ZZWFzdExvZ2ljJztcblxuaW1wb3J0IHsgRXZlbnRRdWV1ZSB9IGZyb20gXCIuL2V2ZW50c1wiO1xuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSAnLi9pbnZlbnRvcnknO1xuXG5lbnVtIEUge1xuICAgIGZlZWQsIGJha2UsIGFkZEphciwgZ2l2ZWF3YXksIHRocm93YXdheSwgZW50ZXJDb21wZXRpdGlvbiwgdHJhZGVcbn1cblxuY29uc3QgZXZlbnRzID0gbmV3IEV2ZW50UXVldWUoKTtcblxubGV0IGxhc3RFcG9jaE1TOiBudW1iZXIgPSAwO1xubGV0IGVwb2NoSW5NUzogbnVtYmVyID0gMTAwMDtcbmxldCBydW5TdGFydEluTVM6IG51bWJlciA9IDA7XG5jb25zdCBuZXdKYXJWb2x1bWU6IG51bWJlciA9IDMyO1xuXG4vLyBJbml0aWFsaXplXG5sZXQgc3BpbGxhZ2U6IG51bWJlciA9IDA7XG5sZXQgb3ZlblNpemU6IG51bWJlciA9IDE7XG5sZXQgY2FuQmFrZTogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGNhbkdpdmVhd2F5OiBib29sZWFuID0gZmFsc2U7XG5sZXQgY2FuVHJhZGU6IGJvb2xlYW4gPSBmYWxzZTtcbmxldCBqYXJWb2x1bWU6IG51bWJlciA9IDMyO1xubGV0IGdhbWVTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XG5sZXQgZmlsbGVkVm9sdW1lOiBudW1iZXIgPSAwO1xubGV0IHBsYXllckludmVudG9yeSA9IG5ldyBJbnZlbnRvcnkoKTtcbmxldCBwbGF5ZXJQcml6ZTogbnVtYmVyID0gMDtcblxuY2xhc3MgSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSB7XG4gICAgYW1vdW50OiBudW1iZXIgPSAwO1xuICAgIGVwb2Noc1BlclJlZnJlc2g6IG51bWJlciA9IDA7XG4gICAgcmVtYWluaW5nRXBvY2hzOiBudW1iZXIgPSAwO1xuICAgIGluY3JlYXNlUGVyUmVmcmVzaDogbnVtYmVyID0gMDtcbiAgICBsaW1pdDogbnVtYmVyID0gMDtcbiAgICBvbkluY3JlYXNlOiAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihhbW91bnQ6IG51bWJlciwgaW5jcmVhc2VQZXJSZWZyZXNoOiBudW1iZXIsIGVwb2Noc1BlclJlZnJlc2g6IG51bWJlciwgbGltaXQ6IG51bWJlciwgb25JbmNyZWFzZT86ICgoKSA9PiB2b2lkKSkge1xuICAgICAgICB0aGlzLmFtb3VudCA9IGFtb3VudDtcbiAgICAgICAgdGhpcy5lcG9jaHNQZXJSZWZyZXNoID0gZXBvY2hzUGVyUmVmcmVzaDtcbiAgICAgICAgdGhpcy5pbmNyZWFzZVBlclJlZnJlc2ggPSBpbmNyZWFzZVBlclJlZnJlc2g7XG4gICAgICAgIHRoaXMucmVtYWluaW5nRXBvY2hzID0gTWF0aC5tYXgoTWF0aC5mbG9vcihlcG9jaHNQZXJSZWZyZXNoKSwgMSk7XG4gICAgICAgIHRoaXMubGltaXQgPSBsaW1pdDtcbiAgICAgICAgdGhpcy5vbkluY3JlYXNlID0gb25JbmNyZWFzZTtcbiAgICB9XG5cbiAgICBzdGVwKCkge1xuICAgICAgICBjb25zdCBlcHIgPSBNYXRoLm1heChNYXRoLmZsb29yKHRoaXMuZXBvY2hzUGVyUmVmcmVzaCksIDEpO1xuICAgICAgICBjb25zdCBpcHIgPSBNYXRoLm1heChNYXRoLmZsb29yKHRoaXMuaW5jcmVhc2VQZXJSZWZyZXNoKSwgMCk7XG4gICAgICAgIGlmIChpcHIgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1haW5pbmdFcG9jaHMtLTtcbiAgICAgICAgaWYgKHRoaXMucmVtYWluaW5nRXBvY2hzIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5yZW1haW5pbmdFcG9jaHMgPSBlcHI7XG4gICAgICAgICAgICB0aGlzLmFtb3VudCArPSBpcHI7XG4gICAgICAgICAgICBpZiAodGhpcy5hbW91bnQgPiB0aGlzLmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbW91bnQgPSB0aGlzLmxpbWl0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9uSW5jcmVhc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSW5jcmVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxudHlwZSBSZXNvdXJjZXNUeXBlID0ge1xuICAgIHllYXN0OiBZZWFzdHlHb29kbmVzcyxcbiAgICBnb29kOiBudW1iZXIsXG4gICAgYnJlYWQ6IG51bWJlcixcbiAgICBqYXJzOiBudW1iZXIsXG4gICAgbmV3SmFyczogSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSxcbiAgICBmcmllbmRzVG9UcmFkZTogSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSxcbiAgICBjb21wZXRpdGlvbnM6IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2Vcbn07XG5cbmxldCBkZWFkOiBib29sZWFuID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG9uRmluZEphcigpIHtcbiAgICBsZXQgYW5vdGhlckphckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5vdGhlci1qYXJcIik7XG4gICAgaWYgKGFub3RoZXJKYXJCdXR0b24pIHtcbiAgICAgICAgYW5vdGhlckphckJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICB9XG4gICAgYWRkTWVzc2FnZShcIllvdSBmb3VuZCBhbm90aGVyIGphciFcIik7XG59XG5cbmZ1bmN0aW9uIG9uTmV3RnJpZW5kKCkge1xuICAgIGxldCB0cmFkZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhZGVcIik7XG4gICAgaWYgKHRyYWRlQnV0dG9uKSB7XG4gICAgICAgIHRyYWRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgIH1cbiAgICBhZGRNZXNzYWdlKFwiQSBmcmllbmQgYXNrcyBpZiB0aGV5IGNhbiBoYXZlIHNvbWUgb2YgeW91ciBzdGFydGVyLiBUaGV5IG9mZmVyIGEgcHJlc2VudCBpbiByZXR1cm4uXCIpO1xufVxuXG5cbmZ1bmN0aW9uIG9uTmV3Q29tcCgpIHtcbiAgICBsZXQgZW50ZXJDb21wQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnRlci1jb21wZXRpdGlvblwiKTtcbiAgICBpZiAoZW50ZXJDb21wQnV0dG9uKSB7XG4gICAgICAgIGVudGVyQ29tcEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICB9XG4gICAgYWRkTWVzc2FnZShcIllvdSBoZWFyIGFib3V0IGEgYmFraW5nIGNvbXBldGl0aW9uISBZb3UgbmVlZCA1IGxvYXZlcyB0byBlbnRlci5cIik7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRmlyc3RCYWtlKCkge1xuICAgIGlmIChjYW5CYWtlKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoeWVhc3RBbW91bnQoUmVzb3VyY2VzLnllYXN0KSA+PSBSZXNvdXJjZXMuamFycyArIDQgJiYgaGVhbHRoKFJlc291cmNlcy55ZWFzdCkgPj0gLjgpIHtcbiAgICAgICAgb25BbGxvd0Jha2UoKTtcbiAgICB9XG59XG5cbmxldCBSZXNvdXJjZXM6IFJlc291cmNlc1R5cGUgPSB7XG4gICAgeWVhc3Q6IHsgZmVkOiAyLCBoYXBweTogMCwgd2FpdGluZzogMCwgaHVuZ3J5OiAwLCBzdGFydmluZzogMCwgZGVhZDogMSB9LFxuICAgIGdvb2Q6IDAsXG4gICAgYnJlYWQ6IDAsXG4gICAgamFyczogMSxcbiAgICBuZXdKYXJzOiBuZXcgSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSgwLCAxLCAxMjAsIDEpLFxuICAgIGZyaWVuZHNUb1RyYWRlOiBuZXcgSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSgxLCAxLCAzMiwgMSksXG4gICAgY29tcGV0aXRpb25zOiBuZXcgSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSgwLCAxLCAyNDUsIDEpLFxufTtcblxubGV0IHJlc2V0QnV0dG9ucyA9ICgpID0+IHsgfTtcbmxldCBvbkFsbG93QmFrZSA9ICgpID0+IHsgfTtcbmxldCBvbkZpcnN0SmFyID0gKCkgPT4geyB9O1xubGV0IGdvdG9TdGFydCA9ICgpID0+IHsgfTtcbmxldCByZW5kZXJCdXR0b25zID0gKCkgPT4geyB9O1xuXG5mdW5jdGlvbiBpbml0aWFsaXplR2FtZSgpIHtcbiAgICBpZiAoIWdhbWVTdGFydGVkKSB7XG4gICAgICAgIGdhbWVTdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgY3JlYXRlanMuVGlja2VyLmZyYW1lcmF0ZSA9IDMwLjA7XG4gICAgICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgZnVuY3Rpb24gKGV2ZW50T2JqOiBPYmplY3QpIHtcbiAgICAgICAgICAgIGdhbWVMb29wKDxjcmVhdGVqcy5UaWNrZXJFdmVudD5ldmVudE9iaik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtZXNzYWdlcyA9IFtdO1xuICAgIGphclZvbHVtZSA9IDMyO1xuICAgIGZpbGxlZFZvbHVtZSA9IDA7XG4gICAgb3ZlblNpemUgPSAxO1xuICAgIHNwaWxsYWdlID0gMDtcbiAgICBkZWFkID0gZmFsc2U7XG4gICAgY2FuQmFrZSA9IGZhbHNlO1xuICAgIGNhbkdpdmVhd2F5ID0gZmFsc2U7XG4gICAgcGxheWVyUHJpemUgPSAwO1xuICAgIGV2ZW50cy5jbGVhckFsbCgpO1xuICAgIFJlc291cmNlcyA9IHtcbiAgICAgICAgeWVhc3Q6IHsgZmVkOiAyLCBoYXBweTogMCwgd2FpdGluZzogMCwgaHVuZ3J5OiAwLCBzdGFydmluZzogMCwgZGVhZDogMSB9LFxuICAgICAgICBnb29kOiAwLFxuICAgICAgICBicmVhZDogMCxcbiAgICAgICAgamFyczogMSxcbiAgICAgICAgbmV3SmFyczogbmV3IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UoMCwgMSwgMTIwLCAxLCBvbkZpbmRKYXIpLFxuICAgICAgICBmcmllbmRzVG9UcmFkZTogbmV3IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UoMCwgMSwgMzIsIDEsIG9uTmV3RnJpZW5kKSxcbiAgICAgICAgY29tcGV0aXRpb25zOiBuZXcgSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSgwLCAxLCAxODksIDEsIG9uTmV3Q29tcCksXG4gICAgfTtcbiAgICBwbGF5ZXJJbnZlbnRvcnkgPSBuZXcgSW52ZW50b3J5KCk7XG4gICAgcmVzZXRCdXR0b25zKCk7XG4gICAgYWRkTWVzc2FnZShcIlVuZm9ydHVuYXRlbHksIHlvdSBhcmUgc3RhcnRpbmcgZnJvbSBzY3JhdGNoLiBZb3VyIGZyaWVuZCBoYXMgZ2l2ZW4geW91IGEgc3RhcnRlciwgYnV0IHlvdSdsbCBuZWVkIHRvIGZlZWQgaXQuIEhlIHNheXMgdGhhdCBoZSBhbHJlYWR5IGZlZCBpdCBzbyB5b3UgbWlnaHQgd2FudCB0byB3YWl0IGEgYml0LlwiKTtcbiAgICBydW5TdGFydEluTVMgPSBjcmVhdGVqcy5UaWNrZXIuZ2V0VGltZSh0cnVlKTtcbn1cblxubGV0IG1lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xuXG5mdW5jdGlvbiBhZGRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIG1lc3NhZ2VzLnVuc2hpZnQobWVzc2FnZSk7XG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgIG1lc3NhZ2VzLnBvcCgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyTWVzc2FnZXMobWVzc2FnZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJzxwPicgKyBtZXNzYWdlcy5tYXAoKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IGAke3ZhbHVlfWApLmpvaW4oJ1xcbjxicj5cXG4nKSArICc8L3A+J1xufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50KGlkOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZWxlbSkgcmV0dXJuO1xuICAgIGVsZW0uaW5uZXJUZXh0ID0gY29udGVudHM7XG59XG5cbmZ1bmN0aW9uIHNldEVsZW1lbnRIVE1MKGlkOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZWxlbSkgcmV0dXJuO1xuICAgIGVsZW0uaW5uZXJIVE1MID0gY29udGVudHM7XG59XG5cbmZ1bmN0aW9uIHBsYWNlZFRleHQoKTogc3RyaW5nIHtcbiAgICBpZiAocGxheWVyUHJpemUgPCAxKSB7XG4gICAgICAgIHJldHVybiBcIllvdSBuZXZlciBwbGFjZWQgaW4gY29tcGV0aXRpb25cIjtcbiAgICB9IGVsc2UgaWYgKHBsYXllclByaXplID49IDEgJiYgcGxheWVyUHJpemUgPCAyKSB7XG4gICAgICAgIHJldHVybiBcIllvdSByZWFjaGVkIHRoaXJkIHBsYWNlIGluIGNvbXBldGl0aW9uIVwiXG4gICAgfSBlbHNlIGlmIChwbGF5ZXJQcml6ZSA+PSAyICYmIHBsYXllclByaXplIDwgMykge1xuICAgICAgICByZXR1cm4gXCJZb3UgcmVhY2hlZCBzZWNvbmQgcGxhY2UgaW4gY29tcGV0aXRpb24hXCJcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJXb3csIHlvdSByZWFjaGVkIGZpcnN0IHBsYWNlIGluIGNvbXBldGl0aW9uIGFuZCBhY2hpZXZlZCB5b3VyIGdvYWwgb2YgYmVjb21pbmcgYSBtYXN0ZXIgYmFrZXIhXCJcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAvLyBSZW5kZXIgdGhlIGphclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqYXItY2FwYWNpdHknKSEuaW5uZXJUZXh0ID0gJycgKyBqYXJWb2x1bWU7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2phcnMtZmlsbGVkJykhLmlubmVyVGV4dCA9ICcnICsgUmVzb3VyY2VzLmphcnM7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzYWJsZS1zdGFydGVyLWFtb3VudCcpIS5pbm5lclRleHQgPSAnJyArIChNYXRoLnJvdW5kKHllYXN0QW1vdW50KFJlc291cmNlcy55ZWFzdCkpIC0gUmVzb3VyY2VzLmphcnMpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbC1zdGFydGVyLWFtb3VudCcpIS5pbm5lclRleHQgPSAnJyArIE1hdGgucm91bmQoeWVhc3RBbW91bnQoUmVzb3VyY2VzLnllYXN0KSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZWQnKSEuaW5uZXJUZXh0ID0gYCR7TWF0aC5mbG9vcih5ZWFzdFZvbHVtZShSZXNvdXJjZXMueWVhc3QpIC8gamFyVm9sdW1lICogMTAwKX0lYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVuZ2VyJykhLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoaHVuZ2VyKFJlc291cmNlcy55ZWFzdCkgKiAxMDApfSVgO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFsdGgnKSEuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChoZWFsdGgoUmVzb3VyY2VzLnllYXN0KSAqIDEwMCl9JWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXNoLWJyZWFkJykhLmlubmVyVGV4dCA9IGAke1Jlc291cmNlcy5icmVhZH1gO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb29kLXdhc3RlJykhLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoc3BpbGxhZ2UpfWA7XG4gICAgc2V0RWxlbWVudEhUTUwoJ21lc3NhZ2UtbG9nJywgcmVuZGVyTWVzc2FnZXMobWVzc2FnZXMpKTtcbiAgICBzZXRFbGVtZW50KFwicGxhY2UtcmVhY2hlZFwiLCBwbGFjZWRUZXh0KCkpXG4gICAgc2V0RWxlbWVudChcImxvYXZlcy1kb25hdGVkXCIsIFwiXCIgKyBSZXNvdXJjZXMuZ29vZCk7XG5cbiAgICBjb25zdCBmcmFjdGlvbnM6IFllYXN0eUdvb2RuZXNzID0gY2FsY3VsYXRlRnJhY3Rpb25zKFJlc291cmNlcy55ZWFzdCk7XG4gICAgc2V0RWxlbWVudChcbiAgICAgICAgJ2RlYnVnX3F1YW50aXR5JyxcbiAgICAgICAgYCR7XG4gICAgICAgIFJlc291cmNlcy55ZWFzdC5mZWQgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QuaGFwcHkgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3Qud2FpdGluZyArXG4gICAgICAgIFJlc291cmNlcy55ZWFzdC5odW5ncnkgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3Quc3RhcnZpbmcgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QuZGVhZFxuICAgICAgICB9YFxuICAgICk7XG4gICAgcmVuZGVyQnV0dG9ucygpO1xuICAgIHNldEVsZW1lbnQoJ2RlYnVnX2ZlZCcsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLmZlZCAqIDEwMCl9JWApO1xuICAgIHNldEVsZW1lbnQoJ2RlYnVnX2hhcHB5JywgYCR7TWF0aC5yb3VuZChmcmFjdGlvbnMuaGFwcHkgKiAxMDApfSVgKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z193YWl0aW5nJywgYCR7TWF0aC5yb3VuZChmcmFjdGlvbnMud2FpdGluZyAqIDEwMCl9JWApO1xuICAgIHNldEVsZW1lbnQoJ2RlYnVnX2h1bmdyeScsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLmh1bmdyeSAqIDEwMCl9JWApO1xuICAgIHNldEVsZW1lbnQoJ2RlYnVnX3N0YXJ2aW5nJywgYCR7TWF0aC5yb3VuZChmcmFjdGlvbnMuc3RhcnZpbmcgKiAxMDApfSVgKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19kZWFkJywgYCR7TWF0aC5yb3VuZChmcmFjdGlvbnMuZGVhZCAqIDEwMCl9JWApO1xufVxuXG5mdW5jdGlvbiBldm9sdmVSZXNvdXJjZXMoZXBvY2hzOiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVwb2NoczsgaSsrKSB7XG4gICAgICAgIFJlc291cmNlcy55ZWFzdCA9IHN0ZXBZZWFzdChSZXNvdXJjZXMueWVhc3QpO1xuICAgICAgICBSZXNvdXJjZXMubmV3SmFycy5zdGVwKCk7XG4gICAgICAgIFJlc291cmNlcy5mcmllbmRzVG9UcmFkZS5zdGVwKCk7XG4gICAgICAgIFJlc291cmNlcy5jb21wZXRpdGlvbnMuc3RlcCgpO1xuICAgIH1cbiAgICBjaGVja0ZpcnN0QmFrZSgpO1xufVxuXG5mdW5jdGlvbiBnYW1lTG9vcChldmVudDogY3JlYXRlanMuVGlja2VyRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlcG9jaERlbHRhID0gY3JlYXRlanMuVGlja2VyLmdldFRpbWUodHJ1ZSkgLSBsYXN0RXBvY2hNUztcbiAgICBjb25zdCByZXNvdXJjZUVwb2NocyA9IE1hdGguZmxvb3IoZXBvY2hEZWx0YSAvIGVwb2NoSW5NUyk7XG4gICAgZXZlbnRzLnByb2Nlc3NFdmVudHMoKTtcbiAgICBpZiAoIWRlYWQpIHtcbiAgICAgICAgZXZvbHZlUmVzb3VyY2VzKHJlc291cmNlRXBvY2hzKTtcbiAgICB9XG4gICAgaWYgKHJlc291cmNlRXBvY2hzID4gMCkge1xuICAgICAgICBsYXN0RXBvY2hNUyArPSByZXNvdXJjZUVwb2NocyAqIGVwb2NoSW5NUztcbiAgICB9XG4gICAgaWYgKCFkZWFkKSB7XG4gICAgICAgIGlmIChsaXZpbmdZZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpIDwgLjUpIHtcbiAgICAgICAgICAgIGRlYWQgPSB0cnVlO1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdXIgcG9vciB5ZWFzdCBpcyBkZWFkLlwiKVxuICAgICAgICAgICAgb25Mb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWRlYWQpIHtcbiAgICAgICAgY29uc3QgW25ld1llYXN0LCBuZXdTcGlsbF0gPSBjbGFtcFllYXN0KGphclZvbHVtZSwgUmVzb3VyY2VzLnllYXN0KTtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0ID0gbmV3WWVhc3Q7XG4gICAgICAgIGlmIChuZXdTcGlsbCA+IDApIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJPaCBubyEgWW91ciBzdGFydGVyIG92ZXJmbG93ZWQsIGFuZCB5ZWFzdCBpcyBhbGwgb3ZlciB0aGUgZmxvb3IuXCIpXG4gICAgICAgIH1cbiAgICAgICAgc3BpbGxhZ2UgKz0gbmV3U3BpbGw7XG4gICAgfVxuXG4gICAgcmVuZGVyKCk7XG59XG5cbmZ1bmN0aW9uIGFkZEZvb2QoKSB7XG4gICAgY29uc3Qgb2xkSGVhbHRoID0gaGVhbHRoKFJlc291cmNlcy55ZWFzdCk7XG5cbiAgICBSZXNvdXJjZXMueWVhc3QgPSBmZWVkWWVhc3QoMSwgUmVzb3VyY2VzLnllYXN0KTtcbiAgICBjb25zdCBbbmV3WWVhc3QsIG5ld1NwaWxsXSA9IGNsYW1wWWVhc3QoamFyVm9sdW1lLCBSZXNvdXJjZXMueWVhc3QpO1xuICAgIFJlc291cmNlcy55ZWFzdCA9IG5ld1llYXN0O1xuICAgIHNwaWxsYWdlICs9IG5ld1NwaWxsO1xuICAgIGNvbnN0IG5ld0hlYWx0aCA9IGhlYWx0aChSZXNvdXJjZXMueWVhc3QpO1xuICAgIGlmIChuZXdIZWFsdGggPiBvbGRIZWFsdGgpIHtcbiAgICAgICAgYWRkTWVzc2FnZSgnWW91IGZlZCB5b3VyIHNvdXJkb3VnaCBzdGFydGVyLCBhbmQgaXQgbG9va3MgYmV0dGVyIScpO1xuICAgIH0gZWxzZSBpZiAobmV3SGVhbHRoID09IG9sZEhlYWx0aCkge1xuICAgICAgICBhZGRNZXNzYWdlKCdZb3UgZmVkIHlvdXIgc291cmRvdWdoIHN0YXJ0ZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhZGRNZXNzYWdlKCdZb3UgZmVkIHlvdXIgc291cmRvdWdoIHN0YXJ0ZXIsIGJ1dCB5b3UgdGhpbmsgeW91IG1pZ2h0IGhhdmUgb3ZlcmZlZCBpdC4uLicpO1xuICAgIH1cbn1cblxubGV0IG9uTG9zZSA9ICgpID0+IHsgfTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBsZXQgZ2FtZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XG4gICAgZ2FtZURpdiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGxldCBpbnZlbnRvcnlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImludmVudG9yeVwiKTtcbiAgICBpbnZlbnRvcnlEaXYhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAvLyBBZGQgYnV0dG9uIGNsaWNrIGxpc3RlbmVyc1xuICAgIGxldCBhZGRGb29kQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1mb29kJyk7XG4gICAgYWRkRm9vZEJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS5mZWVkXSk7XG4gICAgfVxuICAgIGxldCBvbkFkZEZvb2QgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0cnlpbmcgdG8gYWRkIGZvb2QnKTtcbiAgICAgICAgYWRkRm9vZCgpO1xuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmZlZWRdLCBvbkFkZEZvb2QpO1xuXG4gICAgLyogYWxsIGFjdGlvbnMgYmVsb3cgKGN1cnJlbnRseSA1IC0gYmFrZSAvIGFub3RoZXItamFyIC8gdHJhZGUgLyBnYSAvIHRhKVxuICBuZWVkIHRvIGRlY3JlYXNlIHRoZSB2b2x1bWUgYnkgNTAlXG4gICovXG4gICAgZnVuY3Rpb24gZW5vdWdoVG9CYWtlKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICBsZXQgbG9hdmVzID0gTWF0aC5mbG9vcihNYXRoLm1pbih5ZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpIC0gUmVzb3VyY2VzLmphcnMsIDQgKiBvdmVuU2l6ZSkgLyA0KTtcbiAgICAgICAgaWYgKGxvYXZlcyA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2F2ZXM7XG4gICAgfVxuICAgIGxldCBiYWtlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWtlXCIpO1xuICAgIGZ1bmN0aW9uIG9uQmFrZSgpIHtcbiAgICAgICAgaWYgKCFjYW5CYWtlKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGRvbid0IGhhdmUgYSBicmVhZCByZWNpcGUgeWV0ISBIb3cgZGlkIHlvdSBldmVuIGhpdCB0aGlzIGJ1dHRvbj8/P1wiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBsb2F2ZXMgPSBlbm91Z2hUb0Jha2UoKTtcbiAgICAgICAgaWYgKCFsb2F2ZXMpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJUaGVyZSdzIG5vdCBlbm91Z2ggeWVhc3QgdG8gYmFrZSB3aXRoIVwiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCB5ZWFzdExvc3QgPSBsb2F2ZXMgKiA0O1xuICAgICAgICBsZXQgcmVzdWx0ID0gcmVtb3ZlWWVhc3QoUmVzb3VyY2VzLnllYXN0LCB5ZWFzdExvc3QsIFJlc291cmNlcy5qYXJzKTtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJUaGVyZSdzIG5vdCBlbm91Z2ggeWVhc3QgdG8gYmFrZSB3aXRoIVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBSZXNvdXJjZXMueWVhc3QgPSByZXN1bHQucmVtYWluaW5nO1xuICAgICAgICBpZiAoaGVhbHRoKHJlc3VsdC5yZW1vdmVkKSA8IDAuOCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHRyaWVkIHRvIGJha2Ugd2l0aCAke2hlYWx0aChyZXN1bHQucmVtb3ZlZCl9YCk7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IHRyaWVkIHRvIGJha2Ugd2l0aCB0aGUgeWVhc3QgYnV0IGl0IHR1cm5lZCBvdXQgdGVycmlibGUhXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2F2ZXMgPiAxKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKGBZb3UgYmFrZWQgJHtsb2F2ZXN9IGRlbGljaW91cyBsb2F2ZXMgb2YgYnJlYWQhYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKGBZb3UgYmFrZWQgYSBkZWxpY2lvdXMgbG9hZiBvZiBicmVhZCFgKTtcbiAgICAgICAgfVxuICAgICAgICBjYW5HaXZlYXdheSA9IHRydWU7XG4gICAgICAgIGxldCBnaXZlYXdheUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2l2ZWF3YXlcIik7XG4gICAgICAgIGlmIChnaXZlYXdheUJ1dHRvbikge1xuICAgICAgICAgICAgZ2l2ZWF3YXlCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgIH1cbiAgICAgICAgUmVzb3VyY2VzLmJyZWFkICs9IGxvYXZlcztcbiAgICB9XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmJha2VdLCBvbkJha2UpO1xuICAgIGJha2VCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGV2ZW50cy5hZGRFdmVudChFW0UuYmFrZV0pO1xuICAgIH07XG5cbiAgICBsZXQgYW5vdGhlckphckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5vdGhlci1qYXJcIik7XG4gICAgZnVuY3Rpb24gb25BZGRKYXIoKSB7XG4gICAgICAgIGlmIChSZXNvdXJjZXMubmV3SmFycy5hbW91bnQgPCAxKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiRHJhdCEgWW91IGNhbid0IGZpbmQgYW55IG1vcmUgamFycyByaWdodCBub3cuXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHllYXN0Vm9sdW1lKFJlc291cmNlcy55ZWFzdCkgPiBSZXNvdXJjZXMuamFycyArIDEpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3Ugc2Nvb3Agc29tZSBzdGFydGVyIGZyb20gZWFjaCBvZiB5b3VyIGphcnMgYW5kIHB1dCBpdCBpbiBhIG5ldyBqYXIhXCIpO1xuICAgICAgICAgICAgUmVzb3VyY2VzLmphcnMrKztcbiAgICAgICAgICAgIFJlc291cmNlcy5uZXdKYXJzLmFtb3VudC0tO1xuICAgICAgICAgICAgamFyVm9sdW1lICs9IDMyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIlRoZXJlIGlzbid0IGVub3VnaCB5ZWFzdCB0byBtb3ZlIGludG8gYSBuZXcgamFyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTcGFjZSBsZWZ0IGluIGphciBpbmNyZWFzZXMgYnkgMTAyNCAoamFyIGNhcGFjaXR5KVxuICAgICAgICAvLyAlIEhlYWx0aCBpbmNyZWFzZXNcbiAgICB9XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmFkZEphcl0sIG9uQWRkSmFyKTtcbiAgICBhbm90aGVySmFyQnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBldmVudHMuYWRkRXZlbnQoRVtFLmFkZEphcl0pO1xuICAgIH07XG5cblxuXG4gICAgbGV0IHRyYWRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFkZVwiKTtcbiAgICB0cmFkZUJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS50cmFkZV0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gZW5vdWdoVG9UcmFkZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgbGV0IHRyYWRlQW1vdW50ID0gTWF0aC5mbG9vcihNYXRoLm1pbih5ZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpIC0gUmVzb3VyY2VzLmphcnMsIDQpKTtcbiAgICAgICAgaWYgKHRyYWRlQW1vdW50IDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYWRlQW1vdW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblRyYWRlKCkge1xuICAgICAgICBsZXQgdHJhZGVBbW91bnQgPSBlbm91Z2hUb1RyYWRlKClcbiAgICAgICAgaWYgKCF0cmFkZUFtb3VudCkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBkb24ndCBoYXZlIGVub3VnaCBzdGFydGVyIHRvIHRyYWRlIGF3YXkuXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9IHJlbW92ZVllYXN0KFJlc291cmNlcy55ZWFzdCwgdHJhZGVBbW91bnQsIFJlc291cmNlcy5qYXJzKTtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RhcnRlciB0byB0cmFkZSBhd2F5LlwiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFJlc291cmNlcy55ZWFzdCA9IHJlc3VsdC5yZW1haW5pbmc7XG4gICAgICAgIFJlc291cmNlcy5mcmllbmRzVG9UcmFkZS5hbW91bnQtLTtcbiAgICAgICAgaWYgKGhlYWx0aChyZXN1bHQucmVtb3ZlZCkgPCAuNykge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdXIgZnJpZW5kIHJlcG9ydHMgdGhhdCB0aGUgc3RhcnRlciB3b3VsZG4ndCBncm93IGZvciB0aGVtIGFuZCBkb2Vzbid0IGdpdmUgeW91IGFueXRoaW5nLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGludmVudG9yeURpdiEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5ZXJJbnZlbnRvcnkuYWRkTmV3SXRlbSgpO1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IHRyYWRlIHlvdXIgZnJpZW5kIHNvbWUgc3RhcnRlciBmb3IgXCIgKyBpdGVtKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJJbnZlbnRvcnkucmVuZGVyKFwiaXRlbS1saXN0XCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91ciBmcmllbmQgYWNjZXB0cyB0aGUgc3RhcnRlciBidXQgbGllZCBhbmQgZG9lc24ndCBoYXZlIGFueXRoaW5nIHRvIGdpdmUgeW91LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBldmVudHMuYWRkRXZlbnRMaXN0ZW5lcihFW0UudHJhZGVdLCBvblRyYWRlKTtcblxuICAgIGZ1bmN0aW9uIGVub3VnaEZvckNvbXAoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIGlmIChSZXNvdXJjZXMuYnJlYWQgPj0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCBlbnRlckNvbXBldGl0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnRlci1jb21wZXRpdGlvblwiKTtcbiAgICBlbnRlckNvbXBldGl0aW9uQnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBldmVudHMuYWRkRXZlbnQoRVtFLmVudGVyQ29tcGV0aXRpb25dKTtcbiAgICB9O1xuICAgIGxldCBvbkVudGVyQ29tcGV0aXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBlbnRlckNvbXBBbW91bnQgPSBlbm91Z2hGb3JDb21wKCk7XG4gICAgICAgIGlmICghZW50ZXJDb21wQW1vdW50KSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGJyZWFkIHRvIGVudGVyIGludG8gdGhlIGNvbXBldGl0aW9uLiBZb3UgbmVlZCA1IGxvYXZlcy5cIik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBSZXNvdXJjZXMuYnJlYWQgLT0gNTtcbiAgICAgICAgaWYgKHBsYXllckludmVudG9yeS5iYWtpbmdJdGVtcy5sZW5ndGggPT0gNCkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBlbnRlcmVkIHRoZSBjb21wZXRpdGlvbiBhbmQgd29uIDNyZCBwbGFjZSFcIilcbiAgICAgICAgICAgIHBsYXllclByaXplID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJJbnZlbnRvcnkuYmFraW5nSXRlbXMubGVuZ3RoID09IDUpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZW50ZXJlZCB0aGUgY29tcGV0aXRpb24gYW5kIHdvbiAybmQgcGxhY2UhXCIpXG4gICAgICAgICAgICBwbGF5ZXJQcml6ZSA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVySW52ZW50b3J5LmJha2luZ0l0ZW1zLmxlbmd0aCA9PSA2KSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGVudGVyZWQgdGhlIGNvbXBldGl0aW9uIGFuZCB3b24gMXN0IHBsYWNlIVwiKVxuICAgICAgICAgICAgcGxheWVyUHJpemUgPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBlbnRlcmVkIHRoZSBjb21wZXRpdGlvbiBidXQgZGlkbid0IHBsYWNlLi4uIDooIE1heWJlIHlvdSBuZWVkIHNvbWUgbW9yZSB0b29scyB0byBtYWtlIHlvdXIgYnJlYWQgYmV0dGVyIVwiKVxuICAgICAgICAgICAgcGxheWVyUHJpemUgPSAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBldmVudHMuYWRkRXZlbnRMaXN0ZW5lcihFW0UuZW50ZXJDb21wZXRpdGlvbl0sIG9uRW50ZXJDb21wZXRpdGlvbik7XG5cbiAgICBsZXQgZ2l2ZWF3YXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdmVhd2F5XCIpO1xuICAgIGdpdmVhd2F5QnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBldmVudHMuYWRkRXZlbnQoRVtFLmdpdmVhd2F5XSk7XG4gICAgfTtcbiAgICBsZXQgb25HaXZlYXdheSA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFjYW5HaXZlYXdheSkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIldoeSBkbyB5b3UgdGhpbmsgeW91IGNhbiBnaXZlIGF3YXkgYnJlYWQgdGhhdCB5b3UgZG9uJ3QgaGF2ZT8gSG93IGRpZCB5b3UgZXZlbiBjbGljayB0aGlzIGJ1dHRvbj8/P1wiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChSZXNvdXJjZXMuYnJlYWQgPCAxKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGRvbid0IGhhdmUgYW55IGJyZWFkIHRvIGdpdmUgYXdheS5cIik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBSZXNvdXJjZXMuZ29vZCArPSBSZXNvdXJjZXMuYnJlYWQ7XG4gICAgICAgIFJlc291cmNlcy5icmVhZCA9IDA7XG4gICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZ2l2ZSBhd2F5IHlvdXIgYnJlYWQgdG8geW91ciBsb2NhbCBtaWRkbGUgc2Nob29sLiBUaGV5IHVzZSBpdCBpbiBhIGJha2Ugc2FsZS5cIik7XG4gICAgfTtcbiAgICBldmVudHMuYWRkRXZlbnRMaXN0ZW5lcihFW0UuZ2l2ZWF3YXldLCBvbkdpdmVhd2F5KTtcblxuICAgIGxldCB0aHJvd2F3YXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRocm93YXdheVwiKTtcbiAgICB0aHJvd2F3YXlCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGV2ZW50cy5hZGRFdmVudChFW0UudGhyb3dhd2F5XSk7XG4gICAgfTtcbiAgICBsZXQgb25UaHJvd2F3YXkgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHllYXN0TG9zdCA9IGhhbGYoeWVhc3RBbW91bnQoUmVzb3VyY2VzLnllYXN0KSk7XG4gICAgICAgIGxldCByZXN1bHQgPSByZW1vdmVZZWFzdChSZXNvdXJjZXMueWVhc3QsIHllYXN0TG9zdCwgUmVzb3VyY2VzLmphcnMpO1xuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIlRoZXJlJ3Mgbm90IGVub3VnaCB5ZWFzdCB0byB0aHJvdyBhd2F5IGFuZCBzdGlsbCBrZWVwIGVub3VnaCBmb3IgZ3Jvd2luZy5cIik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBzcGlsbGFnZSArPSB5ZWFzdExvc3Q7XG4gICAgICAgIFJlc291cmNlcy55ZWFzdCA9IHJlc3VsdC5yZW1haW5pbmc7XG4gICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgdGhyZXcgYXdheSBoYWxmIG9mIHlvdXIgc3RhcnRlciFcIik7XG4gICAgfTtcbiAgICBldmVudHMuYWRkRXZlbnRMaXN0ZW5lcihFW0UudGhyb3dhd2F5XSwgb25UaHJvd2F3YXkpO1xuICAgIGxldCBzcGxhc2hTY3JlZW5EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BsYXNoLXNjcmVlbicpO1xuICAgIHNwbGFzaFNjcmVlbkRpdiEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBsZXQgcGxheUFnYWluQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5LWFnYWluXCIpO1xuICAgIHBsYXlBZ2FpbkJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZ290b1N0YXJ0KCk7XG4gICAgfTtcblxuICAgIGdvdG9TdGFydCA9ICgpID0+IHtcbiAgICAgICAgc3BsYXNoU2NyZWVuRGl2IS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBnYW1lRGl2IS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGludmVudG9yeURpdiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cblxuICAgIHJlc2V0QnV0dG9ucyA9ICgpID0+IHtcbiAgICAgICAgdGhyb3dhd2F5QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICAgICAgZ2l2ZWF3YXlCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYW5vdGhlckphckJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBiYWtlQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFkZEZvb2RCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICB0cmFkZUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBlbnRlckNvbXBldGl0aW9uQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHNwbGFzaFNjcmVlbkRpdiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBnYW1lRGl2IS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBpbnZlbnRvcnlEaXYhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9O1xuICAgIG9uQWxsb3dCYWtlID0gKCkgPT4ge1xuICAgICAgICBjYW5CYWtlID0gdHJ1ZTtcbiAgICAgICAgYmFrZUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgIGFkZE1lc3NhZ2UoXCJZb3VyIHBhcmVudHMgY2FsbCBhbmQgZ2l2ZSB5b3UgYSBkZWxpY2lvdXMgYnJlYWQgcmVjaXBlLlwiKTtcbiAgICB9XG5cbiAgICByZW5kZXJCdXR0b25zID0gKCkgPT4ge1xuICAgICAgICBpZiAoUmVzb3VyY2VzLm5ld0phcnMuYW1vdW50ID4gMCkge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5hbm90aGVySmFyQnV0dG9uKSEuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+YW5vdGhlckphckJ1dHRvbikhLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5vdWdoVG9CYWtlKCkpIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+YmFrZUJ1dHRvbikhLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmJha2VCdXR0b24pIS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFJlc291cmNlcy5icmVhZCA+IDApIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+Z2l2ZWF3YXlCdXR0b24pIS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5naXZlYXdheUJ1dHRvbikhLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5vdWdoVG9UcmFkZSgpKSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PnRyYWRlQnV0dG9uKSEuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+YmFrZUJ1dHRvbikhLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5vdWdoRm9yQ29tcCgpKSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmVudGVyQ29tcGV0aXRpb25CdXR0b24pIS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5lbnRlckNvbXBldGl0aW9uQnV0dG9uKSEuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Mb3NlID0gKCkgPT4ge1xuICAgICAgICB0aHJvd2F3YXlCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZ2l2ZWF3YXlCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYW5vdGhlckphckJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBiYWtlQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFkZEZvb2RCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdHJhZGVCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZW50ZXJDb21wZXRpdGlvbkJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBldmVudHMuY2xlYXJBbGwoKTtcbiAgICB9O1xuXG5cbiAgICBsZXQgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LWdhbWUnKTtcbiAgICBzdGFydEdhbWVCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGluaXRpYWxpemVHYW1lKCk7XG4gICAgICAgICg8SFRNTEF1ZGlvRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmctbXVzaWMnKSkhLnBsYXkoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhbGYoYW1vdW50OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGFtb3VudCAvIDIpXG59XG4iLCJjb25zdCByYW5kb21JdGVtc1NldDogc3RyaW5nW10gPSBbXG4gIFwiYW4gb2xkIHNob2VcIixcbiAgXCJhIGZyb2dcIixcbiAgXCJhIHBvbWVncmFuYXRlXCIsXG4gIFwidGhlIEhpdGNoaGlrZXIncyBHdWlkZSB0byB0aGUgR2FsYXh5XCIsXG4gIFwiYSBnYWdnbGUgb2YgZ2Vlc2VcIixcbiAgXCJhIGZydWl0IHJvbGx1cFwiLFxuICBcImEgbWFya2VyXCIsXG4gIFwiYSBiYWcgb2YgcGVhbnV0c1wiLFxuXTtcblxuY29uc3QgYmFraW5nSXRlbXNTZXQ6IHN0cmluZ1tdID0gW1xuICBcImEgYmFrZXIncyBoYXRcIixcbiAgXCJhbiBhcHJvblwiLFxuICBcImEgcm9sbGluZyBwaW5cIixcbiAgXCJhIHRoZXJtb21ldGVyXCIsXG4gIFwiYSBraXRjaGVuIHRpbWVyXCIsXG4gIFwib3ZlbiBtaXR0c1wiLFxuXTtcblxuZXhwb3J0IGNsYXNzIEludmVudG9yeSB7XG4gIGJha2luZ0l0ZW1zUmVtYWluaW5nOiBzdHJpbmdbXTtcbiAgYmFraW5nSXRlbXM6IHN0cmluZ1tdO1xuICByYW5kb21JdGVtc1JlbWFpbmluZzogc3RyaW5nW107XG4gIHJhbmRvbUl0ZW1zOiBzdHJpbmdbXTtcbiAgaXRlbXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYmFraW5nSXRlbXNSZW1haW5pbmcgPSBiYWtpbmdJdGVtc1NldC5tYXAoKHZhbHVlLCBpbmRleCkgPT4gdmFsdWUpO1xuICAgIHRoaXMuYmFraW5nSXRlbXMgPSBbXTtcbiAgICB0aGlzLnJhbmRvbUl0ZW1zUmVtYWluaW5nID0gcmFuZG9tSXRlbXNTZXQubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlKTtcbiAgICB0aGlzLnJhbmRvbUl0ZW1zID0gW107XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgY2FuQWRkTmV3SXRlbSgpOiBib29sZWFuIHtcbiAgICBsZXQgaXRlbXNSZWNlaXZlZCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIHJldHVybiBpdGVtc1JlY2VpdmVkICE9IHJhbmRvbUl0ZW1zU2V0Lmxlbmd0aCArIGJha2luZ0l0ZW1zU2V0Lmxlbmd0aFxuICB9XG5cbiAgZ2V0QWxsSXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlKTtcbiAgfVxuXG4gIGFkZE5ld0l0ZW0oKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLmNhbkFkZE5ld0l0ZW0oKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgbGV0IGl0ZW1zUmVjZWl2ZWQgPSB0aGlzLmJha2luZ0l0ZW1zLmxlbmd0aCArIHRoaXMucmFuZG9tSXRlbXMubGVuZ3RoICsgMTtcbiAgICBsZXQgZ2V0QmFraW5nSXRlbVRocmVzaG9sZCA9ICh0aGlzLmJha2luZ0l0ZW1zLmxlbmd0aCAvIGl0ZW1zUmVjZWl2ZWQpO1xuICAgIGxldCByZWNlaXZlZCA9IFwiXCI7XG4gICAgbGV0IHJhbmRJdGVtID0gTWF0aC5yYW5kb20oKTtcbiAgICBpZiAodGhpcy5iYWtpbmdJdGVtc1JlbWFpbmluZy5sZW5ndGggPiAwICYmICh0aGlzLnJhbmRvbUl0ZW1zUmVtYWluaW5nLmxlbmd0aCA9PSAwIHx8IHJhbmRJdGVtID4gZ2V0QmFraW5nSXRlbVRocmVzaG9sZCkpIHtcbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYmFraW5nSXRlbXNSZW1haW5pbmcubGVuZ3RoKTtcbiAgICAgIHJlY2VpdmVkID0gdGhpcy5iYWtpbmdJdGVtc1JlbWFpbmluZ1tpdGVtSW5kZXhdO1xuICAgICAgdGhpcy5iYWtpbmdJdGVtc1JlbWFpbmluZy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcbiAgICAgIHRoaXMuYmFraW5nSXRlbXMucHVzaChyZWNlaXZlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMucmFuZG9tSXRlbXNSZW1haW5pbmcubGVuZ3RoKTtcbiAgICAgIHJlY2VpdmVkID0gdGhpcy5yYW5kb21JdGVtc1JlbWFpbmluZ1tpdGVtSW5kZXhdO1xuICAgICAgdGhpcy5yYW5kb21JdGVtc1JlbWFpbmluZy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcbiAgICAgIHRoaXMucmFuZG9tSXRlbXMucHVzaChyZWNlaXZlZCk7XG4gICAgfVxuICAgIHRoaXMuaXRlbXMucHVzaChyZWNlaXZlZCk7XG5cbiAgICByZXR1cm4gcmVjZWl2ZWQ7XG4gIH07XG5cbiAgcmVuZGVyKGVsZW06IHN0cmluZykge1xuICAgIGxldCBpdGVtTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW0pXG4gICAgaWYgKCFpdGVtTGlzdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGl0ZW1MaXN0LmlubmVySFRNTCA9IFwiPGxpPlwiICsgdGhpcy5pdGVtcy5qb2luKFwiPC9saT48bGk+XCIpICsgXCI8L2xpPlwiO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==