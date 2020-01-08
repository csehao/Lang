class Event {
    constructor(){
        this.valid = true;
    }
    setJudge(judge){
        this.judge = judge;
        return this;
    }
    setSource(src){
        this.src = src;
        return this;
    }
    setDestination(dst){
        this.dst = dst;
        return this;
    }
    invalid(){
        this.valid = false;
    }
    resolveEffect(){
    }
}

class CharacterEvent extends Event {
    resolve(){
    }
}

class EventEvent extends Event {
    resolve(){
    }
}

class UseReveal extends Event {
    settleActionOnCharacters(){
    }
}

class UsePoison extends Event {
    settleActionOnCharacters(){
    }
}

class UseMed extends EventEvent {
    settleActionOnCharacters(){
    }
    setTargetEvent(targetEvent){
        this.targetEvent = targetEvent;
        return this;
    }
    resolve(){
        // target event is a kill event
        this.targetEvent.invalid();
    }
    resolveEffect(){
        const targetCharacter = this.judge.characters[this.dst];
        const eventList = targetCharacter.eventList;
        for (let event of eventList) {
            if (event.constructor.name === 'UseKill' ) {
                event.invalid();
                break;
            }
        }
        for (let event of eventList) {
            if (event.constructor.name === 'UseGuard') {
                this.judge.sendAction(new MedAndGuard().setSource(this.src).setDestination(this.dst));
                break;
            }
        }
    }
}

class UseHunt extends Event {
    settleActionOnCharacters(){
    }
}

class UseGuard extends Event {
    settleActionOnCharacters(){
    }
    resolveEffect(){
        const targetCharacter = this.judge.characters[this.dst];
        const eventList = targetCharacter.eventList;
        for (let event of eventList) {
            if (event.constructor.name === 'UseKill') {
                event.invalid();
                break;
            }
        }
        for (let event of eventList) {
            if (event.constructor.name === 'UseMed') {
                this.judge.sendAction(new MedAndGuard().setSource(this.src).setDestination(this.dst));
                break;
            }
        }
    }
}

class UseKill extends Event {
    settleActionOnCharacters(){
    }
}

class MedAndGuard extends Event {
    settleActionOnCharacters(){
    }
}

module.exports = {
    UseReveal,
    UsePoison,
    UseMed,
    UseHunt,
    UseGuard,
    UseKill,
    MedAndGuard
}