var colorSquares = document.querySelectorAll(".colorSquare");
var guessColor = document.getElementById("guessColor");
var gameButtons = document.querySelectorAll(".gameButtons");
var resetButton = document.getElementById("reset");
var status = document.getElementById("message");
var modeButtons = document.querySelectorAll(".mode");
var modeButtonLen = modeButtons.length;
var winingSquare;
var numSquares = 6;
var gameWon = false;
var defaultBlue = "steelblue";

init();

function init() {
  
  /* add on click event listeners for squares*/
  for (var i = 0; i < numSquares; i++) {
    colorSquares[i].addEventListener("click", function () {
      if (!gameWon) {
        if (this === winningSquare) {
          win(colorSquares, numSquares);
        }
        else {
          this.style.opacity = 0;
          message.innerHTML = "Try Again";
        }
      }
    });
  }

  /* add play again click event listener */
  resetButton.addEventListener("click", function () {
    resetBoard(colorSquares, numSquares);
    this.innerHTML = "NEW COLORS";
  });

  for (var i = 0; i < modeButtonLen; i++) {

    modeButtons[i].addEventListener("click", function() {

      for (var i = 0; i < modeButtonLen; i++) {
        if (this === modeButtons[i]) {
          this.classList.add("selected");
        } else {
          modeButtons[i].classList.remove("selected");
        }
      }
      numSquares = ((this.textContent === "EASY") ? 3 : 6); 
      resetBoard(colorSquares, numSquares);
    });
  }

  resetBoard(colorSquares, numSquares);
}

function addSelected(el) {
  if (!el.classList.contains("selected")) {
    el.classList.add("selected");
	}
}

function win (el, num) {
  gameWon = true;
  message.innerHTML = "Correct!";
  for (var i = 0; i < num; i++) {
    if (el[i] !== winningSquare) {
      el[i].style.backgroundColor = winningSquare.style.backgroundColor;
    }
    if (el[i].style.opacity <= 0) {
      el[i].style.opacity = 1.0;
    }
  }
  document.getElementById("header").style.background = winningSquare.style.backgroundColor;
  reset.innerHTML = "PLAY AGAIN?";
}

function resetBoard (el, num) {
  gameWon = false;
  for (var i = 0; i < num; i++) {
    rgbVal = randomColor();
    el[i].style.backgroundColor = randomColor();
    el[i].style.opacity = 1.0;
    if (colorSquares[i].style.display === "none") {
      colorSquares[i].style.display = "block";
    }
  }

  for (var i = num; i < colorSquares.length; i++) {
    colorSquares[i].style.display = "none";
  }

  document.getElementById("header").style.background = defaultBlue;
  message.innerHTML = "";
  winningSquare = pickWinner();
  guessColor.innerHTML = winningSquare.style.backgroundColor.toString().toUpperCase();
}

function pickWinner() {
  var randIndex = Math.floor(Math.random()*numSquares);
  return colorSquares[randIndex];
}

function randomColor() {
  var red = Math.floor(Math.random()*256);
  var green = Math.floor(Math.random()*256);
  var blue = Math.floor(Math.random()*256);
  return "rgb("+red+","+green+","+blue+")";
}
