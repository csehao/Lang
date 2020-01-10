const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const { GameFactory } = require('../lib/game.js');

function getDeathList(game) {
    return game.characterList.map(character => character.dead);
}

describe('Reguar Setting Test', () => {
    describe('Yu Nv Lie Shou Lang x4 Min X4', () => {
        const characterCodeList = [
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
        ];
        let game;

        const resetGame = () => {
            game = GameFactory.createGame(
                {
                    characterCodeList
                }
            );
        };

        beforeEach(() => {
            resetGame();
        });
        it('Lang Kill One Character Test', () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
            game.characterList[4].kill(0);
            game.characterList[1].fetchDaoFa();
            game.judge.resolveStatus();
            expect(getDeathList(game)).to.deep.equal(
                [true, false, false, false, false, false, false, false, false, false, false, false]
            );
        });
        it('Lang Kill One None Witch Character and Use Med Test', () => {
            game.characterList[4].kill(0);
            game.characterList[1].fetchDaoFa();
            game.characterList[1].useMed();
            game.judge.resolveStatus();
            expect(getDeathList(game)).to.deep.equal(
                [false, false, false, false, false, false, false, false, false, false, false, false]
            );
        });
        it('Lang Kill One and Guard Guards Target Test', () => {
            for (const killTarget in game.characterList) {
                resetGame();
                game.characterList[4].kill(killTarget);
                game.characterList[3].guard(killTarget);
                game.judge.resolveStatus();
                expect(getDeathList(game)).to.deep.equal(
                    [false, false, false, false, false, false, false, false, false, false, false, false]
                );
            }
        });
        it('Lang Kill One and Guard Guards Another Target Test', () => {
            for (const index in game.characterList) {
                resetGame();
                const killTarget = parseInt(index); 
                const guardTarget = ( killTarget + Math.floor(Math.random() * (characterCodeList.length - 2 ) + 1)) % characterCodeList.length;
                game.characterList[4].kill(killTarget);
                game.characterList[3].guard(guardTarget);
                game.judge.resolveStatus();
                const expectedResult = [false, false, false, false, false, false, false, false, false, false, false, false];
                expectedResult[killTarget] = true;
                expect(getDeathList(game)).to.deep.equal(expectedResult);
            }
        });
    });
});