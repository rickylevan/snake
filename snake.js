// Snake code. Requires jQuery and a canvas element called "drawCanvas"
// game parameters

var backgroundColor = "#333333"; 
var boardColor = "#5577cc";
//var snakeColor = "#dd8888";
var snakeColor = "#99cc44";
var white = "#ffffff";
var black = "#000000";

var squareRadius = 15;
var columnLength = 13;
var rowLength = 17;
var squareSize = 35; // in pixels
var gameWidth = columnLength * squareSize;
var gameHeight = rowLength * squareSize;

// key global variable that will be modified 
// by keystrokes, and acted upon after each interval
// of gameSpeed
var snakeNextDir = "right"; // arbitrary starting choice

var gameSpeed = 60;
var snakeLength = 3; // starting value 

// function to compute new location for target tile
function assignNewTarget() {
    randCol1 = Math.floor(Math.random()*rowLength);
    randRow1 = Math.floor(Math.random()*columnLength);

    // while the chosen location is inside the snake, no good!
    // keep repeating until this is not the case
    while (snakeState.containsList([randCol1,randRow1])) {
        randCol1 = Math.floor(Math.random()*rowLength);
        randRow1 = Math.floor(Math.random()*columnLength);
    }

    return [randCol1,randRow1];
}


// setting key canvas and context variables -- globals used often
var canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");

function clearToBoardColor() {
    ctx.fillStyle = boardColor;
    for (j = 0; j < rowLength; j++) {
        for (k = 0; k < columnLength; k++) {
            roundRect(ctx, j * squareSize, k * squareSize, squareSize,
                      squareSize, squareRadius, true, true);
        }
    }
}


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

function paintTarget() {
    ctx.fillStyle = white;
    target = assignNewTarget();
    roundRect(ctx, target[0] * squareSize, target[1] * squareSize,
                  squareSize ,squareSize, squareRadius, true, true);
}



function drawNewGameBoard() {

    // first clear the board of everything:
    clearToBoardColor();

    // and now paint all the elements belonging to the snake:
    paintSnake();

    // now we paint the target, *every single round*, but we have it change if 
    // it is true that the snake is on the existing target
    paintTarget();
}

function updateGameState() {
    // based on snakeNextDir, the resulting direction from user input, update
    // the snakeHead, which indicates where the snake will move next
    switch(snakeNextDir) {
        case "left":
            snakeHead[0] = (snakeHead[0] - 1).mod(rowLength);
            break;
        case "up":
            snakeHead[1] = (snakeHead[1] - 1).mod(columnLength);
            break;
        case "right":
            snakeHead[0] = (snakeHead[0] + 1).mod(rowLength);
            break;
        case "down":
            snakeHead[1] = (snakeHead[1] + 1).mod(columnLength);
            break;
    }
    // now we mutate the snake based on this information
    littleArray = [];
    littleArray[0] = snakeHead[0];
    littleArray[1] = snakeHead[1];
    snakeState.push(littleArray);

    delete snakeState[0]; // will this stop endless memory expansion?
    snakeState.shift();

    // and now we trigger the animation!
    drawNewGameBoard();

}





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



ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, gameWidth, gameHeight);

clearToBoardColor(); // initialize cleared board state

snakeHead = [5,5];
snakeState = [[snakeHead[0]-2,snakeHead[1]],[snakeHead[0]-1,snakeHead[1]],[snakeHead[0],snakeHead[1]]];
target = assignNewTarget();

paintSnake();
paintTarget();

setInterval(updateGameState,gameSpeed);
