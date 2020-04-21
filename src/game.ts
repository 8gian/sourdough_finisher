import {
    yeastVolume,
    yeastAmount,
    removeYeast,
    hunger,
    health,
    stepYeast,
    clampYeast,
    feedYeast,
    YeastyGoodness,
    calculateFractions,
    livingYeastAmount,
} from './YeastLogic';

import { EventQueue } from "./events";
import { Inventory } from './inventory';

enum E {
    feed, bake, addJar, giveaway, throwaway, enterCompetition, trade
}

const events = new EventQueue();

let lastEpochMS: number = 0;
let epochInMS: number = 1000;
let runStartInMS: number = 0;
const newJarVolume: number = 32;

// Initialize
let spillage: number = 0;
let ovenSize: number = 1;
let canBake: boolean = false;
let canGiveaway: boolean = false;
let canTrade: boolean = false;
let jarVolume: number = 32;
let gameStarted: boolean = false;
let filledVolume: number = 0;
let playerInventory = new Inventory();
let playerPrize: number = 0;

class IntegralRefillingResource {
    amount: number = 0;
    epochsPerRefresh: number = 0;
    remainingEpochs: number = 0;
    increasePerRefresh: number = 0;
    limit: number = 0;
    onIncrease: (() => void) | undefined;

    constructor(amount: number, increasePerRefresh: number, epochsPerRefresh: number, limit: number, onIncrease?: (() => void)) {
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
            } else if (this.onIncrease) {
                this.onIncrease();
            }
        }
    }
}

type ResourcesType = {
    yeast: YeastyGoodness,
    good: number,
    bread: number,
    jars: number,
    newJars: IntegralRefillingResource,
    friendsToTrade: IntegralRefillingResource,
    competitions: IntegralRefillingResource
};

let dead: boolean = false;

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
        return
    }
    if (yeastAmount(Resources.yeast) >= Resources.jars + 4 && health(Resources.yeast) >= .8) {
        onAllowBake();
    }
}

let Resources: ResourcesType = {
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
        createjs.Ticker.addEventListener('tick', function (eventObj: Object) {
            gameLoop(<createjs.TickerEvent>eventObj);
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
    playerInventory = new Inventory();
    resetButtons();
    addMessage("Unfortunately, you are starting from scratch. Your friend has given you a starter, but you'll need to feed it. He says that he already fed it so you might want to wait a bit.");
    runStartInMS = createjs.Ticker.getTime(true);
}

let messages: string[] = [];

function addMessage(message: string) {
    messages.unshift(message);
    if (messages.length > 10) {
        messages.pop();
    }
}

function renderMessages(messages: string[]): string {
    return '<p>' + messages.map((value, index, array) => `${value}`).join('\n<br>\n') + '</p>'
}

function setElement(id: string, contents: string) {
    const elem = document.getElementById(id);
    if (!elem) return;
    elem.innerText = contents;
}

function setElementHTML(id: string, contents: string) {
    const elem = document.getElementById(id);
    if (!elem) return;
    elem.innerHTML = contents;
}

function placedText(): string {
    if (playerPrize < 1) {
        return "You never placed in competition";
    } else if (playerPrize >= 1 && playerPrize < 2) {
        return "You reached third place in competition!"
    } else if (playerPrize >= 2 && playerPrize < 3) {
        return "You reached second place in competition!"
    } else {
        return "Wow, you reached first place in competition and achieved your goal of becoming a master baker!"
    }
}

function render() {
    // Render the jar
    document.getElementById('jar-capacity')!.innerText = '' + jarVolume;
    document.getElementById('jars-filled')!.innerText = '' + Resources.jars;
    document.getElementById('usable-starter-amount')!.innerText = '' + (Math.round(yeastAmount(Resources.yeast)) - Resources.jars);
    document.getElementById('total-starter-amount')!.innerText = '' + Math.round(yeastAmount(Resources.yeast));
    document.getElementById('used')!.innerText = `${Math.floor(yeastVolume(Resources.yeast) / jarVolume * 100)}%`;
    document.getElementById('hunger')!.innerText = `${Math.round(hunger(Resources.yeast) * 100)}%`;
    document.getElementById('health')!.innerText = `${Math.round(health(Resources.yeast) * 100)}%`;
    document.getElementById('stash-bread')!.innerText = `${Resources.bread}`;
    document.getElementById('food-waste')!.innerText = `${Math.round(spillage)}`;
    setElementHTML('message-log', renderMessages(messages));
    setElement("place-reached", placedText())
    setElement("loaves-donated", "" + Resources.good);

    const fractions: YeastyGoodness = calculateFractions(Resources.yeast);
    setElement(
        'debug_quantity',
        `${
        Resources.yeast.fed +
        Resources.yeast.happy +
        Resources.yeast.waiting +
        Resources.yeast.hungry +
        Resources.yeast.starving +
        Resources.yeast.dead
        }`
    );
    renderButtons();
    setElement('debug_fed', `${Math.round(fractions.fed * 100)}%`);
    setElement('debug_happy', `${Math.round(fractions.happy * 100)}%`);
    setElement('debug_waiting', `${Math.round(fractions.waiting * 100)}%`);
    setElement('debug_hungry', `${Math.round(fractions.hungry * 100)}%`);
    setElement('debug_starving', `${Math.round(fractions.starving * 100)}%`);
    setElement('debug_dead', `${Math.round(fractions.dead * 100)}%`);
}

function evolveResources(epochs: number) {
    for (let i = 0; i < epochs; i++) {
        Resources.yeast = stepYeast(Resources.yeast);
        Resources.newJars.step();
        Resources.friendsToTrade.step();
        Resources.competitions.step();
    }
    checkFirstBake();
}

function gameLoop(event: createjs.TickerEvent): void {
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
        if (livingYeastAmount(Resources.yeast) < .5) {
            dead = true;
            addMessage("Your poor yeast is dead.")
            onLose();
        }
    }

    if (!dead) {
        const [newYeast, newSpill] = clampYeast(jarVolume, Resources.yeast);
        Resources.yeast = newYeast;
        if (newSpill > 0) {
            addMessage("Oh no! Your starter overflowed, and yeast is all over the floor.")
        }
        spillage += newSpill;
    }

    render();
}

function addFood() {
    // console.log('Adding food')!;k
    // console.log(Resources.yeast);
    const oldHealth = health(Resources.yeast);

    Resources.yeast = feedYeast(1, Resources.yeast);
    //console.log(Resources.yeast);
    const [newYeast, newSpill] = clampYeast(jarVolume, Resources.yeast);
    Resources.yeast = newYeast;
    spillage += newSpill;
    const newHealth = health(Resources.yeast);
    if (newHealth > oldHealth) {
        addMessage('You fed your sourdough starter, and it looks better!');
    } else if (newHealth == oldHealth) {
        addMessage('You fed your sourdough starter');
    } else {
        addMessage('You fed your sourdough starter, but you think you might have overfed it...');
    }
}

let onLose = () => { };

window.onload = () => {
    let gameDiv = document.getElementById('game');
    gameDiv!.style.display = "none";
    let inventoryDiv = document.getElementById("inventory");
    inventoryDiv!.style.display = "none";
    // Add button click listeners
    let addFoodButton = document.getElementById('add-food');
    addFoodButton!.onclick = () => {
        events.addEvent(E[E.feed]);
    }
    let onAddFood = () => {
        console.log('trying to add food');
        addFood();
    };
    events.addEventListener(E[E.feed], onAddFood);

    /* all actions below (currently 5 - bake / another-jar / trade / ga / ta)
  need to decrease the volume by 50%
  */
    function enoughToBake(): number | null {
        let loaves = Math.floor(Math.min(yeastAmount(Resources.yeast) - Resources.jars, 4 * ovenSize) / 4);
        if (loaves < 1) {
            return null;
        }
        return loaves;
    }
    let bakeButton = document.getElementById("bake");
    function onBake() {
        if (!canBake) {
            addMessage("You don't have a bread recipe yet! How did you even hit this button???");
            return
        }
        let loaves = enoughToBake();
        if (!loaves) {
            addMessage("There's not enough yeast to bake with!");
            return
        }
        let yeastLost = loaves * 4;
        let result = removeYeast(Resources.yeast, yeastLost, Resources.jars);
        if (!result) {
            addMessage("There's not enough yeast to bake with!");
            return;
        }
        Resources.yeast = result.remaining;
        if (health(result.removed) < 0.8) {
            console.log(`tried to bake with ${health(result.removed)}`);
            addMessage("You tried to bake with the yeast but it turned out terrible!");
            return;
        }
        if (loaves > 1) {
            addMessage(`You baked ${loaves} delicious loaves of bread!`);
        } else {
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
    bakeButton!.onclick = () => {
        events.addEvent(E[E.bake]);
    };

    let anotherJarButton = document.getElementById("another-jar");
    function onAddJar() {
        if (Resources.newJars.amount < 1) {
            addMessage("Drat! You can't find any more jars right now.");
        } else if (yeastVolume(Resources.yeast) > Resources.jars + 1) {
            addMessage("You scoop some starter from each of your jars and put it in a new jar!");
            Resources.jars++;
            Resources.newJars.amount--;
            jarVolume += 32;
        } else {
            addMessage("There isn't enough yeast to move into a new jar.");
        }
        // Space left in jar increases by 1024 (jar capacity)
        // % Health increases
    }
    events.addEventListener(E[E.addJar], onAddJar);
    anotherJarButton!.onclick = () => {
        events.addEvent(E[E.addJar]);
    };



    let tradeButton = document.getElementById("trade");
    tradeButton!.onclick = () => {
        events.addEvent(E[E.trade]);
    };
    function enoughToTrade(): number | null {
        let tradeAmount = Math.floor(Math.min(yeastAmount(Resources.yeast) - Resources.jars, 4));
        if (tradeAmount < 4) {
            return null;
        }
        return tradeAmount;
    }
    function onTrade() {
        let tradeAmount = enoughToTrade()
        if (!tradeAmount) {
            addMessage("You don't have enough starter to trade away.");
            return
        }
        let result = removeYeast(Resources.yeast, tradeAmount, Resources.jars);
        if (!result) {
            addMessage("You don't have enough starter to trade away.");
            return
        }
        Resources.yeast = result.remaining;
        Resources.friendsToTrade.amount--;
        if (health(result.removed) < 0) {
            addMessage("Your friend reports that the starter wouldn't grow for them and doesn't give you anything.");
        } else {
            inventoryDiv!.style.display = "block";
            const item = playerInventory.addNewItem();
            addMessage("You trade your friend some starter for " + item);
            playerInventory.render("item-list");
        }

    };
    events.addEventListener(E[E.trade], onTrade);

    function enoughForComp(): number | null {
        if (Resources.bread > 5) {
            return 5;
        }
        return null;
    }
    let enterCompetitionButton = document.getElementById("enter-competition");
    enterCompetitionButton!.onclick = () => {
        events.addEvent(E[E.enterCompetition]);
    };
    let onEnterCompetition = () => {
        let enterCompAmount = enoughForComp();
        if (!enterCompAmount) {
            addMessage("You don't have enough bread to enter into the competition. You need 5 loaves.");
            return
        }
        Resources.bread -= 5;
        if (playerInventory.bakingItems.length == 4) {
            addMessage("You entered the competition and won 3rd place!")
            playerPrize = 1;
        } else if (playerInventory.bakingItems.length == 5) {
            addMessage("You entered the competition and won 2nd place!")
            playerPrize = 2;
        } else if (playerInventory.bakingItems.length == 6) {
            addMessage("You entered the competition and won 2nd place!")
            playerPrize = 3;
        } else {
            addMessage("You entered the competition but didn't place... :( Maybe you need some more tools to make your bread better!")
            playerPrize = 0;
        }
    };
    events.addEventListener(E[E.enterCompetition], onEnterCompetition);

    let giveawayButton = document.getElementById("giveaway");
    giveawayButton!.onclick = () => {
        events.addEvent(E[E.giveaway]);
    };
    let onGiveaway = () => {
        if (!canGiveaway) {
            addMessage("Why do you think you can give away bread that you don't have? How did you even click this button???");
            return
        }
        if (Resources.bread < 1) {
            addMessage("You don't have any bread to give away.");
            return
        }
        Resources.good += Resources.bread;
        Resources.bread = 0;
        addMessage("You give away your bread to your local middle school. They use it in a bake sale.");
    };
    events.addEventListener(E[E.giveaway], onGiveaway);

    let throwawayButton = document.getElementById("throwaway");
    throwawayButton!.onclick = () => {
        events.addEvent(E[E.throwaway]);
    };
    let onThrowaway = () => {
        const yeastLost = half(yeastAmount(Resources.yeast));
        let result = removeYeast(Resources.yeast, yeastLost, Resources.jars);
        if (!result) {
            addMessage("There's not enough yeast to throw away and still keep enough for growing.");
            return
        }
        spillage += yeastLost;
        Resources.yeast = result.remaining;
        addMessage("You threw away half of your starter!");
    };
    events.addEventListener(E[E.throwaway], onThrowaway);
    let splashScreenDiv = document.getElementById('splash-screen');
    splashScreenDiv!.style.display = "block";
    let playAgainButton = document.getElementById("play-again");
    playAgainButton!.onclick = () => {
        gotoStart();
    };

    gotoStart = () => {
        splashScreenDiv!.style.display = "block";
        gameDiv!.style.display = "none";
        inventoryDiv!.style.display = "none";
    }

    resetButtons = () => {
        throwawayButton!.style.display = "inline";
        giveawayButton!.style.display = "none";
        anotherJarButton!.style.display = "none";
        bakeButton!.style.display = "none";
        addFoodButton!.style.display = "inline";
        tradeButton!.style.display = "none";
        enterCompetitionButton!.style.display = "none";
        splashScreenDiv!.style.display = "none";
        gameDiv!.style.display = "block";
        inventoryDiv!.style.display = "none";
    };
    onAllowBake = () => {
        canBake = true;
        bakeButton!.style.display = "inline";
        addMessage("Your parents call and give you a delicious bread recipe.");
    }

    renderButtons = () => {
        if (Resources.newJars.amount > 0) {
            (<HTMLButtonElement>anotherJarButton)!.disabled = false;
        } else {
            (<HTMLButtonElement>anotherJarButton)!.disabled = true;
        }
        if (enoughToBake()) {
            (<HTMLButtonElement>bakeButton)!.disabled = false;
        } else {
            (<HTMLButtonElement>bakeButton)!.disabled = true;
        }
        if (Resources.bread > 0) {
            (<HTMLButtonElement>giveawayButton)!.disabled = false;
        } else {
            (<HTMLButtonElement>giveawayButton)!.disabled = true;
        }
        if (enoughToTrade()) {
            (<HTMLButtonElement>tradeButton)!.disabled = false;
        } else {
            (<HTMLButtonElement>bakeButton)!.disabled = true;
        }
        if (enoughForComp()) {
            (<HTMLButtonElement>enterCompetitionButton)!.disabled = false;
        } else {
            (<HTMLButtonElement>enterCompetitionButton)!.disabled = true;
        }
    }

    onLose = () => {
        throwawayButton!.style.display = "none";
        giveawayButton!.style.display = "none";
        anotherJarButton!.style.display = "none";
        bakeButton!.style.display = "none";
        addFoodButton!.style.display = "none";
        tradeButton!.style.display = "none";
        enterCompetitionButton!.style.display = "none";
        events.clearAll();
    };


    let startGameButton = document.getElementById('start-game');
    startGameButton!.onclick = () => {
        initializeGame();
    }
}

function half(amount: number): number {
    return Math.floor(amount / 2)
}
