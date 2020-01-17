const {
    DeathResolvingAlgorithm,
    WitchAndGuard,
    KillResolvingAlgorithm,
    HuntResolvingAlgorithm,
    PoisonResolvingAlgorithm
} = require('./algorithm/death_resolving_algorithm');

const { EventHub } = require('./event_hub');
const { UseKill } = require('./event');

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
        this.eventHub = new EventHub();
    }
    addDeathResolvingAlgorithm(algorithm) {
        this.deathResolvingAlgorithm.push(algorithm);
    }
    // characters: an array of characters
    setCharacters(characters) {
        this.characters = characters
        return this;
    }
    sendEvent(event) {
        if(event instanceof UseKill){
            this.setMostRecentDaoFa(event.dst);
        }
        this.eventHub.addEvent(event);
        event.setJudge(this);
        //return event.resolveEffect();
    }
    getMostRecentDaoFa() {
        return this.daoFa;
    }
    getLastKillInfo() {
        return this.daoFa;
    }
    getFactionInfo(num){
        return this.characters[num].faction;
    }
    setMostRecentDaoFa(daoFa) {
        this.daoFa = daoFa;
    }
    // death status
    resolveStatus() {
        for (const index in this.characters) {
            const character = this.characters[index];
            const eventList = this.eventHub.getEventsForDestination(index); 
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