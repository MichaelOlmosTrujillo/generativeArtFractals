const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
//Width and Height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// We could use all the funcions of canvas, it gives the 
//possibility of creates a design of 2 dimensions
const ctx = canvas.getContext('2d');

function drawTree(startX, startY, len, angle, branchWidth, color1, color2){
    //It begins a path it erases subroutes
    ctx.beginPath();
    //It saves the complete state of the canvas adding the actual state in a stack
    ctx.save();
    // It defines the style of the stroke
    ctx.strokeStyle = color1;
    // It fills a shape with some style
    ctx.fillStyle = color2;
    //It sets the thickness of lines
    ctx.lineWidth = branchWidth;
    //It translate the canvas and its origin startX units to the right and startY units down
    ctx.translate(startX, startY);
    //Convert angle of degrees to radians
    //it adds a rotation to the transformation matrix
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if(len < 10){
        ctx.restore();
        return;
    }

    drawTree(0, -len, len * 0.75, angle + 5, branchWidth);
    drawTree(0, -len, len * 0.75, angle - 5, branchWidth);
// Put the canvas to its original position
    ctx.restore();


}

drawTree(canvas.width/2, canvas.height - 50, 120, 3, 2, 'white', 'green');