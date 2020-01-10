
const { UseReveal, UsePoison, UseMed, UseHunt, UseGuard, UseKill, MedAndGuard, FetchDaoFa } = require('./event');

class JudgeFactory {
    createJudge() {
        return new Judge();
    }
}

class CharacterFactory {
    createCharacter(characterCode) {
        switch (characterCode) {
            case 'Y':
                return new Seer();
            case 'N':
                return new Witch();
            case 'Li':
                return new Hunter();
            case 'S':
                return new Guard();
            case 'L':
                return new Wolf();
            case 'M':
                return new Villager();
        }
    };
}

class CharacterListFactory {
    constructor(characterCodeList, characterFactory = new CharacterFactory()) {
        this.characterCodeList = characterCodeList;
        this.characterFactory = characterFactory;
        this.characters = [];
    }
    createCharacterList() {
        this.characters = this.characterCodeList.map(characterCode => this.characterFactory.createCharacter(characterCode));
        return this.characters;
    }
}

class Judge {
    constructor() {
        this.night = 0;
    }
    // characters: an array of characters
    setCharacters(characters) {
        this.characters = characters
        return this;
    }
    sendAction(action) {
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

class Character {
    // judge: type Judge
    constructor() {
        this.dead = false;
        this.statusSet = {};
        this.eventList = [];
        this.eventMap = {};
    }
    setJudge(judge) {
        this.judge = judge;
        return this;
    }
    setDeath(dead) {
        this.dead = dead;
        return this;
    }
    setFaction(goodOrBad) {
        this.faction = goodOrBad;
        return this;
    }
    setStatus(status) {
        this.statusSet[status] = true;
        return this;
    }
    setPosition(pos) {
        this.position = pos;
        return this;
    }
    addEvent(event) {
        this.eventList.push(event);
        this.eventMap[event.constructor.name] = event;
    }
}

class Seer extends Character {
    constructor() {
        super();
        this.setFaction(true);
    }
    reveal(num) {
        this.revealAction = new UseReveal().setSource(this.position).setDestination(num);
        this.judge.sendAction(this.revealAction);
    }
    getRevealResult() {
        return this.revealAction.revealResult;
    }
}

class Witch extends Character {
    constructor() {
        super();
        this.DaoFaSet = {};
        this.poisonUsed = false;
        this.medUsed = false;
        this.setFaction(true);
    }
    setDaoFa(night, num) {
        this.DaoFaSet[night] = num;
        this.mostRecentDaoFa = num;
    }
    poinson(num) {
        this.poisonUsed = true;
        this.judge.sendAction(new UsePoison().setSource(this.position).setDestination(num));
    }
    fetchDaoFa() {
        const daoFa = new FetchDaoFa()
        this.judge.sendAction(daoFa);
        this.setDaoFa(this.judge.night, daoFa.daoFa);
    }
    useMed() {
        this.medUse = true;
        const useMed = new UseMed().setSource(this.position).setDestination(this.mostRecentDaoFa);
        this.judge.sendAction(useMed);
    }
}

class Hunter extends Character {
    constructor() {
        super();
        this.hunterStatus = true;
        this.setFaction(true);
    }
    setHunterStatus(status) {
        this.hunterStatus = status;
        return this;
    }
    hunt(num) {
        if (this.hunterStatus) {
            this.hunterStatus = false;
            this.judge.sendAction(new UseHunt().setSource(this.position).setDestination(num));
        }
    }
}

class Guard extends Character {
    constructor() {
        super();
        this.setFaction(true);
    }
    guard(num) {
        this.judge.sendAction(new UseGuard().setSource(this.position).setDestination(num));
    }
}

class Wolf extends Character {
    constructor() {
        super();
        this.setFaction(false);
    }
    kill(num) {
        this.judge.sendAction(new UseKill().setSource(this.position).setDestination(num));
    }
}

class Villager extends Character {
    constructor() {
        super();
        this.setFaction(true);
    }
}

module.exports = {
    Judge,
    Seer,
    Witch,
    Hunter,
    Guard,
    Wolf,
    Villager,
    JudgeFactory,
    CharacterListFactory,
    CharacterFactory,
    JudgeFactory
}