class Turn {
  constructor(playerGuess, playerCard) {
    this.guess = playerGuess;
    this.card = playerCard;
  }

  returnGuess() {
    return this.guess;
  }

  returnCard() {
    return this.card;
  }

  evaluateGuess() {
    if(this.guess.toUpperCase() === this.card.correctAnswer.toUpperCase()) {
      return true;
    } else {
      return false;
      }
  }
}

module.exports = Turn;
