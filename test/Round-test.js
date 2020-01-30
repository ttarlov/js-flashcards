const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Deck = require('../src/Deck');
const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Round', function() {
  let card1;
  let card2;
  let card3;
  let deck;
  let round;

  beforeEach(() => {
   card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
   card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
   card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
   card4 = new Card(13, 'What is Bobbies\'s favorite toy', ['Apple', 'Fiddle', 'Fleshlight'], 'Fleshlight');
   deck = new Deck([card1, card2, card3, card4])
   round = new Round(deck);
  });

it('should be a function', () => {
  expect(Round).to.be.a('function');
});

it('should be an instance of a Round', function() {
  expect(round).to.be.an.instanceof(Round);
});

it('should take cards into deck array', function() {
  expect(round.deck).to.deep.equal([card1, card2, card3, card4]);
});

it('should return first card in the deck', function() {
  expect(round.deck[0]).to.equal(card1);
});

  describe('takeTurn Method', () => {

    it('should update the turn count', () => {
      expect(round.turns).to.equal(0)
      round.takeTurn('sea otter');
      expect(round.turns).to.equal(1);
      round.takeTurn('sea otter');
      expect(round.turns).to.equal(2);
    });

    it('should keep track of incorrect guesses', () => {
      expect(round.incorrectGuesses.length).to.deep.equal(0);
      round.takeTurn('pug');
      expect(round.incorrectGuesses.length).to.deep.equal(1);
      round.takeTurn('gallbladder');
      expect(round.incorrectGuesses.length).to.deep.equal(1);
      round.takeTurn('listening to music');
      expect(round.incorrectGuesses.length).to.deep.equal(2);
    });

    it('should provide positive feedback for correct answeres' , () => {
      let turn = new Turn('gallbladder', card2)
      expect(turn.giveFeedback()).to.equal('Correct! Nice Job')
    });

    it('should provide negative feedback for incorrect answeres' , () => {
      let turn = new Turn('pug', card2)
      expect(turn.giveFeedback()).to.equal('Incorrect! Try again buddy!')
    });

  });

  describe('calculatePercentCorrect Method', () => {

    it('should calcualte the percentage of correct answeres', () => {
      const deck = new Deck([card1, card2, card3, card4]);
      const round = new Round(deck);
      round.takeTurn('pug');
      round.takeTurn('gallbladder');
      round.takeTurn('listening to music');
      round.takeTurn('Fleshlight');
      expect(round.calculatePercentCorrect()).to.equal(50);
    });

  });

  describe('returnCurrentCard Method', () => {

    it('should return current card', () => {
      expect(round.returnCurrentCard()).to.equal(round.deck[round.turns]);
    });
  });

  describe('endRound() Method', () => {

    it('should tell you round is over and print percentage of correct answers', () => {
      let turn1 = new Turn('pug', card1);
      let turn2 = new Turn('gallbladder', card2);
      let turn3 = new Turn('Lex', card3);
      let turn4 = new Turn('Fleshlight', card4);

      round.takeTurn('pug');
      round.takeTurn('gallbladder');
      round.takeTurn('Lex');
      round.takeTurn('Fleshlight');
      round.endRound();
      expect(round.endRound()).to.equal(`** Round over! ** You answered 50% of questions`)
    });

  });


});
