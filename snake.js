// Snake code. Requires jQuery and a canvas element called "drawCanvas"
// game parameters

var backgroundColor = "#333333"; 
var boardColor = "#5577cc";
//var snakeColor = "#dd8888";
var snakeColor = "#99cc44";
var white = "#ffffff";
var black = "#000000";

var squareRadius = 13;
var squaresInRow = 13;
var squaresInColumn = 13;
var n = 13;
var squareSize = 35; // in pixels
var gameWidth = squaresInRow * squareSize;
var gameHeight = squaresInColumn * squareSize;

// key global variable that will be modified 
// by keystrokes, and acted upon after each interval
// of gameSpeed
var snakeNextDir = "right"; // arbitrary starting choice

var gameSpeed = 70;
var snakeLength = 3; // starting value 

var canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, gameWidth, gameHeight);

function clearToBoardColor() {
    ctx.fillStyle = boardColor;
    for (j = 0; j < n; j++) {
        for (k = 0; k < n; k++) {
            roundRect(ctx, j * squareSize, k * squareSize, squareSize,
                      squareSize, squareRadius, true, true);
        }
    }
}

clearToBoardColor(); // initialize cleared board state
var randCol = Math.floor(Math.random()*squaresInColumn);
// assume snake is facing to the right. Make sure all snake originates on board
var randRow = Math.floor(Math.random()*(squaresInRow-snakeLength)+snakeLength);
randCol = 5;
randRow = 5;
var keyRectIndex = [randCol, randRow];
// FIXME location currently independent of snake initial length
//
// assuming now that snake head is the LAST element of the list
var snakeState = [[keyRectIndex[0]-2,keyRectIndex[1]],[keyRectIndex[0]-1,keyRectIndex[1]],[keyRectIndex[0],keyRectIndex[1]]];


// ordering functions now in reverse order so nothing is used before it is defined
function paintSnake() {
    // FIXME I can and should abstract away the details of painting to 
    // a particular index
    ctx.fillStyle = snakeColor;
    for (j = 0; j < snakeState.length; j++) {
        roundRect(ctx, snakeState[j][0] * squareSize, snakeState[j][1] * squareSize,
                  squareSize ,squareSize, squareRadius, true, true);
    }
}

function drawNewGameBoard() {

    // first clear the board of everything:
    clearToBoardColor();

    // and now paint all the elements belonging to the snake:
    paintSnake();
}

function updateGameState() {
    // based on snakeNextDir, the resulting direction from user input, update
    // the keyRectIndex, which indicates where the snake will move next
    switch(snakeNextDir) {
        case "left":
            keyRectIndex[0] = (keyRectIndex[0] - 1).mod(squaresInRow);
            break;
        case "up":
            keyRectIndex[1] = (keyRectIndex[1] - 1).mod(squaresInColumn);
            break;
        case "right":
            keyRectIndex[0] = (keyRectIndex[0] + 1).mod(squaresInRow);
            break;
        case "down":
            keyRectIndex[1] = (keyRectIndex[1] + 1).mod(squaresInColumn);
            break;
    }
    // now we mutate the snake based on this information
    littleArray = [];
    littleArray[0] = keyRectIndex[0];
    littleArray[1] = keyRectIndex[1];

    snakeState.push(littleArray);
    delete snakeState[0]; // will this stop endless memory expansion?
    snakeState.shift();

    // and now we trigger the animation!
    drawNewGameBoard();

}





paintSnake();

setInterval(updateGameState,gameSpeed);


// update global variable in response to key stroke
$(document).keydown(function (e) {
    switch(e.which) {
        case 37:
            snakeNextDir = "left";
            break;
        case 38:
            snakeNextDir = "up";
            break;
        case 39:
            snakeNextDir = "right";
            break;
        case 40:
            snakeNextDir = "down";
            break;
    }
});




