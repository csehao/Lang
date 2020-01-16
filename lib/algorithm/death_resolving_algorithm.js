const { UseReveal, UsePoison, UseMed, UseHunt, UseGuard, UseKill, MedAndGuard, FetchDaoFa } = require('../event');

class Algorithm {

}

class DeathResolvingAlgorithm extends Algorithm {
    constructor(){
        super();
        this.reset();
    }
    reset(){
        this.resolveResult = null;
    }
    setResolveCondition(events) {
        this.events = events;
        return this;
    }
    resolve() {

    }
}

class WitchAndGuard extends DeathResolvingAlgorithm {
    resolve(){
        let medUsed = false;
        let guardUsed = false;
        for(const index in this.events){
            const event = this.events[index];
            if (event instanceof UseMed) {
                medUsed = true;
            }
            if (event instanceof UseGuard) {
                guardUsed = true;
            }
        }
        if (medUsed && guardUsed){
            this.resolveResult = true;
        }
    }
} 

class KillResolvingAlgorithm extends DeathResolvingAlgorithm {
    resolve(){
        let killCount = 0;
        for(const index in this.events){
            const event = this.events[index];
            if (event instanceof UseKill) {
                killCount++;
            }
            if (event instanceof UseMed) {
                killCount--;
            }
            if (event instanceof UseGuard) {
                killCount--;
            }
        }
        this.resolveResult = (killCount > 0);
    }
} 

class HuntResolvingAlgorithm extends DeathResolvingAlgorithm {
    resolve(){
        const useHunt = false;
        for(const index in this.events){
            const event = this.events[index];
            if (event instanceof UseHunt) {
                useHunt = true;
            }
        }
        this.resolveResult = useHunt;
    }
} 

class PoisonResolvingAlgorithm extends DeathResolvingAlgorithm {
    resolve(){
        let poison = false;
        for(const index in this.events){
            const event = this.events[index];
            if (event instanceof UsePoison) {
                poison = true;
            }
        }
        this.resolveResult = poison;
    }
} 

module.exports = {
    DeathResolvingAlgorithm,
    WitchAndGuard,
    KillResolvingAlgorithm,
    HuntResolvingAlgorithm,
    PoisonResolvingAlgorithm
}