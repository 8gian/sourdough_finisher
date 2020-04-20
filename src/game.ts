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

enum E {
    feed, bake, addJar, giveaway, throwaway, enterCompetition, trade
}

const events = new EventQueue();

let lastEpochMS: number = 0;
let epochInMS: number = 1000;
const newJarVolume: number = 32;

// Initialize
let spillage: number = 0;
let ovenSize: number = 1;
let canBake: boolean = false;
let canGiveaway: boolean = false;
let jarVolume: number = 32;
let filledVolume: number = 0;

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
            if (this.onIncrease) {
                this.onIncrease();
            }
            this.remainingEpochs = epr;
            this.amount += ipr;
            if (this.amount > this.limit) {
                this.amount = this.limit;
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
};

let dead: boolean = false;

function onFindJar() {
    let anotherJarButton = document.getElementById("another-jar");
    if (anotherJarButton) {
        anotherJarButton.style.display = "inline";
    }
    addMessage("You found another jar!");
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
    newJars: new IntegralRefillingResource(0, 1, 30, 4, onFindJar),
};

let resetButtons = () => { };
let onAllowBake = () => { };
let onFirstJar = () => { };

function initializeGame() {
    messages = [];
    jarVolume = 32;
    filledVolume = 0;
    ovenSize = 1;
    spillage = 0;
    dead = false;
    canBake = false;
    canGiveaway = false;
    events.clearAll();
    Resources = {
        yeast: { fed: 2, happy: 0, waiting: 0, hungry: 0, starving: 0, dead: 1 },
        good: 0,
        bread: 0,
        jars: 1,
        newJars: new IntegralRefillingResource(0, 1, 30, 4, onFindJar),
    };
    resetButtons();
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

function render() {
    // Render the jar
    document.getElementById('jar-capacity')!.innerText = '' + jarVolume;
    document.getElementById('used')!.innerText = `${Math.floor(yeastVolume(Resources.yeast) / jarVolume * 100)}%`;
    document.getElementById('hunger')!.innerText = `${Math.round(hunger(Resources.yeast) * 100)}%`;
    document.getElementById('health')!.innerText = `${Math.round(health(Resources.yeast) * 100)}%`;
    document.getElementById('spillage')!.innerText = `${Math.round(spillage * 100) / 100}`;
    document.getElementById('stash-bread')!.innerText = `${Resources.bread}`;
    setElementHTML('message-log', renderMessages(messages));

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
        if (livingYeastAmount(Resources.yeast) < .01) {
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

createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj: Object) {
    gameLoop(<createjs.TickerEvent>eventObj);
});

function addFood() {
    addMessage('You fed your sourdough starter!');
    console.log('Adding food')!;
    console.log(Resources.yeast);
    Resources.yeast = feedYeast(1, Resources.yeast);
    console.log(Resources.yeast);
    const [newYeast, newSpill] = clampYeast(jarVolume, Resources.yeast);
    Resources.yeast = newYeast;
    console.log(newYeast);
    spillage += newSpill;
    console.log(Resources.yeast);
}

let onLose = () => { };

window.onload = () => {
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
    let bakeButton = document.getElementById("bake");
    function onBake() {
        if (!canBake) {
            addMessage("You don't have a bread recipe yet! How did you even hit this button???");
            return
        }
        let loaves = Math.floor(Math.min(yeastAmount(Resources.yeast) - Resources.jars, 4 * ovenSize) / 4);
        let yeastLost = loaves * 4;
        if (loaves < 1) {
            addMessage("There's not enough yeast to bake with!");
            return;
        }
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


    let playAgainButton = document.getElementById("play-again");
    playAgainButton!.onclick = () => {
        initializeGame();
    };

    let tradeButton = document.getElementById("trade");
    tradeButton!.onclick = () => {
        events.addEvent(E[E.trade]);
    };
    let onTrade = () => {

    };
    events.addEventListener(E[E.trade], onTrade);

    let enterCompetitionButton = document.getElementById("enter-competition");
    enterCompetitionButton!.onclick = () => {
        events.addEvent(E[E.enterCompetition]);
    };
    let onEnterCompetition = () => {

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
            addMessage("There's not enough yeast to throw away!");
            return
        }
        Resources.yeast = result.remaining;
        addMessage("You threw away half of your yeast!");
    };
    events.addEventListener(E[E.throwaway], onThrowaway);

    resetButtons = () => {
        throwawayButton!.style.display = "inline";
        giveawayButton!.style.display = "none";
        anotherJarButton!.style.display = "none";
        bakeButton!.style.display = "none";
        addFoodButton!.style.display = "inline";
        tradeButton!.style.display = "none";
        enterCompetitionButton!.style.display = "none";
    };
    onAllowBake = () => {
        canBake = true;
        bakeButton!.style.display = "inline";
        addMessage("Your parents call and give you a delicious bread recipe.");
    }


    resetButtons();
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
}

function half(amount: number): number {
    return Math.floor(amount / 2)
}
