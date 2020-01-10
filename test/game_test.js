const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const { GameFactory } = require('../lib/game.js');

function getDeathList(game) {
    return game.characterList.map(character => character.dead);
}

describe('Reguar Setting Test', () => {
    describe('Yu Nv Lie Shou Lang x4 Min X4', () => {
        let game;
        beforeEach(() => {
            game = new GameFactory().createGame(
                {
                    characterCodeList: [
                        "Y",
                        "N",
                        "Li",
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
                }
            );
        });
        it('Lang Kill One Character Test', () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
            game.characterList[4].kill(0);
            game.characterList[1].setDaoFa(1, 0);
            game.judge.resolveStatus();
            expect(getDeathList(game)).to.deep.equal(
                [true, false, false, false, false, false, false, false, false, false, false, false]
            );
        });
    });
});