const { JudgeFactory, CharacterFactory, CharacterListFactory } = require('./character');
class GameFactory{
    /* 
        settings: {
            judgeFactory,
            characterFactory
        }
    */
    static createGame(settings) {
        const judgeFactory = settings.judgeFactory || new JudgeFactory();
        const characterListFactory = settings.characterListFactory || new CharacterListFactory(settings.characterCodeList);
        return Game.getInstance(judgeFactory, characterListFactory);
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
   static getInstance(judgeFactory, characterListFactory){
       const judge = judgeFactory.createJudge();
       const characters = characterListFactory.createCharacterList();
       judge.setCharacters(characters);
       characters.forEach(character => character.setJudge(judge));
       for (const index in characters) {
           characters[index].setPosition(index);
       }
       return new Game().setJudge(judge).setCharacterList(characters);
   }
   setJudge(judge){
     this.judge = judge;
     return this;
   }
   setCharacterList(characterList){
     this.characterList = characterList;
     return this;
   }
}

module.exports = {
    GameFactory
}