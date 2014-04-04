// Snake code. Requires jQuery and a canvas element called "drawCanvas"
// game parameters

var background_color = "#333333"; 
var board_color = "#5577cc";
var snake_color = "#dd8888";
var white = "#ffffff";
var black = "#000000";

var squareRadius = 13;
var n = 13;
var squaresInRow = n;
var squaresInColumn = n;
var squareSize = 35;
var gameWidth = squaresInRow * squareSize;
var gameHeight = squaresInColumn * squareSize;

var gameSpeed = 500;

var initialSnakeSize = 3;
var snakeSize = initialSnakeSize; 

var canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = background_color;
ctx.fillRect(0, 0, gameWidth, gameHeight);
ctx.fillStyle = board_color;

for (var j = 0; j < n; j++) {
    for (var k = 0; k < n; k++) {
        roundRect(ctx, j * squareSize, k * squareSize, squareSize,
                  squareSize, squareRadius, true, true);
    }
}

// initialize block on game board


var rand_col = Math.floor(Math.random()*squaresInColumn);
// assume snake is facing to the right. Make sure all snake originates on board
var rand_row = Math.floor(Math.random()*(squaresInRow-initialSnakeSize)+initialSnakeSize);

rand_col = 5;
rand_row = 5;
var keyRectIndex = [rand_col, rand_row];
// FIXME location currently independent of snake initial length

// assuming now that snake head is the LAST element of the list
var snakeLocation = [[keyRectIndex[0]-2,keyRectIndex[1]],[keyRectIndex[0]-1,keyRectIndex[1]],[keyRectIndex[0],keyRectIndex[1]]];


ctx.fillStyle = snake_color;
for (j = 0; j < snakeLocation.length; j++) {
    roundRect(ctx, snakeLocation[j][0] * squareSize, snakeLocation[j][1] * squareSize, 
          squareSize, squareSize, squareRadius, true, true);
}

// testing use of the setInterval function
squareState = black;
yyi = [2,2];
setInterval(yinYangFlip,100);

function makeSquareWhite() {
    ctx.fillStyle = white;
    roundRect(ctx,yyi[0]*squareSize, yyi[1]*squareSize,squareSize,squareSize,
              squareRadius,true,true);
    squareState = white;
}

function makeSquareBlack() {
    ctx.fillStyle = black;
    roundRect(ctx,yyi[0]*squareSize, yyi[1]*squareSize,squareSize,squareSize,
              squareRadius,true,true);
    squareState = black;
}

function yinYangFlip() {
    if (squareState === black) {
        makeSquareWhite();
    } else {
        makeSquareBlack();
    }
}







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

        snakeLocation.push(littleArray);
        // now paint the tail end of the snake back to the board color.
        ctx.fillStyle = board_color;
        roundRect(ctx, snakeLocation[0][0] * squareSize, snakeLocation[0][1] * squareSize,squareSize,squareSize,
        squareRadius, true, true);
        // and shift it off the snake
        snakeLocation.shift();
        ctx.fillStyle = snake_color;
        roundRect(ctx, snakeLocation[snakeLocation.length-1][0] * squareSize, 
        snakeLocation[snakeLocation.length-1][1] * squareSize,squareSize,squareSize,squareRadius, true, true);
        
    
    });
}


$(document).keydown(function (e) {
    // make a custom update function depending on e, 
    // and then call that function to perform the update
    makeUpdateFunction(e)();
});



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



