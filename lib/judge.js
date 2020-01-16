
const {
    DeathResolvingAlgorithm,
    WitchAndGuard,
    KillResolvingAlgorithm,
    HuntResolvingAlgorithm,
    PoisonResolvingAlgorithm
} = require('./algorithm/death_resolving_algorithm');

class JudgeFactory {
    createJudge(characterCodeList) {
        const judge = new Judge();
        if(characterCodeList){
            if (characterCodeList.includes("N")) {
                judge.addDeathResolvingAlgorithm(new PoisonResolvingAlgorithm());
            }
            if (characterCodeList.includes("N") && characterCodeList.includes("S")) {
                judge.addDeathResolvingAlgorithm(new WitchAndGuard());
            }
            if (characterCodeList.includes("L")) {
                judge.addDeathResolvingAlgorithm(new KillResolvingAlgorithm());
            }
            if (characterCodeList.includes("LR")) {
                judge.addDeathResolvingAlgorithm(new HuntResolvingAlgorithm());
            }
        }
        return judge;
    }
}

class Judge {
    constructor() {
        this.night = 0;
        this.deathResolvingAlgorithm = [];
    }
    addDeathResolvingAlgorithm(algorithm) {
        this.deathResolvingAlgorithm.push(algorithm);
    }
    // characters: an array of characters
    setCharacters(characters) {
        this.characters = characters
        return this;
    }
    sendEvent(action) {
        if (action.dst !== undefined) {
            this.characters[action.dst].eventList.push(action);
        }
        action.setJudge(this);
        return action.resolveEffect();
    }
    getMostRecentDaoFa() {
        return this.daoFa;
    }
    setMostRecentDaoFa(daoFa) {
        this.daoFa = daoFa;
    }
    // death status
    resolveStatus() {
        for (const index in this.characters) {
            const character = this.characters[index];
            const { eventList } = character;
            for (const indexOfEventList in eventList) {
                const event = eventList[indexOfEventList];
                character.eventMap[event.constructor.name] = event;
            }
        }
        for (const index in this.characters) {
            const character = this.characters[index];
            const { eventList } = character; 
            let dead = false;
            this.deathResolvingAlgorithm.forEach(algorithm => {
                algorithm.reset();
                algorithm.setResolveCondition(eventList).resolve();
                if (algorithm.resolveResult) {
                    dead = true;
                }
            });
            if(dead){
                character.setDeath(dead);
            }
        }
        /*
        for (const index in this.characters) {
            const character = this.characters[index];
            const status = character.eventMap;
            if (status['UseReveal']) {
                const revealEvent = status['UseReveal'];
                revealEvent.revealResult = this.characters[revealEvent.dst].faction;
            }
            if (status['UsePoison']) {
                character.setDeath(true);
            }
            if (status['UseHunt']) {
                character.setDeath(true);
            }
            if (status['UseKill'] && status['UseKill'].valid) {
                character.setDeath(true);
            }

            if (status['MedAndGuard']) {
                character.setDeath(true);
            }
        }
        */
    }
    printStatus() {
        console.log();
        for (const i = 0; i < this.characters.length; ++i) {
            if (i > 0) {
                process.stdout.write(" ,");
            }
            process.stdout.write("Character " + i + ":" + this.characters[i].dead);
        }
        console.log();
        console.log();
    }
}


module.exports = {
    Judge,
    JudgeFactory
}