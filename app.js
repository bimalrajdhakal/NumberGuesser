/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values

let min=1,
    max=10,
    winningNum= getRandomNum(min,max),
    guessesLeft=3;

// UI elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.getElementById('guess-btn'),
      guessInput = document.getElementById('guess-input'),
      message = document.querySelector('.message');

// Assign min and max

minNum.textContent = min;
maxNum.textContent = max;

// play again event listener 

game.addEventListener('mousedown',function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess button 
guessBtn.addEventListener('click',function(){
let guessNum = parseInt(guessInput.value);

// validate input 
  if(isNaN(guessNum) || guessNum < min || guessNum > max){
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
  }

  // check if won
  if(guessNum === winningNum){
    gameOver(true,`${winningNum} is correct! You win !!!`);
  }else{
    // wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over - lost 
       gameOver(false,`Game over , You lost. The winning number is ${winningNum}`);

    }else{
      // Game continues - answer wrong 
      // change border color 
      guessInput.style.borderColor = 'red';
      // clear input
      guessInput.value = '';
      // Notify user entered number is not correct and guesses left 
      setMessage(`${guessNum} is not correct, ${guessesLeft} guesses left.`,'red');
    }
  }
});

// Game over 

function gameOver(won,msg){

  let color;
  won===true? color = 'green' : color = 'red';
  // disable input 
  guessInput.disabled = true;
  // change border color 
  guessInput.style.borderColor = color;
  // set text color 
  message.style.color = color;
  // set message 
  setMessage(msg);

  // Play Again ?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// get random winning number 
function getRandomNum(min,max){
return Math.floor(Math.random()*(max-min+1)+min);
}
// set Message function 

function setMessage(msg , color){
  message.style.color = color;
  message.textContent = msg;
}