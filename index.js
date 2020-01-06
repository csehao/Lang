const { Judge, Seer, Witch, Hunter, Guard, Wolf, Villager } = require("./lib/character.js");

const characters = [
    new Seer(), 
    new Witch(), 
    new Hunter(),
    new Guard(),
    new Wolf(),
    new Wolf(),
    new Wolf(),
    new Wolf(),
    new Villager(),
    new Villager(),
    new Villager(),
    new Villager()
];

const judge = new Judge().setCharacters(characters);
for(var index in characters){
    characters[index].setJudge(judge);
}
console.log(characters);
judge.printStatus();

for(var index in characters){
    console.log(characters[0].reveal(index));
}

characters[4].kill(0);
characters[1].setDaoFa(1, 0);
judge.printStatus();

characters[1].useMed();
judge.printStatus();

characters[3].guard(0);
judge.printStatus();

characters[2].hunt(11);
judge.printStatus();

console.log('HelloWorld');