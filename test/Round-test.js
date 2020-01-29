const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Deck = require('../src/Deck');
const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Round', function() {

it('should be a function', function() {
  const round = new Round();
  expect(Round).to.be.a('function');
});

it('should be an instance of a Round', function() {
  const round = new Round();
  expect(round).to.be.an.instanceof(Round);
});

it('should take cards into deck array', function() {
  const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  const deck = new Deck([card1, card2, card3]);
  const round = new Round(deck);
  expect(round.deck.cards).to.deep.equal([card1, card2, card3]);
});

it('should return first card in the deck', function() {
  const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  const deck = new Deck([card1, card2, card3]);
  const round = new Round(deck);
  expect(round.deck.cards[round.index]).to.equal(card1);
});

it('should update the turn count', function() {
  const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  const deck = new Deck([card1, card2, card3]);
  const round = new Round(deck);
  expect(round.turns).to.equal(0)
  round.takeTurn('sea otter');
  expect(round.turns).to.equal(1);
  round.takeTurn('sea otter');
  expect(round.turns).to.equal(2);
});

it('should keep track of incorrect guesses, iterate to the next card in deck', function() {
  const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  const deck = new Deck([card1, card2, card3]);
  const round = new Round(deck);
  expect(round.incorrectGuesses.length).to.deep.equal(0);
  round.takeTurn('pug');
  expect(round.incorrectGuesses.length).to.deep.equal(1);
  round.takeTurn('gallbladder');
  expect(round.incorrectGuesses.length).to.deep.equal(1);
  round.takeTurn('listening to music');
  expect(round.incorrectGuesses.length).to.deep.equal(2);
})

it('should still keep track of turns', function() {
  const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  const deck = new Deck([card1, card2, card3]);
  const round = new Round(deck);
  round.takeTurn('pug');
  round.takeTurn('gallbladder');
  round.takeTurn('listening to music');
  expect(round.turns).to.equal(3);
});

it('should provide feedback for correct or incorrect answeres' , function() {
  const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  const deck = new Deck([card1, card2, card3]);
  const round = new Round(deck);
  let turn = new Turn('pug', card1);
  round.takeTurn('pug');
  expect(turn.giveFeedback()).to.equal('Try again buddy!')
  turn = new Turn('gallbladder', card2)
  expect(turn.giveFeedback()).to.equal('You got it! Nice Job')
});

it('should calcualte the percentage of correct answeres', function() {
  const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  const card4 = new Card(15, 'What is Billies\'s favorite toy?', ['cat', 'dog', 'fleshlight'], 'fleshlight');

  const deck = new Deck([card1, card2, card3, card4]);
  const round = new Round(deck);
  round.takeTurn('pug');
  round.takeTurn('gallbladder');
  round.takeTurn('listening to music');
  round.takeTurn('fleshlight');
  expect(round.calculatePercentCorrect()).to.equal(50);
});

it('should tell you round is over and tell percentage of correct Answers', function() {
  const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  const card4 = new Card(15, 'What is Billies\'s favorite toy?', ['cat', 'dog', 'fleshlight'], 'fleshlight');

  const deck = new Deck([card1, card2, card3, card4]);
  const round = new Round(deck);

  round.takeTurn('pug');
  round.takeTurn('gallbladder');
  round.takeTurn('listening to music');
  round.takeTurn('fleshlight');
  round.endRound();
  expect(round.endRound()).to.equal(`** Round over! ** You answered 50% of questions`)
});


});
