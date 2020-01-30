const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round')
const Deck = require('../src/Deck')
const Game = require('../src/Game')
const Card = require('../src/Card');

describe('Game', function() {

  it('should be a function', function() {
    expect(Game).to.be.a('function');
  });

  it('should be an instance of a Round', function() {
    const game = new Game();
    expect(game).to.be.an.instanceof(Game);
  });

  it('should keep track of current round', () => {
    const game = new Game();
    expect(game.currentRound).to.equal(null);
  });

  describe('start() Method', function() {

    it('should be able to start the game', function() {
      card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
      const deck = new Deck([card1, card2, card3])
      const round = new Round(deck)
      const game = new Game();
      game.start();
      expect(game.currentRound).to.an.instanceof(Round);
    });
  });

});
