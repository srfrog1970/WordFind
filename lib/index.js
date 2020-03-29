const inquirer = require('inquirer');
const Word = require('./Word');

const wordArray = ['Hello', 'World', 'Classes']

class Game {
  constructor(){
    this.guessesLeft = 0;
    this.currentWord = null;
  }

  // this method will be responsible for starting the game and resetting the game
  play(){
    this.guessesLeft = 10;
    // create a word using the Word class
    // this needs to be stored in key
    // randomly choose a word from the word array
    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)]
    // console.log(randomWord)
    this.currentWord = new Word(randomWord);
    this.askForLetter();
  }

  askForLetter(){
    console.log(`${playGame.currentWord.displayWord()} \n`);
    console.log(`${this.guessesLeft} guesses remaining ! \n`)
    inquirer
    .prompt([
      {
        type: "input",
        message: "Guess a Letter?",
        name: "letter"
      }
    ])
    // fat arrow functions bind the global value of 'this'. In other words, it persists the value of this so that we can reference the object inside the function
    // if we declare a callback function as such .then(function({letter})), 'this' will be redefined and we can no longer reference the object inside
    .then(({ letter }) => {
      // check userInput against all letters in the currentWord
      const isUserCorrect = playGame.currentWord.userGuess(letter);
    
      // check to see if all letters have been guessed correctly
      let allLettersGuessed = true;
      playGame.currentWord.letters.map((letter) => {
        
        if(!letter.guessedAlready){
          allLettersGuessed = false;
        }
      })

      // if all letters have been guessed correctly, display the full word and stop the game
      if (allLettersGuessed){
        console.log('GAME OVER! YOU WON !!!')
        // Run another inquirer prompt and ask the user if they want to play again, if yes, run this.play();
        return this.playAgain()
      } else if (!isUserCorrect){
        this.guessesLeft--
        // if guessesLeft === 0, stop the game
        if(this.guessesLeft === 0){
         console.log('YOUR OUT OF GUESSES ! GAME OVER.')
         // Run another inquirer prompt and ask the user if they want to play again, if yes, run this.play();
         return this.playAgain()
        }
        // ask for another letter if the user still has guesses remaining
        this.askForLetter()
      } 
      // else, ask the user to enter another letter
      else {
        this.askForLetter()
      }
    });
  }

  playAgain(){
    inquirer
    .prompt([
      {
        type: "confirm",
        message: "Do you want to play again?",
        name: "confirm"
      }
    ]).then(({ confirm }) => {
      if (confirm){
        this.play()
      } else {
        process.exit();
      }
    })
  }
}

const playGame = new Game();
playGame.play();