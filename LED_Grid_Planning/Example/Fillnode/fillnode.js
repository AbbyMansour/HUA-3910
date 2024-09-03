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

function drawCircle(ctx, centerX, centerY, radius, color) {
    // Iterate through each square on the canvas
    var xstart = 1;
    var xend = 1;
    if (centerX>=radius){ 
        xstart = centerX - radius;
    } else { 
        xstart = 1;
    }
    if ((ledw - radius) >= centerX){
        xend = (centerX + radius);
    } else {
        xend = ledw;
    }
    setRectangle(ctx, centerY, centerX, "blue");
    for (var x = xstart; x <= xend; x++) {
        ypos1 = Math.round(centerY + Math.sqrt(Math.pow(radius,2) - pow(x-h, 2)));
        ypos2 = Math.round(centerY - Math.sqrt(Math.pow(radius,2) - pow(x-h, 2)));

        setRectangle(ctx, x, ypos1, "green");
    }
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

    drawCircle(ctx, 10, 20, 5, "red");

    /*
    // Debugging: Draw something simple
    ctx.fillStyle = "#c934eb";
    ctx.fillRect(10, 10, 1330, 660); // Should display a red rectangle.
    */

    // Rest of your LED grid code...
});