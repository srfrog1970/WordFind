class Letter {
  constructor(char){
    this.char = char;
    this.guessedAlready = false;
  }

  currentState(){
    if (this.guessedAlready){
      return this.char;
    }
    return '_';
  }

  guess(char){
    // if userinput equals the this letter
    if (char.toUpperCase() === this.char.toUpperCase()){
      // console.log(`Correct! ${char} is found in the word.`)
      // update guessedAlready and set it equal to true
      this.guessedAlready = true;
      return true;
    }
    // console.log(`Incorrect! ${char} is not in the word.`)
    return false;
  }
}

module.exports = Letter;