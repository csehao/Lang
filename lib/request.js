/**
 * An request, most cases fired by character, used to fetch information from judge, would not change the state of judge or any character 
 */
class Request {
    constructor(){
        this.requestResponse = null; 
        this.judge = null;
    }
    setRequestSource(src){
        this.requestSource = src;
        return this;
    }
    setJudge(judge){
        this.judge = judge;
        return this;
    }
}

class FetchKillInfoRequest{
    execute() {
        this.requestResponse = this.judge.getLastKillInfo();
        return this;
    }
}

class FetchUseHuntInfoRequest{
    execute() {
        this.requestResponse = this.judge.getUseHuntInfo();
        return this;
    }
}

class FetchRevealInfoRequest{
    setRevealTarget(revealTarget) {
        this.revealTarget = revealTarget; 
        return this;
    }
    execute() {
        this.requestResponse = this.judge.getFactionInfo(this.revealTarget);
        return this;
    }
}