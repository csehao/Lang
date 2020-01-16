const { UseReveal, UsePoison, UseMed, UseHunt, UseGuard, UseKill, MedAndGuard, FetchDaoFa } = require('./event');
const { FetchKillInformationCommand } = require('./command');
const { FetchKillInfoRequest, FetchUseHuntInfoRequest, FetchRevealInfoRequest } = require('./request');

class CharacterFactory {
    createCharacter(characterCode) {
        switch (characterCode) {
            case "Y":
                return new Seer();
            case "N":
                return new Witch();
            case "LR":
                return new Hunter();
            case "S":
                return new Guard();
            case "L":
                return new Wolf();
            case "M":
                return new Villager();
        }
    };
}

class CharacterListFactory {
    constructor(characterFactory = new CharacterFactory()) {
        this.characterFactory = characterFactory;
        this.characters = [];
    }
    createCharacterList(characterCodeList) {
        this.characters = characterCodeList.map(characterCode => this.characterFactory.createCharacter(characterCode));
        return this.characters;
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
        return this;
    }
}

class Seer extends Character {
    constructor() {
        super();
        this.setFaction(true);
    }
    reveal(num) {
        this.revealResult = new FetchRevealInfoRequest().setJudge(this.judge).setRevealTarget(num).execute().requestResponse;  
        return this;
    }
    getRevealResult() {
        return this.revealResult;
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
    poison(num) {
        this.poisonUsed = true;
        this.judge.sendEvent(new UsePoison().setSource(this.position).setDestination(num));
    }
    fetchLastKillInformation() {
        const fetchLastKillInformationCommand = new FetchKillInformationCommand().setJudge(this.judge);;
        this.judge.sendCommand(fetchLastKillInformationCommand);
        this.setDaoFa(this.judge.night, fetchLastKillInformationCommand.commandResponse);
    }
    fetchDaoFa() {
        const daoFaEvent = new FetchDaoFa()
        this.judge.sendEvent(daoFaEvent);
        this.setDaoFa(this.judge.night, daoFaEvent.daoFa);
    }
    useMed() {
        this.fetchDaoFa();
        if (this.mostRecentDaoFa !== this.position) {
            this.medUse = true;
            const useMed = new UseMed().setSource(this.position).setDestination(this.mostRecentDaoFa);
            this.judge.sendEvent(useMed);
        }
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
            this.judge.sendEvent(new UseHunt().setSource(this.position).setDestination(num));
        }
    }
}

class Guard extends Character {
    constructor() {
        super();
        this.setFaction(true);
    }
    guard(num) {
        this.judge.sendEvent(new UseGuard().setSource(this.position).setDestination(num));
    }
}

class Wolf extends Character {
    constructor() {
        super();
        this.setFaction(false);
    }
    kill(num) {
        this.judge.sendEvent(new UseKill().setSource(this.position).setDestination(num));
    }
}

class Villager extends Character {
    constructor() {
        super();
        this.setFaction(true);
    }
}

module.exports = {
    Seer,
    Witch,
    Hunter,
    Guard,
    Wolf,
    Villager,
    CharacterListFactory,
    CharacterFactory,
}