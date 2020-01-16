const { CharacterListFactory } = require('./character');
const { JudgeFactory } = require('./judge');
class GameFactory {
    /* 
        settings: {
            judgeFactory,
            characterFactory
        }
    */
    static createGame(settings) {
        const judgeFactory = settings.judgeFactory || new JudgeFactory();
        const characterListFactory = settings.characterListFactory || new CharacterListFactory();
        return Game.getInstance({ characterCodeList: settings.characterCodeList }, judgeFactory, characterListFactory);
    }
}

// APIs of the game
class Game {
    /* 
        characterList: [
            "Y",
            "N",
            "L",
            "S",
            "L",
            "L",
            "L",
            "L",
            "M",
            "M",
            "M",
            "M"
        ]
    */
    static getInstance(settings, judgeFactory, characterListFactory) {
        const judge = judgeFactory.createJudge(settings.characterCodeList);
        const characters = characterListFactory.createCharacterList(settings.characterCodeList);
        judge.setCharacters(characters);
        for (const index in characters) {
            characters[index].setJudge(judge).setPosition(parseInt(index));
        }
        return new Game().setJudge(judge).setCharacterList(characters);
    }
    setJudge(judge) {
        this.judge = judge;
        return this;
    }
    setCharacterList(characterList) {
        this.characterList = characterList;
        return this;
    }
}

module.exports = {
    GameFactory
}