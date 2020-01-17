/**
 * An command, most cases fired by judge, changes the state of a character 
 */
class Event {
    constructor() {
        this.valid = true;
    }
    setJudge(judge) {
        this.judge = judge;
        return this;
    }
    setSource(src) {
        this.src = src;
        return this;
    }
    setDestination(dst) {
        this.dst = dst;
        return this;
    }
}

class UsePoison extends Event {
}

class UseMed extends Event{
}

class UseHunt extends Event {
}

class UseGuard extends Event {
}

class UseKill extends Event {
}

module.exports = {
    UsePoison,
    UseMed,
    UseHunt,
    UseGuard,
    UseKill
}