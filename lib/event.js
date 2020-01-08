class Event {
    constructor(){
        this.invalidated = false;
    }
    setCharacters(characters){
        this.characters = characters;
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
    setInvalid(invalidated){
        this.invalidated = invalidated;
    }
    invalid(){
        this.setInvalid(true);
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
}

class UseHunt extends Event {
    settleActionOnCharacters(){
    }
}

class UseGuard extends Event {
    settleActionOnCharacters(){
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