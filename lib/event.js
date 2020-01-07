class Event {
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
}

class UseReveal extends Event {
    settleActionOnCharacters(){
    }
}

class UsePoison extends Event {
    settleActionOnCharacters(){
    }
}

class UseMed extends Event {
    settleActionOnCharacters(){
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

module.exports = {
    UseReveal,
    UsePoison,
    UseMed,
    UseHunt,
    UseGuard,
    UseKill
}