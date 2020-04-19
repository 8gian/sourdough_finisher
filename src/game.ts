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
} from './YeastLogic';

let lastEpochMS: number = 0;
let epochInMS: number = 1000;
let jarVolume: number = 32;
let filledVolume: number = 0;
let spillage: number = 0;

type ResourcesType = {
    yeast: YeastyGoodness,
    good: number,
    bread: number,
}

let Resources: ResourcesType = {
    yeast: { fed: 1, happy: 0, waiting: 0, hungry: 0, starving: 0, dead: 2 },
    good: 0,
    bread: 0,
}

function setElement(id: string, contents: string) {
    const elem = document.getElementById(id);
    if (!elem) return;
    elem.innerText = contents;
}

function render() {
    // Render the jar
    document.getElementById('jar-capacity')!.innerText = '' + jarVolume;
    document.getElementById('used')!.innerText = '' + filledVolume;
    document.getElementById('spillage')!.innerText = '' + spillage;
    document.getElementById('used')!.innerText = `${yeastVolume(Resources.yeast)}`;
    document.getElementById('hunger')!.innerText = `${Math.round(hunger(Resources.yeast) * 100)}%`;
    document.getElementById('health')!.innerText = `${Math.round(health(Resources.yeast) * 100)}%`;
    document.getElementById('stash-bread')!.innerText = `${Resources.bread}`;

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
    }
}

function gameLoop(event: createjs.TickerEvent): void {
    const epochDelta = createjs.Ticker.getTime(true) - lastEpochMS;
    const resourceEpochs = Math.floor(epochDelta / epochInMS);
    evolveResources(resourceEpochs);
    if (resourceEpochs > 0) {
        lastEpochMS += resourceEpochs * epochInMS;
    }

    const [newYeast, newSpill] = clampYeast(jarVolume, Resources.yeast);
    Resources.yeast = newYeast;
    spillage += newSpill;

    render();
}

createjs.Ticker.framerate = 30.0;
createjs.Ticker.addEventListener('tick', function (eventObj: Object) {
    gameLoop(<createjs.TickerEvent>eventObj);
});

function addFood() {
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

window.onload = () => {
    // Add button click listeners
    let addFoodButton = document.getElementById('add-food');
    addFoodButton!.onclick = () => {
        console.log('trying to add food');
        addFood();
    };

    /* all actions below (currently 5 - bake / another-jar / trade / ga / ta)
  need to decrease the volume by 50%
  */
    let bakeButton = document.getElementById("bake");
    bakeButton!.onclick = () => {
        const yeastLost = half(yeastAmount(Resources.yeast));
        let result = removeYeast(Resources.yeast, yeastLost);
        if (!result) return
        Resources.yeast = result.remaining;
        Resources.bread += yeastLost;
    };

    let anotherJarButton = document.getElementById("another-jar");
    anotherJarButton!.onclick = () => {
        // Space left in jar increases by 1024 (jar capacity)
        // % Health increases
    };

    let tradeButton = document.getElementById("trade");
    tradeButton!.onclick = () => {
        // You gain a “something” (we don’t know the value yet)
    };

    let giveawayButton = document.getElementById("giveaway");
    giveawayButton!.onclick = () => {
        // You gain some amount of “good” -- hidden counter to be revealed later
        const yeastLost = half(yeastAmount(Resources.yeast));
        let result = removeYeast(Resources.yeast, yeastLost);
        if (!result) return
        Resources.yeast = result.remaining;
        Resources.good += yeastLost;
        console.log(Resources.good)
    };

    let throwawayButton = document.getElementById("throwaway");
    throwawayButton!.onclick = () => {
        const yeastLost = half(yeastAmount(Resources.yeast));
        let result = removeYeast(Resources.yeast, yeastLost);
        if (!result) return
        Resources.yeast = result.remaining;
    };
}

function half(amount: number): number {
    return Math.floor(amount / 2)
}
