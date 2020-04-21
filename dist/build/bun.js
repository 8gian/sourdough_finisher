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
        friendsToTrade: new IntegralRefillingResource(0, 1, 3, 1, onNewFriend),
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
        let randItem = Math.random();
        if (this.randomItemsRemaining.length == 0 || randItem > getBakingItemThreshold) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtlZC1saXN0LXR5cGVzY3JpcHQvbGliL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVldWUtdHlwZXNjcmlwdC9saWIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ZZWFzdExvZ2ljLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7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LE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDdkUsQ0FBQztDQUNGO0FBdkRELDhCQXVEQyIsImZpbGUiOiJidWlsZC9idW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBMaW5rZWRMaXN0IHtcbiAgICBjb25zdHJ1Y3RvciguLi52YWx1ZXMpIHtcbiAgICAgICAgdGhpcy5faGVhZCA9IHRoaXMuX3RhaWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9sZW5ndGggPSAwO1xuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgICppdGVyYXRvcigpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gdGhpcy5faGVhZDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnRJdGVtKSB7XG4gICAgICAgICAgICB5aWVsZCBjdXJyZW50SXRlbS52YWx1ZTtcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gY3VycmVudEl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlcmF0b3IoKTtcbiAgICB9XG4gICAgZ2V0IGhlYWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkID8gdGhpcy5faGVhZC52YWx1ZSA6IG51bGw7XG4gICAgfVxuICAgIGdldCB0YWlsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFpbCA/IHRoaXMuX3RhaWwudmFsdWUgOiBudWxsO1xuICAgIH1cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xuICAgIH1cbiAgICAvLyBBZGRzIHRoZSBlbGVtZW50IGF0IGEgc3BlY2lmaWMgcG9zaXRpb24gaW5zaWRlIHRoZSBsaW5rZWQgbGlzdFxuICAgIGluc2VydCh2YWwsIHByZXZpb3VzSXRlbSwgY2hlY2tEdXBsaWNhdGVzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGNoZWNrRHVwbGljYXRlcyAmJiB0aGlzLmlzRHVwbGljYXRlKHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3SXRlbSA9IG5ldyBMaW5rZWRMaXN0SXRlbSh2YWwpO1xuICAgICAgICBsZXQgY3VycmVudEl0ZW0gPSB0aGlzLl9oZWFkO1xuICAgICAgICBpZiAoIWN1cnJlbnRJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS52YWx1ZSA9PT0gcHJldmlvdXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW0ubmV4dCA9IGN1cnJlbnRJdGVtLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW0ucHJldiA9IGN1cnJlbnRJdGVtO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5uZXh0ID0gbmV3SXRlbTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0l0ZW0ubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SXRlbS5uZXh0LnByZXYgPSBuZXdJdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbCA9IG5ld0l0ZW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGVuZ3RoKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gY3VycmVudEl0ZW0ubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbid0IGxvY2F0ZSBwcmV2aW91c0l0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBBZGRzIHRoZSBlbGVtZW50IGF0IHRoZSBlbmQgb2YgdGhlIGxpbmtlZCBsaXN0XG4gICAgYXBwZW5kKHZhbCwgY2hlY2tEdXBsaWNhdGVzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGNoZWNrRHVwbGljYXRlcyAmJiB0aGlzLmlzRHVwbGljYXRlKHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3SXRlbSA9IG5ldyBMaW5rZWRMaXN0SXRlbSh2YWwpO1xuICAgICAgICBpZiAoIXRoaXMuX3RhaWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gbmV3SXRlbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG5ld0l0ZW07XG4gICAgICAgICAgICBuZXdJdGVtLnByZXYgPSB0aGlzLl90YWlsO1xuICAgICAgICAgICAgdGhpcy5fdGFpbCA9IG5ld0l0ZW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGVuZ3RoKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBBZGQgdGhlIGVsZW1lbnQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlua2VkIGxpc3RcbiAgICBwcmVwZW5kKHZhbCwgY2hlY2tEdXBsaWNhdGVzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGNoZWNrRHVwbGljYXRlcyAmJiB0aGlzLmlzRHVwbGljYXRlKHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3SXRlbSA9IG5ldyBMaW5rZWRMaXN0SXRlbSh2YWwpO1xuICAgICAgICBpZiAoIXRoaXMuX2hlYWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gbmV3SXRlbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld0l0ZW0ubmV4dCA9IHRoaXMuX2hlYWQ7XG4gICAgICAgICAgICB0aGlzLl9oZWFkLnByZXYgPSBuZXdJdGVtO1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IG5ld0l0ZW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGVuZ3RoKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZW1vdmUodmFsKSB7XG4gICAgICAgIGxldCBjdXJyZW50SXRlbSA9IHRoaXMuX2hlYWQ7XG4gICAgICAgIGlmICghY3VycmVudEl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudEl0ZW0udmFsdWUgPT09IHZhbCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZCA9IGN1cnJlbnRJdGVtLm5leHQ7XG4gICAgICAgICAgICB0aGlzLl9oZWFkLnByZXYgPSBudWxsO1xuICAgICAgICAgICAgY3VycmVudEl0ZW0ubmV4dCA9IGN1cnJlbnRJdGVtLnByZXYgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbGVuZ3RoLS07XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEl0ZW0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS52YWx1ZSA9PT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS5uZXh0KSB7IC8vIHNwZWNpYWwgY2FzZSBmb3IgbGFzdCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5wcmV2Lm5leHQgPSBjdXJyZW50SXRlbS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0ubmV4dC5wcmV2ID0gY3VycmVudEl0ZW0ucHJldjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLm5leHQgPSBjdXJyZW50SXRlbS5wcmV2ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLnByZXYubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWlsID0gY3VycmVudEl0ZW0ucHJldjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLm5leHQgPSBjdXJyZW50SXRlbS5wcmV2ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sZW5ndGgtLTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gY3VycmVudEl0ZW0ubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVIZWFkKCkge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW0gPSB0aGlzLl9oZWFkO1xuICAgICAgICAvLyBlbXB0eSBsaXN0XG4gICAgICAgIGlmICghY3VycmVudEl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBzaW5nbGUgaXRlbSBsaXN0XG4gICAgICAgIGlmICghdGhpcy5faGVhZC5uZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBudWxsO1xuICAgICAgICAgICAgLy8gZnVsbCBsaXN0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQucHJldiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9oZWFkID0gdGhpcy5faGVhZC5uZXh0O1xuICAgICAgICAgICAgY3VycmVudEl0ZW0ubmV4dCA9IGN1cnJlbnRJdGVtLnByZXYgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xlbmd0aC0tO1xuICAgICAgICByZXR1cm4gY3VycmVudEl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHJlbW92ZVRhaWwoKSB7XG4gICAgICAgIGxldCBjdXJyZW50SXRlbSA9IHRoaXMuX3RhaWw7XG4gICAgICAgIC8vIGVtcHR5IGxpc3RcbiAgICAgICAgaWYgKCFjdXJyZW50SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNpbmdsZSBpdGVtIGxpc3RcbiAgICAgICAgaWYgKCF0aGlzLl90YWlsLnByZXYpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fdGFpbCA9IG51bGw7XG4gICAgICAgICAgICAvLyBmdWxsIGxpc3RcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwucHJldi5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3RhaWwgPSB0aGlzLl90YWlsLnByZXY7XG4gICAgICAgICAgICBjdXJyZW50SXRlbS5uZXh0ID0gY3VycmVudEl0ZW0ucHJldiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGVuZ3RoLS07XG4gICAgICAgIHJldHVybiBjdXJyZW50SXRlbS52YWx1ZTtcbiAgICB9XG4gICAgZmlyc3QobnVtKSB7XG4gICAgICAgIGxldCBpdGVyID0gdGhpcy5pdGVyYXRvcigpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBuID0gTWF0aC5taW4obnVtLCB0aGlzLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdmFsID0gaXRlci5uZXh0KCk7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh2YWwudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpc107XG4gICAgfVxuICAgIGlzRHVwbGljYXRlKHZhbCkge1xuICAgICAgICBsZXQgc2V0ID0gbmV3IFNldCh0aGlzLnRvQXJyYXkoKSk7XG4gICAgICAgIHJldHVybiBzZXQuaGFzKHZhbCk7XG4gICAgfVxufVxuZXhwb3J0cy5MaW5rZWRMaXN0ID0gTGlua2VkTGlzdDtcbmNsYXNzIExpbmtlZExpc3RJdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgICAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2ID0gbnVsbDtcbiAgICB9XG59XG5leHBvcnRzLkxpbmtlZExpc3RJdGVtID0gTGlua2VkTGlzdEl0ZW07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGxpbmtlZF9saXN0X3R5cGVzY3JpcHRfMSA9IHJlcXVpcmUoXCJsaW5rZWQtbGlzdC10eXBlc2NyaXB0XCIpO1xuY2xhc3MgUXVldWUgZXh0ZW5kcyBsaW5rZWRfbGlzdF90eXBlc2NyaXB0XzEuTGlua2VkTGlzdCB7XG4gICAgY29uc3RydWN0b3IoLi4udmFsdWVzKSB7XG4gICAgICAgIHN1cGVyKC4uLnZhbHVlcyk7XG4gICAgfVxuICAgIGdldCBmcm9udCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZDtcbiAgICB9XG4gICAgZW5xdWV1ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQodmFsKTtcbiAgICB9XG4gICAgZGVxdWV1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlSGVhZCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuUXVldWUgPSBRdWV1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCBpbnRlcmZhY2UgWWVhc3R5R29vZG5lc3Mge1xuICAgIGZlZDogbnVtYmVyO1xuICAgIGhhcHB5OiBudW1iZXI7XG4gICAgd2FpdGluZzogbnVtYmVyO1xuICAgIGh1bmdyeTogbnVtYmVyO1xuICAgIHN0YXJ2aW5nOiBudW1iZXI7XG4gICAgZGVhZDogbnVtYmVyO1xufVxuXG5jb25zdCBjb25zdGFudHM6IHtcbiAgICBtYXR1cmF0aW9uUmF0ZTogWWVhc3R5R29vZG5lc3M7XG4gICAgaGVhbHRoTXVsdGlwbGllcjogWWVhc3R5R29vZG5lc3M7XG4gICAgaHVuZ2VyTXVsdGlwbGllcjogWWVhc3R5R29vZG5lc3M7XG4gICAgdm9sdW1lTXVsdGlwbGllcjogWWVhc3R5R29vZG5lc3M7XG59ID0ge1xuICAgIG1hdHVyYXRpb25SYXRlOiB7XG4gICAgICAgIGZlZDogMC4xLFxuICAgICAgICBoYXBweTogMC4xLFxuICAgICAgICB3YWl0aW5nOiAwLjA1LFxuICAgICAgICBodW5ncnk6IDAuMDUsXG4gICAgICAgIHN0YXJ2aW5nOiAwLjA1LFxuICAgICAgICBkZWFkOiAwLjAsXG4gICAgfSxcbiAgICBoZWFsdGhNdWx0aXBsaWVyOiB7XG4gICAgICAgIGZlZDogMS4wLFxuICAgICAgICBoYXBweTogMS4wLFxuICAgICAgICB3YWl0aW5nOiAxLjAsXG4gICAgICAgIGh1bmdyeTogMC43NSxcbiAgICAgICAgc3RhcnZpbmc6IDAuMjUsXG4gICAgICAgIGRlYWQ6IDAuMCxcbiAgICB9LFxuICAgIGh1bmdlck11bHRpcGxpZXI6IHtcbiAgICAgICAgZmVkOiAwLjAsXG4gICAgICAgIGhhcHB5OiAwLjEsXG4gICAgICAgIHdhaXRpbmc6IDAuNSxcbiAgICAgICAgaHVuZ3J5OiAwLjksXG4gICAgICAgIHN0YXJ2aW5nOiAxLjAsXG4gICAgICAgIGRlYWQ6IDAuMCxcbiAgICB9LFxuICAgIHZvbHVtZU11bHRpcGxpZXI6IHtcbiAgICAgICAgZmVkOiAxLjAsXG4gICAgICAgIGhhcHB5OiAxLjc1LFxuICAgICAgICB3YWl0aW5nOiAyLjUsXG4gICAgICAgIGh1bmdyeTogMS43NSxcbiAgICAgICAgc3RhcnZpbmc6IDEuMjUsXG4gICAgICAgIGRlYWQ6IDEuMCxcbiAgICB9LFxufTtcblxudHlwZSBDb25zdGFudFllYXN0ID0ge1xuICAgIHJlYWRvbmx5IGZlZDogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGhhcHB5OiBudW1iZXIsXG4gICAgcmVhZG9ubHkgd2FpdGluZzogbnVtYmVyLFxuICAgIHJlYWRvbmx5IGh1bmdyeTogbnVtYmVyLFxuICAgIHJlYWRvbmx5IHN0YXJ2aW5nOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgZGVhZDogbnVtYmVyLFxufVxuXG5jb25zdCBlbXB0eVllYXN0OiBDb25zdGFudFllYXN0ID0ge1xuICAgIGZlZDogMCxcbiAgICBoYXBweTogMCxcbiAgICB3YWl0aW5nOiAwLFxuICAgIGh1bmdyeTogMCxcbiAgICBzdGFydmluZzogMCxcbiAgICBkZWFkOiAwLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RhbnRZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBDb25zdGFudFllYXN0IHtcbiAgICByZXR1cm4geWVhc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MsIG5ld1llYXN0OiBZZWFzdHlHb29kbmVzcyk6IFllYXN0eUdvb2RuZXNzIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmZWQ6IHllYXN0LmZlZCArIG5ld1llYXN0LmZlZCxcbiAgICAgICAgaGFwcHk6IHllYXN0LmhhcHB5ICsgbmV3WWVhc3QuaGFwcHksXG4gICAgICAgIHdhaXRpbmc6IHllYXN0LndhaXRpbmcgKyBuZXdZZWFzdC53YWl0aW5nLFxuICAgICAgICBodW5ncnk6IHllYXN0Lmh1bmdyeSArIG5ld1llYXN0Lmh1bmdyeSxcbiAgICAgICAgc3RhcnZpbmc6IHllYXN0LnN0YXJ2aW5nICsgbmV3WWVhc3Quc3RhcnZpbmcsXG4gICAgICAgIGRlYWQ6IHllYXN0LmRlYWQgKyBuZXdZZWFzdC5kZWFkLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MsIGY6IChwcm9wOiBudW1iZXIpID0+IG51bWJlcik6IFllYXN0eUdvb2RuZXNzIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmZWQ6IGYoeWVhc3QuZmVkKSxcbiAgICAgICAgaGFwcHk6IGYoeWVhc3QuaGFwcHkpLFxuICAgICAgICB3YWl0aW5nOiBmKHllYXN0LndhaXRpbmcpLFxuICAgICAgICBodW5ncnk6IGYoeWVhc3QuaHVuZ3J5KSxcbiAgICAgICAgc3RhcnZpbmc6IGYoeWVhc3Quc3RhcnZpbmcpLFxuICAgICAgICBkZWFkOiBmKHllYXN0LmRlYWQpLFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBZZWFzdHlHb29kbmVzcyB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHllYXN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXN0TGVzc1RoYW5FcXVhbCh5ZWFzdDogWWVhc3R5R29vZG5lc3MsIHllYXN0MjogWWVhc3R5R29vZG5lc3MpOiBib29sZWFuIHtcbiAgICByZXR1cm4geWVhc3QuZmVkIDw9IHllYXN0Mi5mZWQgJiYgeWVhc3QuaGFwcHkgPD0geWVhc3QyLmhhcHB5ICYmIHllYXN0LndhaXRpbmcgPD0geWVhc3QyLndhaXRpbmcgJiYgeWVhc3QuaHVuZ3J5IDw9IHllYXN0Mi5odW5ncnkgJiYgeWVhc3Quc3RhcnZpbmcgPD0geWVhc3QyLnN0YXJ2aW5nICYmIHllYXN0LmRlYWQgPD0geWVhc3QyLmRlYWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdExlc3NUaGFuKHllYXN0OiBZZWFzdHlHb29kbmVzcywgeWVhc3QyOiBZZWFzdHlHb29kbmVzcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB5ZWFzdC5mZWQgPCB5ZWFzdDIuZmVkICYmIHllYXN0LmhhcHB5IDw9IHllYXN0Mi5oYXBweSAmJiB5ZWFzdC53YWl0aW5nIDw9IHllYXN0Mi53YWl0aW5nICYmIHllYXN0Lmh1bmdyeSA8PSB5ZWFzdDIuaHVuZ3J5ICYmIHllYXN0LnN0YXJ2aW5nIDw9IHllYXN0Mi5zdGFydmluZyAmJiB5ZWFzdC5kZWFkIDw9IHllYXN0Mi5kZWFkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3RZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MsIHllYXN0MjogWWVhc3R5R29vZG5lc3MpOiBZZWFzdHlHb29kbmVzcyB7XG4gICAgY29uc3QgcmVzdWx0WWVhc3QgPSB7XG4gICAgICAgIGZlZDogeWVhc3QuZmVkIC0geWVhc3QyLmZlZCxcbiAgICAgICAgaGFwcHk6IHllYXN0LmhhcHB5IC0geWVhc3QyLmhhcHB5LFxuICAgICAgICB3YWl0aW5nOiB5ZWFzdC53YWl0aW5nIC0geWVhc3QyLndhaXRpbmcsXG4gICAgICAgIGh1bmdyeTogeWVhc3QuaHVuZ3J5IC0geWVhc3QyLmh1bmdyeSxcbiAgICAgICAgc3RhcnZpbmc6IHllYXN0LnN0YXJ2aW5nIC0geWVhc3QyLnN0YXJ2aW5nLFxuICAgICAgICBkZWFkOiB5ZWFzdC5kZWFkIC0geWVhc3QyLmRlYWQsXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0WWVhc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodW5nZXIoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogbnVtYmVyIHtcbiAgICBjb25zdCBhbGl2ZSA9IHllYXN0LmZlZCArIHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nO1xuICAgIGNvbnN0IGh1bmdlckFic29sdXRlID1cbiAgICAgICAgeWVhc3QuZmVkICogY29uc3RhbnRzLmh1bmdlck11bHRpcGxpZXIuZmVkICtcbiAgICAgICAgeWVhc3QuaGFwcHkgKiBjb25zdGFudHMuaHVuZ2VyTXVsdGlwbGllci5oYXBweSArXG4gICAgICAgIHllYXN0LndhaXRpbmcgKiBjb25zdGFudHMuaHVuZ2VyTXVsdGlwbGllci53YWl0aW5nICtcbiAgICAgICAgeWVhc3QuaHVuZ3J5ICogY29uc3RhbnRzLmh1bmdlck11bHRpcGxpZXIuaHVuZ3J5ICtcbiAgICAgICAgeWVhc3Quc3RhcnZpbmcgKiBjb25zdGFudHMuaHVuZ2VyTXVsdGlwbGllci5zdGFydmluZztcbiAgICByZXR1cm4gaHVuZ2VyQWJzb2x1dGUgLyBhbGl2ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBudW1iZXIge1xuICAgIGNvbnN0IHRvdGFsID0geWVhc3QuZmVkICsgeWVhc3QuaGFwcHkgKyB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmcgKyB5ZWFzdC5kZWFkO1xuICAgIGNvbnN0IGh1bmdlckFic29sdXRlID1cbiAgICAgICAgeWVhc3QuZmVkICogY29uc3RhbnRzLmhlYWx0aE11bHRpcGxpZXIuZmVkICtcbiAgICAgICAgeWVhc3QuaGFwcHkgKiBjb25zdGFudHMuaGVhbHRoTXVsdGlwbGllci5oYXBweSArXG4gICAgICAgIHllYXN0LndhaXRpbmcgKiBjb25zdGFudHMuaGVhbHRoTXVsdGlwbGllci53YWl0aW5nICtcbiAgICAgICAgeWVhc3QuaHVuZ3J5ICogY29uc3RhbnRzLmhlYWx0aE11bHRpcGxpZXIuaHVuZ3J5ICtcbiAgICAgICAgeWVhc3Quc3RhcnZpbmcgKiBjb25zdGFudHMuaGVhbHRoTXVsdGlwbGllci5zdGFydmluZztcbiAgICByZXR1cm4gaHVuZ2VyQWJzb2x1dGUgLyB0b3RhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0ZXBZZWFzdCh5ZWFzdDogWWVhc3R5R29vZG5lc3MpOiBZZWFzdHlHb29kbmVzcyB7XG4gICAgY29uc3QgZ290SGFwcHkgPSB5ZWFzdC5mZWQgKiBjb25zdGFudHMubWF0dXJhdGlvblJhdGUuZmVkO1xuICAgIGNvbnN0IGdvdFdhaXRpbmcgPSB5ZWFzdC5oYXBweSAqIGNvbnN0YW50cy5tYXR1cmF0aW9uUmF0ZS5oYXBweTtcbiAgICBjb25zdCBnb3RIdW5ncnkgPSB5ZWFzdC53YWl0aW5nICogY29uc3RhbnRzLm1hdHVyYXRpb25SYXRlLndhaXRpbmc7XG4gICAgY29uc3QgZ290U3RhcnZpbmcgPSB5ZWFzdC5odW5ncnkgKiBjb25zdGFudHMubWF0dXJhdGlvblJhdGUuaHVuZ3J5O1xuICAgIGNvbnN0IGdvdERlYWQgPSB5ZWFzdC5zdGFydmluZyAqIGNvbnN0YW50cy5tYXR1cmF0aW9uUmF0ZS5zdGFydmluZztcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZlZDogeWVhc3QuZmVkIC0gZ290SGFwcHksXG4gICAgICAgIGhhcHB5OiBnb3RIYXBweSArIHllYXN0LmhhcHB5IC0gZ290V2FpdGluZyxcbiAgICAgICAgd2FpdGluZzogZ290V2FpdGluZyArIHllYXN0LndhaXRpbmcgLSBnb3RIdW5ncnksXG4gICAgICAgIGh1bmdyeTogZ290SHVuZ3J5ICsgeWVhc3QuaHVuZ3J5IC0gZ290U3RhcnZpbmcsXG4gICAgICAgIHN0YXJ2aW5nOiBnb3RTdGFydmluZyArIHllYXN0LnN0YXJ2aW5nIC0gZ290RGVhZCxcbiAgICAgICAgZGVhZDogZ290RGVhZCArIHllYXN0LmRlYWQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZlZWRZZWFzdChhbW91bnQ6IG51bWJlciwgeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIGNvbnN0IGZlZWRNZVNleW1vciA9IHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZztcbiAgICBpZiAoZmVlZE1lU2V5bW9yID49IGFtb3VudCkge1xuICAgICAgICAvLyBOb3QgZW5vdWdoIGZvb2QgdG8gZmVlZCBhbGwgdGhlIHJlYWxseSBodW5ncnkgeWVhc3RcbiAgICAgICAgY29uc29sZS5sb2coJ0EnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZlZDogeWVhc3QuZmVkICsgYW1vdW50ICsgYW1vdW50LFxuICAgICAgICAgICAgaGFwcHk6IHllYXN0LmhhcHB5LFxuICAgICAgICAgICAgd2FpdGluZzogeWVhc3Qud2FpdGluZyAtICh5ZWFzdC53YWl0aW5nIC8gZmVlZE1lU2V5bW9yKSAqIGFtb3VudCxcbiAgICAgICAgICAgIGh1bmdyeTogeWVhc3QuaHVuZ3J5IC0gKHllYXN0Lmh1bmdyeSAvIGZlZWRNZVNleW1vcikgKiBhbW91bnQsXG4gICAgICAgICAgICBzdGFydmluZzogeWVhc3Quc3RhcnZpbmcgLSAoeWVhc3Quc3RhcnZpbmcgLyBmZWVkTWVTZXltb3IpICogYW1vdW50LFxuICAgICAgICAgICAgZGVhZDogeWVhc3QuZGVhZCxcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGZlZWRNZVNleW1vciArIHllYXN0LmhhcHB5ID49IGFtb3VudCkge1xuICAgICAgICAvLyBGZWVkaW5nIGFsbCB0aGUgcmVhbGx5IGh1bmdyeSB5ZWFzdCwgcGx1cyBzb21lIHRoZSB5ZWFzdCB0aGF0IGNvdWxkIGhhdmUgYSBiaXRlXG4gICAgICAgIGNvbnNvbGUubG9nKCdCJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmZWQ6IHllYXN0LmZlZCArIGFtb3VudCArIGFtb3VudCxcbiAgICAgICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSAtIChhbW91bnQgLSBmZWVkTWVTZXltb3IpLFxuICAgICAgICAgICAgd2FpdGluZzogMCxcbiAgICAgICAgICAgIGh1bmdyeTogMCxcbiAgICAgICAgICAgIHN0YXJ2aW5nOiAwLFxuICAgICAgICAgICAgZGVhZDogeWVhc3QuZGVhZCxcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTb21lIGZlZWQgZ29lcyB0byB3YXN0ZSBhcyBkZWFkIG1hdGVyaWFsXG4gICAgICAgIGNvbnNvbGUubG9nKCdDJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmZWQ6IHllYXN0LmZlZCArICh5ZWFzdC5oYXBweSArIHllYXN0LndhaXRpbmcgKyB5ZWFzdC5odW5ncnkgKyB5ZWFzdC5zdGFydmluZykgKiAyLFxuICAgICAgICAgICAgaGFwcHk6IDAsXG4gICAgICAgICAgICB3YWl0aW5nOiAwLFxuICAgICAgICAgICAgaHVuZ3J5OiAwLFxuICAgICAgICAgICAgc3RhcnZpbmc6IDAsXG4gICAgICAgICAgICBkZWFkOiB5ZWFzdC5kZWFkICsgYW1vdW50IC0gKHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nKSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVGcmFjdGlvbnMoeWVhc3Q6IFllYXN0eUdvb2RuZXNzKTogWWVhc3R5R29vZG5lc3Mge1xuICAgIGNvbnN0IHRvdGFsID0geWVhc3QuZmVkICsgeWVhc3QuaGFwcHkgKyB5ZWFzdC53YWl0aW5nICsgeWVhc3QuaHVuZ3J5ICsgeWVhc3Quc3RhcnZpbmcgKyB5ZWFzdC5kZWFkO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZlZDogeWVhc3QuZmVkIC8gdG90YWwsXG4gICAgICAgIGhhcHB5OiB5ZWFzdC5oYXBweSAvIHRvdGFsLFxuICAgICAgICB3YWl0aW5nOiB5ZWFzdC53YWl0aW5nIC8gdG90YWwsXG4gICAgICAgIGh1bmdyeTogeWVhc3QuaHVuZ3J5IC8gdG90YWwsXG4gICAgICAgIHN0YXJ2aW5nOiB5ZWFzdC5zdGFydmluZyAvIHRvdGFsLFxuICAgICAgICBkZWFkOiB5ZWFzdC5kZWFkIC8gdG90YWwsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXN0Vm9sdW1lKHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgeWVhc3QuZmVkICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIuZmVkICtcbiAgICAgICAgeWVhc3QuaGFwcHkgKiBjb25zdGFudHMudm9sdW1lTXVsdGlwbGllci5oYXBweSArXG4gICAgICAgIHllYXN0LndhaXRpbmcgKiBjb25zdGFudHMudm9sdW1lTXVsdGlwbGllci53YWl0aW5nICtcbiAgICAgICAgeWVhc3QuaHVuZ3J5ICogY29uc3RhbnRzLnZvbHVtZU11bHRpcGxpZXIuaHVuZ3J5ICtcbiAgICAgICAgeWVhc3Quc3RhcnZpbmcgKiBjb25zdGFudHMudm9sdW1lTXVsdGlwbGllci5zdGFydmluZyArXG4gICAgICAgIHllYXN0LmRlYWQgKiBjb25zdGFudHMudm9sdW1lTXVsdGlwbGllci5kZWFkXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wWWVhc3QobWF4Vm9sdW1lOiBudW1iZXIsIHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IFtZZWFzdHlHb29kbmVzcywgbnVtYmVyXSB7XG4gICAgY29uc3Qgdm9sdW1lID0geWVhc3RWb2x1bWUoeWVhc3QpO1xuICAgIGlmICh2b2x1bWUgPD0gbWF4Vm9sdW1lKSByZXR1cm4gW3llYXN0LCAwXTtcbiAgICBjb25zdCBsb3NzID0gKHZvbHVtZSAtIG1heFZvbHVtZSkgLyB2b2x1bWU7XG4gICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgICAgZmVkOiB5ZWFzdC5mZWQgKiAoMSAtIGxvc3MpLFxuICAgICAgICAgICAgaGFwcHk6IHllYXN0LmhhcHB5ICogKDEgLSBsb3NzKSxcbiAgICAgICAgICAgIHdhaXRpbmc6IHllYXN0LndhaXRpbmcgKiAoMSAtIGxvc3MpLFxuICAgICAgICAgICAgaHVuZ3J5OiB5ZWFzdC5odW5ncnkgKiAoMSAtIGxvc3MpLFxuICAgICAgICAgICAgc3RhcnZpbmc6IHllYXN0LnN0YXJ2aW5nICogKDEgLSBsb3NzKSxcbiAgICAgICAgICAgIGRlYWQ6IHllYXN0LmRlYWQgKiAoMSAtIGxvc3MpLFxuICAgICAgICB9LFxuICAgICAgICB2b2x1bWUgLSBtYXhWb2x1bWUsXG4gICAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHllYXN0QW1vdW50KHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHllYXN0LmZlZCArIHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nICsgeWVhc3QuZGVhZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpdmluZ1llYXN0QW1vdW50KHllYXN0OiBZZWFzdHlHb29kbmVzcyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHllYXN0LmZlZCArIHllYXN0LmhhcHB5ICsgeWVhc3Qud2FpdGluZyArIHllYXN0Lmh1bmdyeSArIHllYXN0LnN0YXJ2aW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlWWVhc3QoeWVhc3Q6IFllYXN0eUdvb2RuZXNzLCBhbW91bnQ6IG51bWJlciwgamFyczogbnVtYmVyKTogeyByZW1haW5pbmc6IFllYXN0eUdvb2RuZXNzLCByZW1vdmVkOiBZZWFzdHlHb29kbmVzcyB9IHwgbnVsbCB7XG4gICAgY29uc3QgdGFrZW91dCA9IE1hdGguZmxvb3IoYW1vdW50KTtcbiAgICBjb25zdCBjdXJyZW50QW1vdW50ID0geWVhc3RBbW91bnQoeWVhc3QpO1xuICAgIGlmICh0YWtlb3V0IDwgMSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAodGFrZW91dCA+IGN1cnJlbnRBbW91bnQgLSBqYXJzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGNvbnN0IHRha2VvdXRGcmFjdGlvbiA9IHRha2VvdXQgLyBjdXJyZW50QW1vdW50O1xuICAgIGNvbnNvbGUubG9nKGB0YWtpbmcgb3V0ICR7dGFrZW91dH0sIGZyYWN0aW9uOiAke3Rha2VvdXRGcmFjdGlvbn1gKTtcbiAgICBsZXQgcmVtb3ZlZCA9IG1hcFllYXN0KHllYXN0LCAocHJvcCkgPT4gTWF0aC5taW4ocHJvcCAqIHRha2VvdXRGcmFjdGlvbiwgcHJvcCkpO1xuICAgIGxldCByZW1haW5pbmcgPSBzdWJ0cmFjdFllYXN0KHllYXN0LCByZW1vdmVkKTtcbiAgICAvLyBKdXN0IGluIGNhc2Ugc29tZXRoaW5nIHdlbnQgbmVnYXRpdmUhXG4gICAgcmVtYWluaW5nID0gbWFwWWVhc3QocmVtYWluaW5nLCAocHJvcCkgPT4gTWF0aC5tYXgoMCwgcHJvcCkpO1xuICAgIGNvbnN0IHJlbW92ZWRBbW91bnQgPSB5ZWFzdEFtb3VudChyZW1vdmVkKTtcbiAgICBpZiAocmVtb3ZlZEFtb3VudCA8IHRha2VvdXQpIHtcbiAgICAgICAgcmVtb3ZlZC5kZWFkID0gcmVtb3ZlZEFtb3VudCAtIHRha2VvdXQ7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHJlbW92ZWQpO1xuICAgIHJldHVybiB7IHJlbWFpbmluZzogcmVtYWluaW5nLCByZW1vdmVkOiByZW1vdmVkIH07XG59IiwiaW1wb3J0IHsgUXVldWUgfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcblxuZXhwb3J0IGNsYXNzIEV2ZW50UXVldWUge1xuICBldmVudHMgPSBuZXcgUXVldWU8c3RyaW5nPigpO1xuICBldmVudExpc3RlbmVyczogUmVjb3JkPHN0cmluZywgKCgpID0+IHZvaWQpW10+ID0ge307XG5cbiAgYWRkRXZlbnQoZXZlbnQ6IHN0cmluZykge1xuICAgIHRoaXMuZXZlbnRzLmVucXVldWUoZXZlbnQpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBmOiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKCF0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5ldmVudExpc3RlbmVyc1tldmVudF0ucHVzaChmKTtcbiAgfVxuXG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKGV2ZW50OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5ldmVudExpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBmOiAoKSA9PiB2b2lkKSB7XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdO1xuICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoZiwgMCk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm9jZXNzRXZlbnQoZXZlbnQ6IHN0cmluZykge1xuICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XTtcbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgodmFsdWUpID0+IHsgdmFsdWUoKTsgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJBbGwoKSB7XG4gICAgdGhpcy5ldmVudHMgPSBuZXcgUXVldWU8c3RyaW5nPigpO1xuICB9XG5cbiAgcHJvY2Vzc0V2ZW50cygpIHtcbiAgICB3aGlsZSAodGhpcy5ldmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wcm9jZXNzRXZlbnQodGhpcy5ldmVudHMuZGVxdWV1ZSgpKTtcbiAgICB9XG4gIH1cblxufSIsImltcG9ydCB7XG4gICAgeWVhc3RWb2x1bWUsXG4gICAgeWVhc3RBbW91bnQsXG4gICAgcmVtb3ZlWWVhc3QsXG4gICAgaHVuZ2VyLFxuICAgIGhlYWx0aCxcbiAgICBzdGVwWWVhc3QsXG4gICAgY2xhbXBZZWFzdCxcbiAgICBmZWVkWWVhc3QsXG4gICAgWWVhc3R5R29vZG5lc3MsXG4gICAgY2FsY3VsYXRlRnJhY3Rpb25zLFxuICAgIGxpdmluZ1llYXN0QW1vdW50LFxufSBmcm9tICcuL1llYXN0TG9naWMnO1xuXG5pbXBvcnQgeyBFdmVudFF1ZXVlIH0gZnJvbSBcIi4vZXZlbnRzXCI7XG5pbXBvcnQgeyBJbnZlbnRvcnkgfSBmcm9tICcuL2ludmVudG9yeSc7XG5cbmVudW0gRSB7XG4gICAgZmVlZCwgYmFrZSwgYWRkSmFyLCBnaXZlYXdheSwgdGhyb3dhd2F5LCBlbnRlckNvbXBldGl0aW9uLCB0cmFkZVxufVxuXG5jb25zdCBldmVudHMgPSBuZXcgRXZlbnRRdWV1ZSgpO1xuXG5sZXQgbGFzdEVwb2NoTVM6IG51bWJlciA9IDA7XG5sZXQgZXBvY2hJbk1TOiBudW1iZXIgPSAxMDAwO1xubGV0IHJ1blN0YXJ0SW5NUzogbnVtYmVyID0gMDtcbmNvbnN0IG5ld0phclZvbHVtZTogbnVtYmVyID0gMzI7XG5cbi8vIEluaXRpYWxpemVcbmxldCBzcGlsbGFnZTogbnVtYmVyID0gMDtcbmxldCBvdmVuU2l6ZTogbnVtYmVyID0gMTtcbmxldCBjYW5CYWtlOiBib29sZWFuID0gZmFsc2U7XG5sZXQgY2FuR2l2ZWF3YXk6IGJvb2xlYW4gPSBmYWxzZTtcbmxldCBjYW5UcmFkZTogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGphclZvbHVtZTogbnVtYmVyID0gMzI7XG5sZXQgZ2FtZVN0YXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbmxldCBmaWxsZWRWb2x1bWU6IG51bWJlciA9IDA7XG5sZXQgcGxheWVySW52ZW50b3J5ID0gbmV3IEludmVudG9yeSgpO1xubGV0IHBsYXllclByaXplOiBudW1iZXIgPSAwO1xuXG5jbGFzcyBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlIHtcbiAgICBhbW91bnQ6IG51bWJlciA9IDA7XG4gICAgZXBvY2hzUGVyUmVmcmVzaDogbnVtYmVyID0gMDtcbiAgICByZW1haW5pbmdFcG9jaHM6IG51bWJlciA9IDA7XG4gICAgaW5jcmVhc2VQZXJSZWZyZXNoOiBudW1iZXIgPSAwO1xuICAgIGxpbWl0OiBudW1iZXIgPSAwO1xuICAgIG9uSW5jcmVhc2U6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKGFtb3VudDogbnVtYmVyLCBpbmNyZWFzZVBlclJlZnJlc2g6IG51bWJlciwgZXBvY2hzUGVyUmVmcmVzaDogbnVtYmVyLCBsaW1pdDogbnVtYmVyLCBvbkluY3JlYXNlPzogKCgpID0+IHZvaWQpKSB7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgICB0aGlzLmVwb2Noc1BlclJlZnJlc2ggPSBlcG9jaHNQZXJSZWZyZXNoO1xuICAgICAgICB0aGlzLmluY3JlYXNlUGVyUmVmcmVzaCA9IGluY3JlYXNlUGVyUmVmcmVzaDtcbiAgICAgICAgdGhpcy5yZW1haW5pbmdFcG9jaHMgPSBNYXRoLm1heChNYXRoLmZsb29yKGVwb2Noc1BlclJlZnJlc2gpLCAxKTtcbiAgICAgICAgdGhpcy5saW1pdCA9IGxpbWl0O1xuICAgICAgICB0aGlzLm9uSW5jcmVhc2UgPSBvbkluY3JlYXNlO1xuICAgIH1cblxuICAgIHN0ZXAoKSB7XG4gICAgICAgIGNvbnN0IGVwciA9IE1hdGgubWF4KE1hdGguZmxvb3IodGhpcy5lcG9jaHNQZXJSZWZyZXNoKSwgMSk7XG4gICAgICAgIGNvbnN0IGlwciA9IE1hdGgubWF4KE1hdGguZmxvb3IodGhpcy5pbmNyZWFzZVBlclJlZnJlc2gpLCAwKTtcbiAgICAgICAgaWYgKGlwciA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbWFpbmluZ0Vwb2Nocy0tO1xuICAgICAgICBpZiAodGhpcy5yZW1haW5pbmdFcG9jaHMgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnJlbWFpbmluZ0Vwb2NocyA9IGVwcjtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50ICs9IGlwcjtcbiAgICAgICAgICAgIGlmICh0aGlzLmFtb3VudCA+IHRoaXMubGltaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFtb3VudCA9IHRoaXMubGltaXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub25JbmNyZWFzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25JbmNyZWFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG50eXBlIFJlc291cmNlc1R5cGUgPSB7XG4gICAgeWVhc3Q6IFllYXN0eUdvb2RuZXNzLFxuICAgIGdvb2Q6IG51bWJlcixcbiAgICBicmVhZDogbnVtYmVyLFxuICAgIGphcnM6IG51bWJlcixcbiAgICBuZXdKYXJzOiBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlLFxuICAgIGZyaWVuZHNUb1RyYWRlOiBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlLFxuICAgIGNvbXBldGl0aW9uczogSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZVxufTtcblxubGV0IGRlYWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuZnVuY3Rpb24gb25GaW5kSmFyKCkge1xuICAgIGxldCBhbm90aGVySmFyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbm90aGVyLWphclwiKTtcbiAgICBpZiAoYW5vdGhlckphckJ1dHRvbikge1xuICAgICAgICBhbm90aGVySmFyQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgIH1cbiAgICBhZGRNZXNzYWdlKFwiWW91IGZvdW5kIGFub3RoZXIgamFyIVwiKTtcbn1cblxuZnVuY3Rpb24gb25OZXdGcmllbmQoKSB7XG4gICAgbGV0IHRyYWRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFkZVwiKTtcbiAgICBpZiAodHJhZGVCdXR0b24pIHtcbiAgICAgICAgdHJhZGVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgfVxuICAgIGFkZE1lc3NhZ2UoXCJBIGZyaWVuZCBhc2tzIGlmIHRoZXkgY2FuIGhhdmUgc29tZSBvZiB5b3VyIHN0YXJ0ZXIuIFRoZXkgb2ZmZXIgYSBwcmVzZW50IGluIHJldHVybi5cIik7XG59XG5cblxuZnVuY3Rpb24gb25OZXdDb21wKCkge1xuICAgIGxldCBlbnRlckNvbXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudGVyLWNvbXBldGl0aW9uXCIpO1xuICAgIGlmIChlbnRlckNvbXBCdXR0b24pIHtcbiAgICAgICAgZW50ZXJDb21wQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgIH1cbiAgICBhZGRNZXNzYWdlKFwiWW91IGhlYXIgYWJvdXQgYSBiYWtpbmcgY29tcGV0aXRpb24hIFlvdSBuZWVkIDUgbG9hdmVzIHRvIGVudGVyLlwiKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGaXJzdEJha2UoKSB7XG4gICAgaWYgKGNhbkJha2UpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh5ZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpID49IFJlc291cmNlcy5qYXJzICsgNCAmJiBoZWFsdGgoUmVzb3VyY2VzLnllYXN0KSA+PSAuOCkge1xuICAgICAgICBvbkFsbG93QmFrZSgpO1xuICAgIH1cbn1cblxubGV0IFJlc291cmNlczogUmVzb3VyY2VzVHlwZSA9IHtcbiAgICB5ZWFzdDogeyBmZWQ6IDIsIGhhcHB5OiAwLCB3YWl0aW5nOiAwLCBodW5ncnk6IDAsIHN0YXJ2aW5nOiAwLCBkZWFkOiAxIH0sXG4gICAgZ29vZDogMCxcbiAgICBicmVhZDogMCxcbiAgICBqYXJzOiAxLFxuICAgIG5ld0phcnM6IG5ldyBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlKDAsIDEsIDEyMCwgMSksXG4gICAgZnJpZW5kc1RvVHJhZGU6IG5ldyBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlKDEsIDEsIDMyLCAxKSxcbiAgICBjb21wZXRpdGlvbnM6IG5ldyBJbnRlZ3JhbFJlZmlsbGluZ1Jlc291cmNlKDAsIDEsIDI0NSwgMSksXG59O1xuXG5sZXQgcmVzZXRCdXR0b25zID0gKCkgPT4geyB9O1xubGV0IG9uQWxsb3dCYWtlID0gKCkgPT4geyB9O1xubGV0IG9uRmlyc3RKYXIgPSAoKSA9PiB7IH07XG5sZXQgZ290b1N0YXJ0ID0gKCkgPT4geyB9O1xubGV0IHJlbmRlckJ1dHRvbnMgPSAoKSA9PiB7IH07XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xuICAgIGlmICghZ2FtZVN0YXJ0ZWQpIHtcbiAgICAgICAgZ2FtZVN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBjcmVhdGVqcy5UaWNrZXIuZnJhbWVyYXRlID0gMzAuMDtcbiAgICAgICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBmdW5jdGlvbiAoZXZlbnRPYmo6IE9iamVjdCkge1xuICAgICAgICAgICAgZ2FtZUxvb3AoPGNyZWF0ZWpzLlRpY2tlckV2ZW50PmV2ZW50T2JqKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2VzID0gW107XG4gICAgamFyVm9sdW1lID0gMzI7XG4gICAgZmlsbGVkVm9sdW1lID0gMDtcbiAgICBvdmVuU2l6ZSA9IDE7XG4gICAgc3BpbGxhZ2UgPSAwO1xuICAgIGRlYWQgPSBmYWxzZTtcbiAgICBjYW5CYWtlID0gZmFsc2U7XG4gICAgY2FuR2l2ZWF3YXkgPSBmYWxzZTtcbiAgICBwbGF5ZXJQcml6ZSA9IDA7XG4gICAgZXZlbnRzLmNsZWFyQWxsKCk7XG4gICAgUmVzb3VyY2VzID0ge1xuICAgICAgICB5ZWFzdDogeyBmZWQ6IDIsIGhhcHB5OiAwLCB3YWl0aW5nOiAwLCBodW5ncnk6IDAsIHN0YXJ2aW5nOiAwLCBkZWFkOiAxIH0sXG4gICAgICAgIGdvb2Q6IDAsXG4gICAgICAgIGJyZWFkOiAwLFxuICAgICAgICBqYXJzOiAxLFxuICAgICAgICBuZXdKYXJzOiBuZXcgSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSgwLCAxLCAxMjAsIDEsIG9uRmluZEphciksXG4gICAgICAgIGZyaWVuZHNUb1RyYWRlOiBuZXcgSW50ZWdyYWxSZWZpbGxpbmdSZXNvdXJjZSgwLCAxLCAzLCAxLCBvbk5ld0ZyaWVuZCksXG4gICAgICAgIGNvbXBldGl0aW9uczogbmV3IEludGVncmFsUmVmaWxsaW5nUmVzb3VyY2UoMCwgMSwgMTg5LCAxLCBvbk5ld0NvbXApLFxuICAgIH07XG4gICAgcGxheWVySW52ZW50b3J5ID0gbmV3IEludmVudG9yeSgpO1xuICAgIHJlc2V0QnV0dG9ucygpO1xuICAgIGFkZE1lc3NhZ2UoXCJVbmZvcnR1bmF0ZWx5LCB5b3UgYXJlIHN0YXJ0aW5nIGZyb20gc2NyYXRjaC4gWW91ciBmcmllbmQgaGFzIGdpdmVuIHlvdSBhIHN0YXJ0ZXIsIGJ1dCB5b3UnbGwgbmVlZCB0byBmZWVkIGl0LiBIZSBzYXlzIHRoYXQgaGUgYWxyZWFkeSBmZWQgaXQgc28geW91IG1pZ2h0IHdhbnQgdG8gd2FpdCBhIGJpdC5cIik7XG4gICAgcnVuU3RhcnRJbk1TID0gY3JlYXRlanMuVGlja2VyLmdldFRpbWUodHJ1ZSk7XG59XG5cbmxldCBtZXNzYWdlczogc3RyaW5nW10gPSBbXTtcblxuZnVuY3Rpb24gYWRkTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBtZXNzYWdlcy51bnNoaWZ0KG1lc3NhZ2UpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAxMCkge1xuICAgICAgICBtZXNzYWdlcy5wb3AoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuICc8cD4nICsgbWVzc2FnZXMubWFwKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiBgJHt2YWx1ZX1gKS5qb2luKCdcXG48YnI+XFxuJykgKyAnPC9wPidcbn1cblxuZnVuY3Rpb24gc2V0RWxlbWVudChpZDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSB7XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWVsZW0pIHJldHVybjtcbiAgICBlbGVtLmlubmVyVGV4dCA9IGNvbnRlbnRzO1xufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50SFRNTChpZDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSB7XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWVsZW0pIHJldHVybjtcbiAgICBlbGVtLmlubmVySFRNTCA9IGNvbnRlbnRzO1xufVxuXG5mdW5jdGlvbiBwbGFjZWRUZXh0KCk6IHN0cmluZyB7XG4gICAgaWYgKHBsYXllclByaXplIDwgMSkge1xuICAgICAgICByZXR1cm4gXCJZb3UgbmV2ZXIgcGxhY2VkIGluIGNvbXBldGl0aW9uXCI7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXJQcml6ZSA+PSAxICYmIHBsYXllclByaXplIDwgMikge1xuICAgICAgICByZXR1cm4gXCJZb3UgcmVhY2hlZCB0aGlyZCBwbGFjZSBpbiBjb21wZXRpdGlvbiFcIlxuICAgIH0gZWxzZSBpZiAocGxheWVyUHJpemUgPj0gMiAmJiBwbGF5ZXJQcml6ZSA8IDMpIHtcbiAgICAgICAgcmV0dXJuIFwiWW91IHJlYWNoZWQgc2Vjb25kIHBsYWNlIGluIGNvbXBldGl0aW9uIVwiXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiV293LCB5b3UgcmVhY2hlZCBmaXJzdCBwbGFjZSBpbiBjb21wZXRpdGlvbiBhbmQgYWNoaWV2ZWQgeW91ciBnb2FsIG9mIGJlY29taW5nIGEgbWFzdGVyIGJha2VyIVwiXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8gUmVuZGVyIHRoZSBqYXJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnamFyLWNhcGFjaXR5JykhLmlubmVyVGV4dCA9ICcnICsgamFyVm9sdW1lO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqYXJzLWZpbGxlZCcpIS5pbm5lclRleHQgPSAnJyArIFJlc291cmNlcy5qYXJzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2FibGUtc3RhcnRlci1hbW91bnQnKSEuaW5uZXJUZXh0ID0gJycgKyAoTWF0aC5yb3VuZCh5ZWFzdEFtb3VudChSZXNvdXJjZXMueWVhc3QpKSAtIFJlc291cmNlcy5qYXJzKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWwtc3RhcnRlci1hbW91bnQnKSEuaW5uZXJUZXh0ID0gJycgKyBNYXRoLnJvdW5kKHllYXN0QW1vdW50KFJlc291cmNlcy55ZWFzdCkpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VkJykhLmlubmVyVGV4dCA9IGAke01hdGguZmxvb3IoeWVhc3RWb2x1bWUoUmVzb3VyY2VzLnllYXN0KSAvIGphclZvbHVtZSAqIDEwMCl9JWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bmdlcicpIS5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKGh1bmdlcihSZXNvdXJjZXMueWVhc3QpICogMTAwKX0lYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhbHRoJykhLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoaGVhbHRoKFJlc291cmNlcy55ZWFzdCkgKiAxMDApfSVgO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFzaC1icmVhZCcpIS5pbm5lclRleHQgPSBgJHtSZXNvdXJjZXMuYnJlYWR9YDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vZC13YXN0ZScpIS5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKHNwaWxsYWdlKX1gO1xuICAgIHNldEVsZW1lbnRIVE1MKCdtZXNzYWdlLWxvZycsIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzKSk7XG4gICAgc2V0RWxlbWVudChcInBsYWNlLXJlYWNoZWRcIiwgcGxhY2VkVGV4dCgpKVxuICAgIHNldEVsZW1lbnQoXCJsb2F2ZXMtZG9uYXRlZFwiLCBcIlwiICsgUmVzb3VyY2VzLmdvb2QpO1xuXG4gICAgY29uc3QgZnJhY3Rpb25zOiBZZWFzdHlHb29kbmVzcyA9IGNhbGN1bGF0ZUZyYWN0aW9ucyhSZXNvdXJjZXMueWVhc3QpO1xuICAgIHNldEVsZW1lbnQoXG4gICAgICAgICdkZWJ1Z19xdWFudGl0eScsXG4gICAgICAgIGAke1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QuZmVkICtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0LmhhcHB5ICtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0LndhaXRpbmcgK1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QuaHVuZ3J5ICtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0LnN0YXJ2aW5nICtcbiAgICAgICAgUmVzb3VyY2VzLnllYXN0LmRlYWRcbiAgICAgICAgfWBcbiAgICApO1xuICAgIHJlbmRlckJ1dHRvbnMoKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19mZWQnLCBgJHtNYXRoLnJvdW5kKGZyYWN0aW9ucy5mZWQgKiAxMDApfSVgKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19oYXBweScsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLmhhcHB5ICogMTAwKX0lYCk7XG4gICAgc2V0RWxlbWVudCgnZGVidWdfd2FpdGluZycsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLndhaXRpbmcgKiAxMDApfSVgKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19odW5ncnknLCBgJHtNYXRoLnJvdW5kKGZyYWN0aW9ucy5odW5ncnkgKiAxMDApfSVgKTtcbiAgICBzZXRFbGVtZW50KCdkZWJ1Z19zdGFydmluZycsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLnN0YXJ2aW5nICogMTAwKX0lYCk7XG4gICAgc2V0RWxlbWVudCgnZGVidWdfZGVhZCcsIGAke01hdGgucm91bmQoZnJhY3Rpb25zLmRlYWQgKiAxMDApfSVgKTtcbn1cblxuZnVuY3Rpb24gZXZvbHZlUmVzb3VyY2VzKGVwb2NoczogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlcG9jaHM7IGkrKykge1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QgPSBzdGVwWWVhc3QoUmVzb3VyY2VzLnllYXN0KTtcbiAgICAgICAgUmVzb3VyY2VzLm5ld0phcnMuc3RlcCgpO1xuICAgICAgICBSZXNvdXJjZXMuZnJpZW5kc1RvVHJhZGUuc3RlcCgpO1xuICAgICAgICBSZXNvdXJjZXMuY29tcGV0aXRpb25zLnN0ZXAoKTtcbiAgICB9XG4gICAgY2hlY2tGaXJzdEJha2UoKTtcbn1cblxuZnVuY3Rpb24gZ2FtZUxvb3AoZXZlbnQ6IGNyZWF0ZWpzLlRpY2tlckV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZXBvY2hEZWx0YSA9IGNyZWF0ZWpzLlRpY2tlci5nZXRUaW1lKHRydWUpIC0gbGFzdEVwb2NoTVM7XG4gICAgY29uc3QgcmVzb3VyY2VFcG9jaHMgPSBNYXRoLmZsb29yKGVwb2NoRGVsdGEgLyBlcG9jaEluTVMpO1xuICAgIGV2ZW50cy5wcm9jZXNzRXZlbnRzKCk7XG4gICAgaWYgKCFkZWFkKSB7XG4gICAgICAgIGV2b2x2ZVJlc291cmNlcyhyZXNvdXJjZUVwb2Nocyk7XG4gICAgfVxuICAgIGlmIChyZXNvdXJjZUVwb2NocyA+IDApIHtcbiAgICAgICAgbGFzdEVwb2NoTVMgKz0gcmVzb3VyY2VFcG9jaHMgKiBlcG9jaEluTVM7XG4gICAgfVxuICAgIGlmICghZGVhZCkge1xuICAgICAgICBpZiAobGl2aW5nWWVhc3RBbW91bnQoUmVzb3VyY2VzLnllYXN0KSA8IC41KSB7XG4gICAgICAgICAgICBkZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3VyIHBvb3IgeWVhc3QgaXMgZGVhZC5cIilcbiAgICAgICAgICAgIG9uTG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFkZWFkKSB7XG4gICAgICAgIGNvbnN0IFtuZXdZZWFzdCwgbmV3U3BpbGxdID0gY2xhbXBZZWFzdChqYXJWb2x1bWUsIFJlc291cmNlcy55ZWFzdCk7XG4gICAgICAgIFJlc291cmNlcy55ZWFzdCA9IG5ld1llYXN0O1xuICAgICAgICBpZiAobmV3U3BpbGwgPiAwKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiT2ggbm8hIFlvdXIgc3RhcnRlciBvdmVyZmxvd2VkLCBhbmQgeWVhc3QgaXMgYWxsIG92ZXIgdGhlIGZsb29yLlwiKVxuICAgICAgICB9XG4gICAgICAgIHNwaWxsYWdlICs9IG5ld1NwaWxsO1xuICAgIH1cblxuICAgIHJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBhZGRGb29kKCkge1xuICAgIGNvbnN0IG9sZEhlYWx0aCA9IGhlYWx0aChSZXNvdXJjZXMueWVhc3QpO1xuXG4gICAgUmVzb3VyY2VzLnllYXN0ID0gZmVlZFllYXN0KDEsIFJlc291cmNlcy55ZWFzdCk7XG4gICAgY29uc3QgW25ld1llYXN0LCBuZXdTcGlsbF0gPSBjbGFtcFllYXN0KGphclZvbHVtZSwgUmVzb3VyY2VzLnllYXN0KTtcbiAgICBSZXNvdXJjZXMueWVhc3QgPSBuZXdZZWFzdDtcbiAgICBzcGlsbGFnZSArPSBuZXdTcGlsbDtcbiAgICBjb25zdCBuZXdIZWFsdGggPSBoZWFsdGgoUmVzb3VyY2VzLnllYXN0KTtcbiAgICBpZiAobmV3SGVhbHRoID4gb2xkSGVhbHRoKSB7XG4gICAgICAgIGFkZE1lc3NhZ2UoJ1lvdSBmZWQgeW91ciBzb3VyZG91Z2ggc3RhcnRlciwgYW5kIGl0IGxvb2tzIGJldHRlciEnKTtcbiAgICB9IGVsc2UgaWYgKG5ld0hlYWx0aCA9PSBvbGRIZWFsdGgpIHtcbiAgICAgICAgYWRkTWVzc2FnZSgnWW91IGZlZCB5b3VyIHNvdXJkb3VnaCBzdGFydGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWRkTWVzc2FnZSgnWW91IGZlZCB5b3VyIHNvdXJkb3VnaCBzdGFydGVyLCBidXQgeW91IHRoaW5rIHlvdSBtaWdodCBoYXZlIG92ZXJmZWQgaXQuLi4nKTtcbiAgICB9XG59XG5cbmxldCBvbkxvc2UgPSAoKSA9PiB7IH07XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgbGV0IGdhbWVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xuICAgIGdhbWVEaXYhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBsZXQgaW52ZW50b3J5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnZlbnRvcnlcIik7XG4gICAgaW52ZW50b3J5RGl2IS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgLy8gQWRkIGJ1dHRvbiBjbGljayBsaXN0ZW5lcnNcbiAgICBsZXQgYWRkRm9vZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtZm9vZCcpO1xuICAgIGFkZEZvb2RCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGV2ZW50cy5hZGRFdmVudChFW0UuZmVlZF0pO1xuICAgIH1cbiAgICBsZXQgb25BZGRGb29kID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndHJ5aW5nIHRvIGFkZCBmb29kJyk7XG4gICAgICAgIGFkZEZvb2QoKTtcbiAgICB9O1xuICAgIGV2ZW50cy5hZGRFdmVudExpc3RlbmVyKEVbRS5mZWVkXSwgb25BZGRGb29kKTtcblxuICAgIC8qIGFsbCBhY3Rpb25zIGJlbG93IChjdXJyZW50bHkgNSAtIGJha2UgLyBhbm90aGVyLWphciAvIHRyYWRlIC8gZ2EgLyB0YSlcbiAgbmVlZCB0byBkZWNyZWFzZSB0aGUgdm9sdW1lIGJ5IDUwJVxuICAqL1xuICAgIGZ1bmN0aW9uIGVub3VnaFRvQmFrZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgbGV0IGxvYXZlcyA9IE1hdGguZmxvb3IoTWF0aC5taW4oeWVhc3RBbW91bnQoUmVzb3VyY2VzLnllYXN0KSAtIFJlc291cmNlcy5qYXJzLCA0ICogb3ZlblNpemUpIC8gNCk7XG4gICAgICAgIGlmIChsb2F2ZXMgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9hdmVzO1xuICAgIH1cbiAgICBsZXQgYmFrZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFrZVwiKTtcbiAgICBmdW5jdGlvbiBvbkJha2UoKSB7XG4gICAgICAgIGlmICghY2FuQmFrZSkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBkb24ndCBoYXZlIGEgYnJlYWQgcmVjaXBlIHlldCEgSG93IGRpZCB5b3UgZXZlbiBoaXQgdGhpcyBidXR0b24/Pz9cIik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgbG9hdmVzID0gZW5vdWdoVG9CYWtlKCk7XG4gICAgICAgIGlmICghbG9hdmVzKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiVGhlcmUncyBub3QgZW5vdWdoIHllYXN0IHRvIGJha2Ugd2l0aCFcIik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgeWVhc3RMb3N0ID0gbG9hdmVzICogNDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHJlbW92ZVllYXN0KFJlc291cmNlcy55ZWFzdCwgeWVhc3RMb3N0LCBSZXNvdXJjZXMuamFycyk7XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiVGhlcmUncyBub3QgZW5vdWdoIHllYXN0IHRvIGJha2Ugd2l0aCFcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgUmVzb3VyY2VzLnllYXN0ID0gcmVzdWx0LnJlbWFpbmluZztcbiAgICAgICAgaWYgKGhlYWx0aChyZXN1bHQucmVtb3ZlZCkgPCAwLjgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0cmllZCB0byBiYWtlIHdpdGggJHtoZWFsdGgocmVzdWx0LnJlbW92ZWQpfWApO1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSB0cmllZCB0byBiYWtlIHdpdGggdGhlIHllYXN0IGJ1dCBpdCB0dXJuZWQgb3V0IHRlcnJpYmxlIVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9hdmVzID4gMSkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShgWW91IGJha2VkICR7bG9hdmVzfSBkZWxpY2lvdXMgbG9hdmVzIG9mIGJyZWFkIWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShgWW91IGJha2VkIGEgZGVsaWNpb3VzIGxvYWYgb2YgYnJlYWQhYCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FuR2l2ZWF3YXkgPSB0cnVlO1xuICAgICAgICBsZXQgZ2l2ZWF3YXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdmVhd2F5XCIpO1xuICAgICAgICBpZiAoZ2l2ZWF3YXlCdXR0b24pIHtcbiAgICAgICAgICAgIGdpdmVhd2F5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICB9XG4gICAgICAgIFJlc291cmNlcy5icmVhZCArPSBsb2F2ZXM7XG4gICAgfVxuICAgIGV2ZW50cy5hZGRFdmVudExpc3RlbmVyKEVbRS5iYWtlXSwgb25CYWtlKTtcbiAgICBiYWtlQnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBldmVudHMuYWRkRXZlbnQoRVtFLmJha2VdKTtcbiAgICB9O1xuXG4gICAgbGV0IGFub3RoZXJKYXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFub3RoZXItamFyXCIpO1xuICAgIGZ1bmN0aW9uIG9uQWRkSmFyKCkge1xuICAgICAgICBpZiAoUmVzb3VyY2VzLm5ld0phcnMuYW1vdW50IDwgMSkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIkRyYXQhIFlvdSBjYW4ndCBmaW5kIGFueSBtb3JlIGphcnMgcmlnaHQgbm93LlwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFzdFZvbHVtZShSZXNvdXJjZXMueWVhc3QpID4gUmVzb3VyY2VzLmphcnMgKyAxKSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IHNjb29wIHNvbWUgc3RhcnRlciBmcm9tIGVhY2ggb2YgeW91ciBqYXJzIGFuZCBwdXQgaXQgaW4gYSBuZXcgamFyIVwiKTtcbiAgICAgICAgICAgIFJlc291cmNlcy5qYXJzKys7XG4gICAgICAgICAgICBSZXNvdXJjZXMubmV3SmFycy5hbW91bnQtLTtcbiAgICAgICAgICAgIGphclZvbHVtZSArPSAzMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJUaGVyZSBpc24ndCBlbm91Z2ggeWVhc3QgdG8gbW92ZSBpbnRvIGEgbmV3IGphci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3BhY2UgbGVmdCBpbiBqYXIgaW5jcmVhc2VzIGJ5IDEwMjQgKGphciBjYXBhY2l0eSlcbiAgICAgICAgLy8gJSBIZWFsdGggaW5jcmVhc2VzXG4gICAgfVxuICAgIGV2ZW50cy5hZGRFdmVudExpc3RlbmVyKEVbRS5hZGRKYXJdLCBvbkFkZEphcik7XG4gICAgYW5vdGhlckphckJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS5hZGRKYXJdKTtcbiAgICB9O1xuXG5cblxuICAgIGxldCB0cmFkZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhZGVcIik7XG4gICAgdHJhZGVCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGV2ZW50cy5hZGRFdmVudChFW0UudHJhZGVdKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGVub3VnaFRvVHJhZGUoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIGxldCB0cmFkZUFtb3VudCA9IE1hdGguZmxvb3IoTWF0aC5taW4oeWVhc3RBbW91bnQoUmVzb3VyY2VzLnllYXN0KSAtIFJlc291cmNlcy5qYXJzLCA0KSk7XG4gICAgICAgIGlmICh0cmFkZUFtb3VudCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFkZUFtb3VudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25UcmFkZSgpIHtcbiAgICAgICAgbGV0IHRyYWRlQW1vdW50ID0gZW5vdWdoVG9UcmFkZSgpXG4gICAgICAgIGlmICghdHJhZGVBbW91bnQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RhcnRlciB0byB0cmFkZSBhd2F5LlwiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQgPSByZW1vdmVZZWFzdChSZXNvdXJjZXMueWVhc3QsIHRyYWRlQW1vdW50LCBSZXNvdXJjZXMuamFycyk7XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIHN0YXJ0ZXIgdG8gdHJhZGUgYXdheS5cIik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBSZXNvdXJjZXMueWVhc3QgPSByZXN1bHQucmVtYWluaW5nO1xuICAgICAgICBSZXNvdXJjZXMuZnJpZW5kc1RvVHJhZGUuYW1vdW50LS07XG4gICAgICAgIGlmIChoZWFsdGgocmVzdWx0LnJlbW92ZWQpIDwgLjcpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3VyIGZyaWVuZCByZXBvcnRzIHRoYXQgdGhlIHN0YXJ0ZXIgd291bGRuJ3QgZ3JvdyBmb3IgdGhlbSBhbmQgZG9lc24ndCBnaXZlIHlvdSBhbnl0aGluZy5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnZlbnRvcnlEaXYhLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWVySW52ZW50b3J5LmFkZE5ld0l0ZW0oKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSB0cmFkZSB5b3VyIGZyaWVuZCBzb21lIHN0YXJ0ZXIgZm9yIFwiICsgaXRlbSk7XG4gICAgICAgICAgICAgICAgcGxheWVySW52ZW50b3J5LnJlbmRlcihcIml0ZW0tbGlzdFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdXIgZnJpZW5kIGFjY2VwdHMgdGhlIHN0YXJ0ZXIgYnV0IGxpZWQgYW5kIGRvZXNuJ3QgaGF2ZSBhbnl0aGluZyB0byBnaXZlIHlvdS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLnRyYWRlXSwgb25UcmFkZSk7XG5cbiAgICBmdW5jdGlvbiBlbm91Z2hGb3JDb21wKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICBpZiAoUmVzb3VyY2VzLmJyZWFkID49IDUpIHtcbiAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgZW50ZXJDb21wZXRpdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW50ZXItY29tcGV0aXRpb25cIik7XG4gICAgZW50ZXJDb21wZXRpdGlvbkJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS5lbnRlckNvbXBldGl0aW9uXSk7XG4gICAgfTtcbiAgICBsZXQgb25FbnRlckNvbXBldGl0aW9uID0gKCkgPT4ge1xuICAgICAgICBsZXQgZW50ZXJDb21wQW1vdW50ID0gZW5vdWdoRm9yQ29tcCgpO1xuICAgICAgICBpZiAoIWVudGVyQ29tcEFtb3VudCkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBkb24ndCBoYXZlIGVub3VnaCBicmVhZCB0byBlbnRlciBpbnRvIHRoZSBjb21wZXRpdGlvbi4gWW91IG5lZWQgNSBsb2F2ZXMuXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgUmVzb3VyY2VzLmJyZWFkIC09IDU7XG4gICAgICAgIGlmIChwbGF5ZXJJbnZlbnRvcnkuYmFraW5nSXRlbXMubGVuZ3RoID09IDQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZW50ZXJlZCB0aGUgY29tcGV0aXRpb24gYW5kIHdvbiAzcmQgcGxhY2UhXCIpXG4gICAgICAgICAgICBwbGF5ZXJQcml6ZSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVySW52ZW50b3J5LmJha2luZ0l0ZW1zLmxlbmd0aCA9PSA1KSB7XG4gICAgICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGVudGVyZWQgdGhlIGNvbXBldGl0aW9uIGFuZCB3b24gMm5kIHBsYWNlIVwiKVxuICAgICAgICAgICAgcGxheWVyUHJpemUgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXllckludmVudG9yeS5iYWtpbmdJdGVtcy5sZW5ndGggPT0gNikge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBlbnRlcmVkIHRoZSBjb21wZXRpdGlvbiBhbmQgd29uIDJuZCBwbGFjZSFcIilcbiAgICAgICAgICAgIHBsYXllclByaXplID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJZb3UgZW50ZXJlZCB0aGUgY29tcGV0aXRpb24gYnV0IGRpZG4ndCBwbGFjZS4uLiA6KCBNYXliZSB5b3UgbmVlZCBzb21lIG1vcmUgdG9vbHMgdG8gbWFrZSB5b3VyIGJyZWFkIGJldHRlciFcIilcbiAgICAgICAgICAgIHBsYXllclByaXplID0gMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmVudGVyQ29tcGV0aXRpb25dLCBvbkVudGVyQ29tcGV0aXRpb24pO1xuXG4gICAgbGV0IGdpdmVhd2F5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnaXZlYXdheVwiKTtcbiAgICBnaXZlYXdheUJ1dHRvbiEub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZXZlbnRzLmFkZEV2ZW50KEVbRS5naXZlYXdheV0pO1xuICAgIH07XG4gICAgbGV0IG9uR2l2ZWF3YXkgPSAoKSA9PiB7XG4gICAgICAgIGlmICghY2FuR2l2ZWF3YXkpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJXaHkgZG8geW91IHRoaW5rIHlvdSBjYW4gZ2l2ZSBhd2F5IGJyZWFkIHRoYXQgeW91IGRvbid0IGhhdmU/IEhvdyBkaWQgeW91IGV2ZW4gY2xpY2sgdGhpcyBidXR0b24/Pz9cIik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVzb3VyY2VzLmJyZWFkIDwgMSkge1xuICAgICAgICAgICAgYWRkTWVzc2FnZShcIllvdSBkb24ndCBoYXZlIGFueSBicmVhZCB0byBnaXZlIGF3YXkuXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgUmVzb3VyY2VzLmdvb2QgKz0gUmVzb3VyY2VzLmJyZWFkO1xuICAgICAgICBSZXNvdXJjZXMuYnJlYWQgPSAwO1xuICAgICAgICBhZGRNZXNzYWdlKFwiWW91IGdpdmUgYXdheSB5b3VyIGJyZWFkIHRvIHlvdXIgbG9jYWwgbWlkZGxlIHNjaG9vbC4gVGhleSB1c2UgaXQgaW4gYSBiYWtlIHNhbGUuXCIpO1xuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLmdpdmVhd2F5XSwgb25HaXZlYXdheSk7XG5cbiAgICBsZXQgdGhyb3dhd2F5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aHJvd2F3YXlcIik7XG4gICAgdGhyb3dhd2F5QnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBldmVudHMuYWRkRXZlbnQoRVtFLnRocm93YXdheV0pO1xuICAgIH07XG4gICAgbGV0IG9uVGhyb3dhd2F5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB5ZWFzdExvc3QgPSBoYWxmKHllYXN0QW1vdW50KFJlc291cmNlcy55ZWFzdCkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gcmVtb3ZlWWVhc3QoUmVzb3VyY2VzLnllYXN0LCB5ZWFzdExvc3QsIFJlc291cmNlcy5qYXJzKTtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoXCJUaGVyZSdzIG5vdCBlbm91Z2ggeWVhc3QgdG8gdGhyb3cgYXdheSBhbmQgc3RpbGwga2VlcCBlbm91Z2ggZm9yIGdyb3dpbmcuXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc3BpbGxhZ2UgKz0geWVhc3RMb3N0O1xuICAgICAgICBSZXNvdXJjZXMueWVhc3QgPSByZXN1bHQucmVtYWluaW5nO1xuICAgICAgICBhZGRNZXNzYWdlKFwiWW91IHRocmV3IGF3YXkgaGFsZiBvZiB5b3VyIHN0YXJ0ZXIhXCIpO1xuICAgIH07XG4gICAgZXZlbnRzLmFkZEV2ZW50TGlzdGVuZXIoRVtFLnRocm93YXdheV0sIG9uVGhyb3dhd2F5KTtcbiAgICBsZXQgc3BsYXNoU2NyZWVuRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwbGFzaC1zY3JlZW4nKTtcbiAgICBzcGxhc2hTY3JlZW5EaXYhLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgbGV0IHBsYXlBZ2FpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheS1hZ2FpblwiKTtcbiAgICBwbGF5QWdhaW5CdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGdvdG9TdGFydCgpO1xuICAgIH07XG5cbiAgICBnb3RvU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIHNwbGFzaFNjcmVlbkRpdiEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZ2FtZURpdiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBpbnZlbnRvcnlEaXYhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICByZXNldEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICAgIHRocm93YXdheUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgIGdpdmVhd2F5QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFub3RoZXJKYXJCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYmFrZUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhZGRGb29kQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICAgICAgdHJhZGVCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZW50ZXJDb21wZXRpdGlvbkJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBzcGxhc2hTY3JlZW5EaXYhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZ2FtZURpdiEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgaW52ZW50b3J5RGl2IS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfTtcbiAgICBvbkFsbG93QmFrZSA9ICgpID0+IHtcbiAgICAgICAgY2FuQmFrZSA9IHRydWU7XG4gICAgICAgIGJha2VCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICBhZGRNZXNzYWdlKFwiWW91ciBwYXJlbnRzIGNhbGwgYW5kIGdpdmUgeW91IGEgZGVsaWNpb3VzIGJyZWFkIHJlY2lwZS5cIik7XG4gICAgfVxuXG4gICAgcmVuZGVyQnV0dG9ucyA9ICgpID0+IHtcbiAgICAgICAgaWYgKFJlc291cmNlcy5uZXdKYXJzLmFtb3VudCA+IDApIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+YW5vdGhlckphckJ1dHRvbikhLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmFub3RoZXJKYXJCdXR0b24pIS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVub3VnaFRvQmFrZSgpKSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmJha2VCdXR0b24pIS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5iYWtlQnV0dG9uKSEuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChSZXNvdXJjZXMuYnJlYWQgPiAwKSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmdpdmVhd2F5QnV0dG9uKSEuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+Z2l2ZWF3YXlCdXR0b24pIS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVub3VnaFRvVHJhZGUoKSkge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD50cmFkZUJ1dHRvbikhLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmJha2VCdXR0b24pIS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVub3VnaEZvckNvbXAoKSkge1xuICAgICAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5lbnRlckNvbXBldGl0aW9uQnV0dG9uKSEuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICg8SFRNTEJ1dHRvbkVsZW1lbnQ+ZW50ZXJDb21wZXRpdGlvbkJ1dHRvbikhLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9zZSA9ICgpID0+IHtcbiAgICAgICAgdGhyb3dhd2F5QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGdpdmVhd2F5QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFub3RoZXJKYXJCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYmFrZUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhZGRGb29kQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRyYWRlQnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGVudGVyQ29tcGV0aXRpb25CdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZXZlbnRzLmNsZWFyQWxsKCk7XG4gICAgfTtcblxuXG4gICAgbGV0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1nYW1lJyk7XG4gICAgc3RhcnRHYW1lQnV0dG9uIS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpbml0aWFsaXplR2FtZSgpO1xuICAgICAgICAoPEhUTUxBdWRpb0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JnLW11c2ljJykpIS5wbGF5KCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYWxmKGFtb3VudDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihhbW91bnQgLyAyKVxufVxuIiwiY29uc3QgcmFuZG9tSXRlbXNTZXQ6IHN0cmluZ1tdID0gW1xuICBcImFuIG9sZCBzaG9lXCIsXG4gIFwiYSBmcm9nXCIsXG4gIFwiYSBwb21lZ3JhbmF0ZVwiLFxuICBcInRoZSBIaXRjaGhpa2VyJ3MgR3VpZGUgdG8gdGhlIEdhbGF4eVwiLFxuICBcImEgZ2FnZ2xlIG9mIGdlZXNlXCIsXG4gIFwiYSBmcnVpdCByb2xsdXBcIixcbiAgXCJhIG1hcmtlclwiLFxuICBcImEgYmFnIG9mIHBlYW51dHNcIixcbl07XG5cbmNvbnN0IGJha2luZ0l0ZW1zU2V0OiBzdHJpbmdbXSA9IFtcbiAgXCJhIGJha2VyJ3MgaGF0XCIsXG4gIFwiYW4gYXByb25cIixcbiAgXCJhIHJvbGxpbmcgcGluXCIsXG4gIFwiYSB0aGVybW9tZXRlclwiLFxuICBcImEga2l0Y2hlbiB0aW1lclwiLFxuICBcIm92ZW4gbWl0dHNcIixcbl07XG5cbmV4cG9ydCBjbGFzcyBJbnZlbnRvcnkge1xuICBiYWtpbmdJdGVtc1JlbWFpbmluZzogc3RyaW5nW107XG4gIGJha2luZ0l0ZW1zOiBzdHJpbmdbXTtcbiAgcmFuZG9tSXRlbXNSZW1haW5pbmc6IHN0cmluZ1tdO1xuICByYW5kb21JdGVtczogc3RyaW5nW107XG4gIGl0ZW1zOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJha2luZ0l0ZW1zUmVtYWluaW5nID0gYmFraW5nSXRlbXNTZXQubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlKTtcbiAgICB0aGlzLmJha2luZ0l0ZW1zID0gW107XG4gICAgdGhpcy5yYW5kb21JdGVtc1JlbWFpbmluZyA9IHJhbmRvbUl0ZW1zU2V0Lm1hcCgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSk7XG4gICAgdGhpcy5yYW5kb21JdGVtcyA9IFtdO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgfVxuXG4gIGNhbkFkZE5ld0l0ZW0oKTogYm9vbGVhbiB7XG4gICAgbGV0IGl0ZW1zUmVjZWl2ZWQgPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICByZXR1cm4gaXRlbXNSZWNlaXZlZCAhPSByYW5kb21JdGVtc1NldC5sZW5ndGggKyBiYWtpbmdJdGVtc1NldC5sZW5ndGhcbiAgfVxuXG4gIGdldEFsbEl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLm1hcCgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSk7XG4gIH1cblxuICBhZGROZXdJdGVtKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghdGhpcy5jYW5BZGROZXdJdGVtKCkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGxldCBpdGVtc1JlY2VpdmVkID0gdGhpcy5iYWtpbmdJdGVtcy5sZW5ndGggKyB0aGlzLnJhbmRvbUl0ZW1zLmxlbmd0aCArIDE7XG4gICAgbGV0IGdldEJha2luZ0l0ZW1UaHJlc2hvbGQgPSAodGhpcy5iYWtpbmdJdGVtcy5sZW5ndGggLyBpdGVtc1JlY2VpdmVkKTtcbiAgICBsZXQgcmVjZWl2ZWQgPSBcIlwiO1xuICAgIGxldCByYW5kSXRlbSA9IE1hdGgucmFuZG9tKCk7XG4gICAgaWYgKHRoaXMucmFuZG9tSXRlbXNSZW1haW5pbmcubGVuZ3RoID09IDAgfHwgcmFuZEl0ZW0gPiBnZXRCYWtpbmdJdGVtVGhyZXNob2xkKSB7XG4gICAgICBjb25zdCBpdGVtSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmJha2luZ0l0ZW1zUmVtYWluaW5nLmxlbmd0aCk7XG4gICAgICByZWNlaXZlZCA9IHRoaXMuYmFraW5nSXRlbXNSZW1haW5pbmdbaXRlbUluZGV4XTtcbiAgICAgIHRoaXMuYmFraW5nSXRlbXNSZW1haW5pbmcuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG4gICAgICB0aGlzLmJha2luZ0l0ZW1zLnB1c2gocmVjZWl2ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpdGVtSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnJhbmRvbUl0ZW1zUmVtYWluaW5nLmxlbmd0aCk7XG4gICAgICByZWNlaXZlZCA9IHRoaXMucmFuZG9tSXRlbXNSZW1haW5pbmdbaXRlbUluZGV4XTtcbiAgICAgIHRoaXMucmFuZG9tSXRlbXNSZW1haW5pbmcuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG4gICAgICB0aGlzLnJhbmRvbUl0ZW1zLnB1c2gocmVjZWl2ZWQpO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnB1c2gocmVjZWl2ZWQpO1xuXG4gICAgcmV0dXJuIHJlY2VpdmVkO1xuICB9O1xuXG4gIHJlbmRlcihlbGVtOiBzdHJpbmcpIHtcbiAgICBsZXQgaXRlbUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtKVxuICAgIGlmICghaXRlbUxpc3QpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpdGVtTGlzdC5pbm5lckhUTUwgPSBcIjxsaT5cIiArIHRoaXMuaXRlbXMuam9pbihcIjwvbGk+PGxpPlwiKSArIFwiPC9saT5cIjtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=