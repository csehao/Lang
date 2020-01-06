class Judge{
    // characters: an array of characters
    setCharacters(characters){
        this.characters = characters
        return this;
    }
    sendAction(action){
        action.setCharacters(this.characters).settleActionOnCharacters();
        this.resolveStatus();
    }
    resolveStatus(){
        for(var index in this.characters){
            var character = this.characters[index];
            var status = character.statusSet; 
            if(status['poinsoned']){
                character.setDeath(true);
            }
            if(status['hunted']){
                character.setDeath(true);
            }
            if(status['killed']){
                character.setDeath(true);
                if (status['meded']) {
                    if (status['guarded']) {
                        character.setDeath(true);
                    }
                    else {
                        character.setDeath(false);
                    }
                }
                else{
                    if (status['guarded']) {
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


class Action {
    setCharacters(characters){
        this.characters = characters;
        return this;
    }
}

class UseReveal extends Action {
    constructor(num){
        super();
        this.useRevealOn = num;
    }
    settleActionOnCharacters(){
        this.revealResult = this.characters[this.useRevealOn].faction;
    }
}

class UsePoison extends Action {
    constructor(num){
        super();
        this.usePoisonOn = num;
    }
    settleActionOnCharacters(){
        this.characters[this.usePoisonOn].setStatus('poisoned');
    }
}

class UseMed extends Action {
    constructor(num){
        super();
        this.useMedOn = num;
    }
    settleActionOnCharacters(){
        this.characters[this.useMedOn].setStatus('meded');
    }
}

class UseHunt extends Action {
    constructor(num){
        super();
        this.useHuntOn = num;
    }
    settleActionOnCharacters(){
        this.characters[this.useHuntOn].setStatus('hunted');
    }
}

class UseGuard extends Action {
    constructor(num){
        super();
        this.useGuardOn = num;
    }
    settleActionOnCharacters(){
        this.characters[this.useGuardOn].setStatus('guarded');
    }
}

class UseKill extends Action {
    constructor(num){
        super();
        this.useKillOn = num;
    }
    settleActionOnCharacters(){
        this.characters[this.useKillOn].setStatus('killed');
    }
}

class Character{
    // judge: type Judge
    constructor(){
        this.dead = false;
        this.statusSet = {};
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
    }
    setStatus(status){
        this.statusSet[status] = true;
    }
}

class Seer extends Character {
    constructor(){
        super();
        this.setFaction(true);
    }
    reveal(num){
        var revealAction = new UseReveal(num);
        this.judge.sendAction(revealAction);
        return revealAction.revealResult; 
    } 
    setJudge(judge){
        this.judge = judge;
        return this;
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
        this.judge.sendAction(new UsePoison(num));
    } 
    useMed(){
        this.medUse = true;
        this.judge.sendAction(new UseMed(this.mostRecentDaoFa));
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
            this.judge.sendAction(new UseHunt(num));
        }
    }
}

class Guard extends Character {
    constructor(){
        super();
        this.setFaction(true);
    }
    guard(num){
        this.judge.sendAction(new UseGuard(num));
    }
}

class Wolf extends Character {
    constructor(){
        super();
        this.setFaction(false);
    }
    kill(num){
        this.judge.sendAction(new UseKill(num));
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