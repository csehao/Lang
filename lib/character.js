
const { UseReveal, UsePoison, UseMed, UseHunt, UseGuard, UseKill } = require('./event');

class Judge{
    // characters: an array of characters
    setCharacters(characters){
        this.characters = characters
        return this;
    }
    sendAction(action){
        this.characters[action.dst].eventList.push(action);
        this.resolveStatus();
    }
    resolveStatus(){
        for(const index in this.characters){
            const character = this.characters[index];
            const { eventList } = character;
            for(const indexOfEventList in eventList ){
                const event = eventList[indexOfEventList];
                character.eventMap[event.constructor.name] = event;
            }
        }
        for(var index in this.characters){
            var character = this.characters[index];
            var status = character.eventMap; 
            if(status['UseReveal']){
                const revealEvent = status['UseReveal'];
                revealEvent.revealResult = this.characters[revealEvent.dst].faction;
            }
            if(status['UsePoison']){
                character.setDeath(true);
            }
            if(status['UseHunt']){
                character.setDeath(true);
            }
            if(status['UseKill']){
                character.setDeath(true);
                if (status['UseMed']) {
                    if (status['UseGuard']) {
                        character.setDeath(true);
                    }
                    else {
                        character.setDeath(false);
                    }
                }
                else{
                    if (status['UseGuard']) {
                        character.setDeath(false);
                    }
                }
            }
        }
    }
    printStatus(){
        console.log();
        for(var i = 0; i < this.characters.length; ++i){
            if(i > 0){
                process.stdout.write(" ,");
            }
            process.stdout.write("Character " + i + ":" + this.characters[i].dead );        
        }
        console.log();
        console.log();
    }
}


class Character{
    // judge: type Judge
    constructor(){
        this.dead = false;
        this.statusSet = {};
        this.eventList = [];
        this.eventMap = {};
    }
    setJudge(judge){
        this.judge = judge;
        return this;
    }
    setDeath(dead){
        this.dead = dead;
        return this;
    }
    setFaction(goodOrBad){
        this.faction = goodOrBad;
        return this;
    }
    setStatus(status){
        this.statusSet[status] = true;
        return this;
    }
    setPosition(pos){
        this.position = pos;
        return this;
    }
}

class Seer extends Character {
    constructor(){
        super();
        this.setFaction(true);
    }
    reveal(num){
        var revealAction = new UseReveal().setSource(this.position).setDestination(num);
        this.judge.sendAction(revealAction);
        return revealAction.revealResult; 
    } 
}

class Witch extends Character {
    constructor(){
        super();
        this.DaoFaSet = {};
        this.poisonUsed = false;
        this.medUsed = false;
        this.setFaction(true);
    }
    setDaoFa(night, num){
        this.DaoFaSet[night] = num;
        this.mostRecentDaoFa = num;
    }
    poinson(num) {
        this.poisonUsed = true;
        this.judge.sendAction(new UsePoison().setSource(this.position).setDestination(num));
    } 
    useMed(){
        this.medUse = true;
        this.judge.sendAction(new UseMed().setSource(this.position).setDestination(this.mostRecentDaoFa));
    }
}

class Hunter extends Character {
    constructor(){
        super();
        this.hunterStatus = true;
        this.setFaction(true);
    }
    setHunterStatus(status){
        this.hunterStatus = status;
        return this;
    }
    hunt(num){
        if(this.hunterStatus){
            this.hunterStatus = false;
            this.judge.sendAction(new UseHunt().setSource(this.position).setDestination(num));
        }
    }
}

class Guard extends Character {
    constructor(){
        super();
        this.setFaction(true);
    }
    guard(num){
        this.judge.sendAction(new UseGuard().setSource(this.position).setDestination(num));
    }
}

class Wolf extends Character {
    constructor(){
        super();
        this.setFaction(false);
    }
    kill(num){
        this.judge.sendAction(new UseKill().setSource(this.position).setDestination(num));
    }
}

class Villager extends Character {
    constructor(){
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
    Villager
}