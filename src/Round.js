const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
    this.timer = 0;
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

  startTimer() {
    this.timer = new Date();
  }

  endTimer() {
    var endTime = new Date();
    var diff = endTime - this.timer
    var seconds = Math.round(diff / 1000);
    var minutes = Math.round(diff / 60000)
    console.log(`****The Round took you ${minutes} Minutes and ${seconds} Seconds****`)
  }

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of questions`);
    this.endTimer();
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of questions`;
  }

}
module.exports = Round;
