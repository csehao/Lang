// This class encapsulate the commands that send to judge
class Command {
    // commandResponse
    setJudge(judge) {
        this.judge = judge;
        return this;
    }
    execute() {

    }
}

class FetchKillInformationCommand extends Command {
    execute() {
        this.commandResponse = this.judge.lastKillInformation;
    }
}

module.exports = {
    FetchKillInformationCommand
};