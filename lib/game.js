const { JudgeFactory, CharacterFactory, CharacterListFactory } = require('./character');
class GameFactory{
    /* 
        settings: {
            judgeFactory,
            characterFactory
        }
    */
    createGame(settings) {
        const judgeFactory = settings.judgeFactory || new JudgeFactory();
        const characterListFactory = settings.characterListFactory || new CharacterListFactory();
        this.judge = judgeFactory.createJudge();
        this.characters = characterListFactory.createCharacterList(settings.characterCodeList);
        this.judge.setCharacters(this.characters);
        this.characters.forEach(character => character.setJudge(this.judge));
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
    getGame(settings){
        const { characterList } = settings;
    }
}

module.exports = {
    GameFactory
}