canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#333333";
ctx.fillRect(0,0,500,500);
alert("old_snake has been called");

ctx.fillStyle = "#557799";

var n = 10;
var squaresInRow = n;
var squaresInColumn = n;

for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
    roundRect(ctx,i*500/n,j*500/n,500/n,500/n,5,true,true);
    }
}

// initialize block on game board
var keyRectIndex = [5,5];
ctx.fillStyle = "#bbbbbb";
roundRect(ctx,keyRectIndex[0]*500/n,keyRectIndex[1]*500/n,500/n,500/n,5,true,true);


function makeUpdateFunction(e) {
    return (function directionalUpdate(e) {
        // set context to dark blue and make old rectangle
        // into that context
        ctx.fillStyle = "#557799"
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
        // update keyRect Index accordingly 
        if (e.which == 37) {
            keyRectIndex[0] -= 1;
        } else if (e.which == 38) {
            keyRectIndex[1] -= 1;
        } else if (e.which == 39) {
            keyRectIndex[0] += 1;
        } else if (e.which == 40) {
            keyRectIndex[1] += 1;
        }
        // now that keyRectIndex is updated, let us
        // make the new square in the correct color
        ctx.fillStyle = "#bbbbbb";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
        
    });
}
        
        
        
        
        
        

$(document).keydown(function(e) {
    if (e.which == 37) {
        // left case
        
        // make old square blue again
        ctx.fillStyle = "#557799";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
        
        // now make new square white
        keyRectIndex[0] -= 1;
        ctx.fillStyle = "#bbbbbb";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
    } else if (e.which == 38) {
        
        // left case
        
        // make old square blue again
        ctx.fillStyle = "#557799";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
        
        // now make new square white
        keyRectIndex[1] -= 1;
        ctx.fillStyle = "#bbbbbb";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
    }
        else if (e.which == 39) {
            
        // left case
        
        // make old square blue again
        ctx.fillStyle = "#557799";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
        
        // now make new square white
        keyRectIndex[0] += 1;
        ctx.fillStyle = "#bbbbbb";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
            } else if (e.which == 40) {
                
        // left case
        
        // make old square blue again
        ctx.fillStyle = "#557799";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
        
        // now make new square white
        keyRectIndex[1] += 1;
        ctx.fillStyle = "#bbbbbb";
        roundRect(ctx,keyRectIndex[0]*500/n,         keyRectIndex[1]*500/n,500/n,500/n,5,true,true);
    }
});     



             






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
