var gameContainer = document.getElementById('game-container');
var timeLeft = document.getElementById('time');
var score = document.getElementById('score');
var startBtn = document.getElementById('start-btn');
var restartBtn = document.getElementById('restart-btn')
var squares = [];
var intervalId;
var timeRemaining = 30000; // 30 seconds in milliseconds
var gameScore = 0;

function init() {
    // create 50 square elements and add them to the game container
    for (var i = 0; i < 110; i++) {
        var square = document.createElement('div');
        square.classList.add('square');
        square.style.width = '20px';
        square.style.height = '20px';
        square.style.top = Math.floor(Math.random() * 350) + 'px';
        square.style.left = Math.floor(Math.random() * 350) + 'px';
        restartBtn.style.display = 'none';
        square.addEventListener('click', function () {
            this.remove(); // remove square from DOM when clicked
            gameScore++;
            score.textContent = gameScore;
            checkIfAllSquaresClicked();
        });
        squares.push(square);
        gameContainer.appendChild(square);
    }
}


function startGame() {
    // hide start button and show squares
    startBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.display = 'block';
    }
    // start timer
    var startTime = Date.now(); // record start time
    intervalId = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        timeRemaining = Math.max(0, 30000 - elapsedTime);
        var seconds = Math.floor(timeRemaining / 1000);
        var milliseconds = timeRemaining % 1000;
        timeLeft.textContent = seconds + '.' + milliseconds.toString().padStart(3, '0');
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 10); // update every 10 milliseconds
}

function restartGame() {
    // stop timer and hide squares
    clearInterval(intervalId);
    // show final score and reset game
    alert('Game over! Your final score is ' + gameScore);
    gameScore = 0;
    score.textContent = gameScore;
    timeRemaining = 30000;
    timeLeft.textContent = '30.000';
    startBtn.style.display = 'block';
    restartBtn.style.display = 'none';
    squares.forEach(function (square) {
        square.remove(); // remove any remaining squares from DOM
    });
    squares = [];
}

function endGame() {
  // stop timer and hide squares
  clearInterval(intervalId);
  // show final score and reset game
  if (gameScore > 102) {
    alert('You beat the highscore! Your score is ' + gameScore);
  } else {
    alert('Game over! Your final score is ' + gameScore);
  }
  gameScore = 0;
  score.textContent = gameScore;
  timeRemaining = 30000;
  timeLeft.textContent = '30.000';
  startBtn.style.display = 'block';
  restartBtn.style.display = 'none';
  squares.forEach(function (square) {
    square.remove(); // remove any remaining squares from DOM
  });
  squares = [];
}


function checkIfAllSquaresClicked() {
    var allSquaresClicked = true;
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].parentNode) { // check if square is still in the DOM
            allSquaresClicked = false;
            break;
        }
    }
    if (allSquaresClicked) {
        endGame(); // end game if all squares are clicked
    }
}

// initialize game
init();

// add event listener to start button
startBtn.addEventListener('click', function () {
    init();
    startGame();
});
restartBtn.addEventListener('click', function () {
    init();
    restartGame();
});