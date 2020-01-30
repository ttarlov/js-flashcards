const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');

describe('Turn', function() {

  it('should be a function', function() {
    const turn = new Turn();
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function() {
    const turn = new Turn();
    expect(turn).to.be.an.instanceof(Turn);
  });

describe('returnGuess Method', () => {
  it('should return the guess', () => {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('pug', card);
    expect(turn.returnGuess()).to.equal('pug');
  });
});

describe('returnCard Method', () => {
  it('should return current card', () => {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('pug', card);
    expect(turn.returnCard()).to.equal(card);
  });
});

describe('evaluateGuess Method', () => {
  it('should return true if guess mathes the correct answer', () => {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('object', card);
    expect(turn.evaluateGuess()).to.equal(true)
  })

  it('should return false if guess does not mathes the correct answer', () => {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('wrong-answer', card);
    expect(turn.evaluateGuess()).to.equal(false)
  })
});

describe('giveFeedback Method', () => {
  it('should return positive feedback if guess it correct', () => {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('object', card);
    expect(turn.giveFeedback()).to.equal("Correct! Nice Job")
  });

  it('should return negative feedback if guess it incorrect', () => {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('wrong-answer', card);
    expect(turn.giveFeedback()).to.equal("Incorrect! Try again buddy!");
  });

});

});
