var ledh = 32;
var ledw = 32;
var cw = 1330;
var ch = 650;
var h = ch/ledh;
var w = cw/ledw;
var buffer = 5;

var red = "#e50000"
var orange = "#ff8d00"
var yellow = "#ffee00"
var green = "#028121"
var blue = "#004cff"
var purple = "760088"

function setRectangle(ctx, y, x, color){
    if (h<=w) {
        var s = h;
        var ypos = (x*s) + (((w*ledw) - (h*ledh))/2);
        var xpos = buffer + (y*s);
    } else {
        var s = w;
        var ypos = buffer + (x*s);
        var xpos = (y*s) + (((h*ledh) - (w*ledw))/2) + buffer;
    }

    ctx.fillStyle = color;
    ctx.fillRect(ypos, xpos, s, s);

    /**
    // Hexadecimal
    ctx.fillStyle = '#eb3434'; // Red
    ctx.fillRect(10, 10, 100, 50);

    // RGB
    ctx.fillStyle = 'rgb(235, 52, 52)'; // Red
    ctx.fillRect(10, 70, 100, 50);

    // RGBA
    ctx.fillStyle = 'rgba(235, 52, 52, 0.7)'; // Red with 70% opacity
    ctx.fillRect(10, 130, 100, 50);

    // HSL
    ctx.fillStyle = 'hsl(0, 85%, 60%)'; // Red
    ctx.fillRect(10, 190, 100, 50);

    // HSLA
    ctx.fillStyle = 'hsla(0, 85%, 60%, 0.7)'; // Red with 70% opacity
    ctx.fillRect(10, 250, 100, 50); 
    */ 

}

function drawCircle(ctx, centerY, centerX, radius, color) {
    // Iterate through each square on the canvas
    var xstart = Math.max(1, centerX - radius);
    var xend = Math.min(ledw, centerX + radius);
    
    var ystart = Math.max(1, centerY - radius);
    var yend = Math.min(ledh, centerY + radius);

    for (var x = xstart; x <= xend; x++) {
        var yOffset = Math.sqrt(Math.pow(radius, 2) - Math.pow(x - centerX, 2));
        var ypos1 = Math.round(centerY + yOffset);
        var ypos2 = Math.round(centerY - yOffset);

        setRectangle(ctx, x, ypos1, color);  // Top part of the circle
        setRectangle(ctx, x, ypos2, color);  // Bottom part of the circle
    }
    for (var y = ystart; y <= yend; y++) {
        var xOffset = Math.sqrt(Math.pow(radius, 2) - Math.pow(y - centerY, 2));
        var xpos1 = Math.round(centerX + xOffset);
        var xpos2 = Math.round(centerX - xOffset);

        setRectangle(ctx, xpos1, y, color);  // Top part of the circle
        setRectangle(ctx, xpos2, y, color);  // Bottom part of the circle
    }
    // Print coordinates to the console
}

function setBorder(ctx){
    for (x=1; x<=ledw; x++){
        setRectangle(ctx, x, 1, "black");
        setRectangle(ctx, x, ledh, "black");
    }
    
    for (y=2; y<=ledw-1; y++){
        setRectangle(ctx, 1, y, "black");
        setRectangle(ctx, ledw, y, "black");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("display");
    var ctx = canvas.getContext("2d");

    // Set canvas resolution
    canvas.width = 1340;  // Set canvas width in pixels
    canvas.height = 675; // Set canvas height in pixels
    setBorder(ctx);

    setRectangle(ctx, 1, 1, "red");
    setRectangle(ctx, 1, 2, "orange");
    setRectangle(ctx, 2, 2, "yellow");

    drawCircle(ctx, 16, 16, 10, "red");

    /*
    // Debugging: Draw something simple
    ctx.fillStyle = "#c934eb";
    ctx.fillRect(10, 10, 1330, 660); // Should display a red rectangle.
    */

    // Rest of your LED grid code...
});