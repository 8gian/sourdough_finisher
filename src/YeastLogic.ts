export interface YeastyGoodness {
    fed: number;
    happy: number;
    waiting: number;
    hungry: number;
    starving: number;
    dead: number;
}

const constants: {
    maturationRate: YeastyGoodness;
    healthMultiplier: YeastyGoodness;
    hungerMultiplier: YeastyGoodness;
    volumeMultiplier: YeastyGoodness;
} = {
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

type ConstantYeast = {
    readonly fed: number,
    readonly happy: number,
    readonly waiting: number,
    readonly hungry: number,
    readonly starving: number,
    readonly dead: number,
}

const emptyYeast: ConstantYeast = {
    fed: 0,
    happy: 0,
    waiting: 0,
    hungry: 0,
    starving: 0,
    dead: 0,
}

export function constantYeast(yeast: YeastyGoodness): ConstantYeast {
    return yeast;
}

export function addYeast(yeast: YeastyGoodness, newYeast: YeastyGoodness): YeastyGoodness {
    return {
        fed: yeast.fed + newYeast.fed,
        happy: yeast.happy + newYeast.happy,
        waiting: yeast.waiting + newYeast.waiting,
        hungry: yeast.hungry + newYeast.hungry,
        starving: yeast.starving + newYeast.starving,
        dead: yeast.dead + newYeast.dead,
    };
}

export function mapYeast(yeast: YeastyGoodness, f: (prop: number) => number): YeastyGoodness {
    return {
        fed: f(yeast.fed),
        happy: f(yeast.happy),
        waiting: f(yeast.waiting),
        hungry: f(yeast.hungry),
        starving: f(yeast.fed),
        dead: f(yeast.dead),
    }
}

export function copyYeast(yeast: YeastyGoodness): YeastyGoodness {
    return Object.assign({}, yeast);
}

export function yeastLessThanEqual(yeast: YeastyGoodness, yeast2: YeastyGoodness): boolean {
    return yeast.fed <= yeast2.fed && yeast.happy <= yeast2.happy && yeast.waiting <= yeast2.waiting && yeast.hungry <= yeast2.hungry && yeast.starving <= yeast2.starving && yeast.dead <= yeast2.dead;
}

export function yeastLessThan(yeast: YeastyGoodness, yeast2: YeastyGoodness): boolean {
    return yeast.fed < yeast2.fed && yeast.happy <= yeast2.happy && yeast.waiting <= yeast2.waiting && yeast.hungry <= yeast2.hungry && yeast.starving <= yeast2.starving && yeast.dead <= yeast2.dead;
}

export function subtractYeast(yeast: YeastyGoodness, yeast2: YeastyGoodness): YeastyGoodness {
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

export function hunger(yeast: YeastyGoodness): number {
    const alive = yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving;
    const hungerAbsolute =
        yeast.fed * constants.hungerMultiplier.fed +
        yeast.happy * constants.hungerMultiplier.happy +
        yeast.waiting * constants.hungerMultiplier.waiting +
        yeast.hungry * constants.hungerMultiplier.hungry +
        yeast.starving * constants.hungerMultiplier.starving;
    return hungerAbsolute / alive;
}

export function health(yeast: YeastyGoodness): number {
    const total = yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving + yeast.dead;
    const hungerAbsolute =
        yeast.fed * constants.healthMultiplier.fed +
        yeast.happy * constants.healthMultiplier.happy +
        yeast.waiting * constants.healthMultiplier.waiting +
        yeast.hungry * constants.healthMultiplier.hungry +
        yeast.starving * constants.healthMultiplier.starving;
    return hungerAbsolute / total;
}

export function stepYeast(yeast: YeastyGoodness): YeastyGoodness {
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

export function feedYeast(amount: number, yeast: YeastyGoodness): YeastyGoodness {
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
    } else if (feedMeSeymor + yeast.happy >= amount) {
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
    } else {
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

export function calculateFractions(yeast: YeastyGoodness): YeastyGoodness {
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

export function yeastVolume(yeast: YeastyGoodness): number {
    return (
        yeast.fed * constants.volumeMultiplier.fed +
        yeast.happy * constants.volumeMultiplier.happy +
        yeast.waiting * constants.volumeMultiplier.waiting +
        yeast.hungry * constants.volumeMultiplier.hungry +
        yeast.starving * constants.volumeMultiplier.starving +
        yeast.dead * constants.volumeMultiplier.dead
    );
}

export function clampYeast(maxVolume: number, yeast: YeastyGoodness): [YeastyGoodness, number] {
    const volume = yeastVolume(yeast);
    if (volume <= maxVolume) return [yeast, 0];
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

export function yeastAmount(yeast: YeastyGoodness): number {
    return yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving + yeast.dead;
}

export function livingYeastAmount(yeast: YeastyGoodness): number {
    return yeast.fed + yeast.happy + yeast.waiting + yeast.hungry + yeast.starving;
}

export function removeYeast(yeast: YeastyGoodness, amount: number): { remaining: YeastyGoodness, removed: YeastyGoodness } | null {
    const takeout = Math.floor(amount);
    const currentAmount = yeastAmount(yeast);
    if (takeout < 1) {
        return null
    }
    if (takeout > currentAmount - 1) {
        return null
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