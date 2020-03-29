const Letter = require("./Letter");

class Word {
  constructor(word) {
    this.letters = word.split("").map(letter => {
      return new Letter(letter);
    });
  }

  displayWord() {
    // iterate around this.letters and on each iteration we're going to call letter.currentState in order get the character itself if it's been guessed or an underscore if it has not been gussed
    /*
    input:
    letters: [
      Letter { char: 'H', guessedAlready: false },
      Letter { char: 'e', guessedAlready: false },
      Letter { char: 'l', guessedAlready: false },
      Letter { char: 'l', guessedAlread
      y: false },
      Letter { char: 'o', guessedAlready: false }
    ]

      output: '_ _ _ _ _'
    */
    // the .map will itterate around the object "letters"
    const wordString = this.letters.map(letter => {
      return letter.currentState();
    });
    // turn an array into a string, we can use the .join() method
    return wordString.join(" ");
  }

  userGuess(char) {
    // iterate around this.letters and for each letter, check to see if userGuess equals the respective letter
    // input -> 'h'
    let letterFound = false;
    this.letters.map(letter => {
      if (letter.guess(char)) {
        letterFound = true;
      }
    });
    return letterFound;
  }
}

module.exports = Word;
