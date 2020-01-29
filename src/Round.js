const Turn = require('../src/Turn');

class Round {
  constructor(cards) {
    this.deck = cards;
    this.turns = 0;
    this.index = 0
    this.incorrectGuesses = [];
  }

  takeTurn(guess) {
    var turn = new Turn(guess, this.deck.cards[this.index]);
    if (turn.evaluateGuess() === false) {
      this.incorrectGuesses.push(this.deck.cards[this.index].id)
    }
    turn.giveFeedback();
    this.turns++
    this.index++
}

  calculatePercentCorrect() {
    var numOfIncorrectAnswers = this.incorrectGuesses.length
    return Math.floor((((this.turns - numOfIncorrectAnswers) / this.turns) * 100));
  }

  returnCurrentCard() {
    return this.deck.cards[this.index];
  }

  endRound() {
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of questions`;
  }

}
module.exports = Round;
