const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  takeTurn(guess) {
    var turn = new Turn(guess, this.returnCurrentCard());
    if (turn.evaluateGuess() === false) {
      this.incorrectGuesses.push(this.deck[0].id)
    }
    this.turns++
    return turn.giveFeedback();
}

  calculatePercentCorrect() {
    var numOfIncorrectAnswers = this.incorrectGuesses.length
    return Math.floor((((this.turns - numOfIncorrectAnswers) / this.turns) * 100));
  }

  returnCurrentCard() {
    return this.deck[this.turns];
  }

  endRound() {

    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of questions`);
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of questions`;
  }

}
module.exports = Round;
