// Snake code. Requires jQuery and a canvas element called "drawCanvas"
// game parameters

var backgroundColor = "#333333"; 
var boardColor = "#5577cc";
var snakeColor = "#dd8888";
var white = "#ffffff";
var black = "#000000";

var squareRadius = 13;
var squaresInRow = 13;
var squaresInColumn = 13;
var squareSize = 35; // in pixels
var gameWidth = squaresInRow * squareSize;
var gameHeight = squaresInColumn * squareSize;

// key global variable that will be modified 
// by keystrokes, and acted upon after each interval
// of gameSpeed
var snakeNextDir = "right"; // arbitrary starting choice

var gameSpeed = 500;
var snakeLength = 3; // starting value 

var canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, gameWidth, gameHeight);


function clearToBoardColor() {
    ctx.fillStyle = boardColor;
    for (var j = 0; j < n; j++) {
        for (var k = 0; k < n; k++) {
            roundRect(ctx, j * squareSize, k * squareSize, squareSize,
                      squareSize, squareRadius, true, true);
        }
    }
}

clearToBoardColor(); // initialize cleared board state

var randCol = Math.floor(Math.random()*squaresInColumn);
// assume snake is facing to the right. Make sure all snake originates on board
var randRow = Math.floor(Math.random()*(squaresInRow-initialSnakeSize)+initialSnakeSize);

randCol = 5;
randRow = 5;
var keyRectIndex = [randCol, randRow];
// FIXME location currently independent of snake initial length

// assuming now that snake head is the LAST element of the list
var snakeState = [[keyRectIndex[0]-2,keyRectIndex[1]],[keyRectIndex[0]-1,keyRectIndex[1]],[keyRectIndex[0],keyRectIndex[1]]];


ctx.fillStyle = snakeColor;
for (j = 0; j < snakeState.length; j++) {
    roundRect(ctx, snakeState[j][0] * squareSize, snakeState[j][1] * squareSize, 
          squareSize, squareSize, squareRadius, true, true);
}


setInterval(updateGameState,gameSpeed);

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















// describes the update to happen upon keystrokes
function makeUpdateFunction(e) {
    return (function directionalUpdate() {
        // update keyRect Index accordingly 
        if (e.which == 37) {
            keyRectIndex[0] = (keyRectIndex[0] - 1).mod(squaresInRow);
        } else if (e.which == 38) {
            keyRectIndex[1] = (keyRectIndex[1] - 1).mod(squaresInColumn);
        } else if (e.which == 39) {
            keyRectIndex[0] = (keyRectIndex[0] + 1).mod(squaresInRow);
        } else if (e.which == 40) {
            keyRectIndex[1] = (keyRectIndex[1] + 1).mod(squaresInColumn);
        }
        // now that keyRectIndex is updated, let us
        // make the new square in the correct color
        
        littleArray = new Array();
        littleArray[0] = keyRectIndex[0];
        littleArray[1] = keyRectIndex[1];

        snakeState.push(littleArray);
        // now paint the tail end of the snake back to the board color.
        ctx.fillStyle = boardColor;
        roundRect(ctx, snakeState[0][0] * squareSize, snakeState[0][1] * squareSize,squareSize,squareSize,
        squareRadius, true, true);
        // and shift it off the snake
        snakeState.shift();
        ctx.fillStyle = snakeColor;
        roundRect(ctx, snakeState[snakeState.length-1][0] * squareSize, 
        snakeState[snakeState.length-1][1] * squareSize,squareSize,squareSize,squareRadius, true, true);
    
    });
}

// update global variable in response to key stroke
$(document).keydown(function (e) {
    switch(e) {
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




/* ************ UTILITIES *************** */



// because -7 % 5 is obviously 3, not -2. Jeez Javascript...
// snippet here from about.com 
(Number.prototype).mod = function(n) {
    return ((this%n)+n)%n;
}

// external code for round rectangles:

/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }        
}



