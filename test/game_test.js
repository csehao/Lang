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
            "LR",
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
        it('Seer Reveal Test', () => {
            for (const index in game.characterList) {
                resetGame();
                const revealTarget = parseInt(index); 
                const faction = game.characterList[0].reveal(revealTarget).getRevealResult();
                expect(faction).to.equal(game.judge.characters[revealTarget].faction);
            }
        });
        it('Lang Kill One Character Test', () => {
            game.characterList[4].kill(0);
            game.judge.resolveStatus();
            expect(getDeathList(game)).to.deep.equal(
                [true, false, false, false, false, false, false, false, false, false, false, false]
            );
        });
        it('Lang Kill One None Witch Character and Use Med Test', () => {
            for (const index in game.characterList) {
                resetGame();
                const killTarget = parseInt(index); 
                if(killTarget === 1){
                    continue;
                }
                game.characterList[4].kill(killTarget);
                game.characterList[1].useMed();
                game.judge.resolveStatus();
                expect(getDeathList(game)).to.deep.equal(
                    [false, false, false, false, false, false, false, false, false, false, false, false]
                );
            }
        });
        it('Lang Kill On Witch Character Can not Use Med Test', () => {
                const killTarget = 1;
                game.characterList[4].kill(killTarget);
                game.characterList[1].useMed();
                game.judge.resolveStatus();
                expect(getDeathList(game)).to.deep.equal(
                    [false, true, false, false, false, false, false, false, false, false, false, false]
                );
        });
        it('Lang Kill One and Guard Guards Target Test', () => {
            for (const index in game.characterList) {
                resetGame();
                const killTarget = parseInt(index); 
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
        it('Lang Kill One None Witch and Guard Guards Target and Witch Med Test', () => {
            for (const index in game.characterList) {
                resetGame();
                const killTarget = parseInt(index); 
                if(killTarget === 1){
                    continue;
                }
                const guardTarget = killTarget;
                game.characterList[4].kill(killTarget);
                game.characterList[1].useMed();
                game.characterList[3].guard(guardTarget);
                game.judge.resolveStatus();
                const expectedResult = [false, false, false, false, false, false, false, false, false, false, false, false];
                expectedResult[killTarget] = true;
                expect(getDeathList(game)).to.deep.equal(expectedResult);
            }
        });
        it('Lang Kill Witch and Guard Guards Witch and Witch Med Test', () => {
                resetGame();
                const killTarget = 1;
                const guardTarget = killTarget;
                game.characterList[4].kill(killTarget);
                game.characterList[3].guard(guardTarget);
                game.judge.resolveStatus();
                const expectedResult = [false, false, false, false, false, false, false, false, false, false, false, false];
                expect(getDeathList(game)).to.deep.equal(expectedResult);
        });
        it('Lang Kill One and Witch Poison One', () => {
            for (const index in game.characterList) {
                resetGame();
                const killTarget = parseInt(index); 
                const poisonTarget = ( killTarget + Math.floor(Math.random() * (characterCodeList.length - 2 ) + 1)) % characterCodeList.length;
                game.characterList[4].kill(killTarget);
                game.characterList[1].poison(poisonTarget);
                game.judge.resolveStatus();
                const expectedResult = [false, false, false, false, false, false, false, false, false, false, false, false];
                expectedResult[killTarget] = true;
                expectedResult[poisonTarget] = true;
                expect(getDeathList(game)).to.deep.equal(expectedResult);
            }
        });
        it('Lang Kill One and Witch Poison the Same One', () => {
            for (const index in game.characterList) {
                resetGame();
                const killTarget = parseInt(index); 
                const poisonTarget = killTarget; 
                const guardTarget = killTarget;
                game.characterList[4].kill(killTarget);
                game.characterList[3].guard(guardTarget);
                game.characterList[1].poison(poisonTarget);
                game.judge.resolveStatus();
                const expectedResult = [false, false, false, false, false, false, false, false, false, false, false, false];
                expectedResult[poisonTarget] = true;
                expect(getDeathList(game)).to.deep.equal(expectedResult);
            }
        });
    });
});