const { Judge, Seer, Witch, Hunter, Guard, Wolf, Villager } = require("./lib/character.js");

const generateNewGame = () => {
    const characters = [
        new Seer().setPosition(0),
        new Witch().setPosition(1),
        new Hunter().setPosition(2),
        new Guard().setPosition(3),
        new Wolf().setPosition(4),
        new Wolf().setPosition(5),
        new Wolf().setPosition(6),
        new Wolf().setPosition(7),
        new Villager().setPosition(8),
        new Villager().setPosition(9),
        new Villager().setPosition(10),
        new Villager().setPosition(11)
    ];
    const judge = new Judge().setCharacters(characters);
    for (var index in characters) {
        characters[index].setJudge(judge);
    }
    return { characters, judge };
} 


function verifyDeath(characters, deathList){
    for (var index in game.characters) {
        if(game.characters[index].dead != deathList[index]){
            process.stdout.write("Character " + index + " status mismatch.");
        }
    }
}

function verifyReveal(judge, characters, revealList){
    for (var index in game.characters) {
        game.characters[0].reveal(index);
        judge.resolveStatus();
        if(game.characters[0].getRevealResult() != game.characters[index].faction){
            process.stdout.write("Character " + index + " faction mismatch.");
        }
    }
}

let game = generateNewGame(); 
console.log("Seer Reveal");
verifyReveal(
    game.judge,
    game.characters, 
    [ true, true, true, true, false, false, false, false, true, true, true, true ]
);

verifyDeath(
    game.characters,
    [ false, false, false, false, false, false, false, false, false, false, false, false ]
);

game = generateNewGame(); 
console.log("Wolf Kill");

game.characters[4].kill(0);
game.characters[1].setDaoFa(1, 0);

game.judge.resolveStatus();
verifyDeath(
    game.characters,
    [ true, false, false, false, false, false, false, false, false, false, false, false ]
);

game = generateNewGame(); 
console.log("Wolf Kill");
game.characters[4].kill(0);
game.characters[1].setDaoFa(1, 0);
console.log("Witch Med");
game.characters[1].useMed();

game.judge.resolveStatus();
verifyDeath(
    game.characters,
    [ false, false, false, false, false, false, false, false, false, false, false, false ]
);

game = generateNewGame(); 
console.log("Wolf Kill");
game.characters[4].kill(0);
game.characters[1].setDaoFa(1, 0);
console.log("Guard guard");
game.characters[3].guard(0);

game.judge.resolveStatus();
verifyDeath( game.characters, [ false, false, false, false, false, false, false, false, false, false, false, false ]);

game = generateNewGame(); 
console.log("Wolf Kill");
game.characters[4].kill(0);
game.characters[1].setDaoFa(1, 0);
console.log("Witch Med");
game.characters[1].useMed();
console.log("Guard guard");
game.characters[3].guard(0);

game.judge.resolveStatus();
verifyDeath(
    game.characters,
    [ true, false, false, false, false, false, false, false, false, false, false, false ]
);

game = generateNewGame(); 
console.log("Hunter Hunt");
game.characters[2].hunt(11);

game.judge.resolveStatus();
verifyDeath(
    game.characters,
    [ false, false, false, false, false, false, false, false, false, false, false, true ]
);

//console.log(game.characters);

console.log('HelloWorld');