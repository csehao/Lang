const { Judge, Seer, Witch, Hunter, Guard, Wolf, Villager } = require("./lib/character.js");

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

function verifyDeath(characters, deathList){
    for (var index in characters) {
        if(characters[index].dead != deathList[index]){
            process.stdout.write("Character " + i + " status miss match.");
        }
    }
}

const judge = new Judge().setCharacters(characters);
for(var index in characters){
    characters[index].setJudge(judge);
}

console.log("Seer Reveal");

/*
for(var index in characters){
    console.log(characters[0].reveal(index));
}
*/

verifyDeath(
    characters,
    [ false, false, false, false, false, false, false, false, false, false, false, false ]
);

console.log("Wolf Kill");

characters[4].kill(0);
characters[1].setDaoFa(1, 0);

verifyDeath(
    characters,
    [ true, false, false, false, false, false, false, false, false, false, false, false ]
);

console.log("Witch Med");
characters[1].useMed();

verifyDeath(
    characters,
    [ false, false, false, false, false, false, false, false, false, false, false, false ]
);

console.log("Guard guard");
characters[3].guard(0);

verifyDeath(
    characters,
    [ true, false, false, false, false, false, false, false, false, false, false, false ]
);

console.log("Hunter Hunt");
characters[2].hunt(11);

verifyDeath(
    characters,
    [ true, false, false, false, false, false, false, false, false, false, false, true ]
);

console.log(characters);

console.log('HelloWorld');