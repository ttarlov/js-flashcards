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
    if (this.guess.toUpperCase() === this.card.correctAnswer.toUpperCase()) {
      return true;
    } else {
      return false;
      }
  }

  giveFeedback() {
    if (this.evaluateGuess() === true) {
      return "You got it! Nice Job";
    } else {
      return "Try again buddy!";
    }
  }
}

module.exports = Turn;
