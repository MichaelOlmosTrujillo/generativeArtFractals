const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
//Width and Height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// We could use all the funcions of canvas, it gives the 
//possibility of creates a design of 2 dimensions
const ctx = canvas.getContext('2d');
let curve;

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
    // it begins a new sub-path at the point specified by the given (x, y) coordinates.
    ctx.moveTo(0, 0);
    /* it adds a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.
    */
    // ctx.lineTo(0, -len);
    if(angle > 0){
        ctx.bezierCurveTo(1, -len/2, 10, -len/4, 0, -len);
    }else{
        ctx.bezierCurveTo(1, -len/2, -10, -len/4, 0, -len);

    }
    ctx.stroke();

    if(len < 7){
        //leafs
        ctx.beginPath();
        ctx.arc(0, -len, 7, 0, Math.PI/2);
        ctx.fill();
        /**
         * El método CanvasRenderingContext2D .arc() de la API de Canvas 2D añade un arco a la trayectoria centrada en la posición (x, y) con el radio r comenzando en startAngle y terminando en endAngle que va en la dirección dada en sentido antihorario (predeterminado en sentido  horario) .
         * Void ctx .arc (x, y, radio, startAngle, endAngle, antihorario);
        */

        //restores the most recently saved canvas state by popping the top entry in the drawing state stack
        ctx.restore();
        return;
    }

    curve = (Math.random() * 19) ;

    drawTree(0, -len, len * 0.75, angle + curve, branchWidth*0.8);
    drawTree(0, -len, len * 0.75, angle - curve, branchWidth*0.8);
    // Put the canvas to its original position
    ctx.restore();
}

drawTree(canvas.width/2, canvas.height - 50, 120, 2, 5, 'white', 'green');
// drawTree(0, -120, 120*0.75, 3+5, 2, 'white', 'green');
// ctx.restore();
// drawTree(0, -120, 120*0.75, 3-5, 2, 'white', 'green');

function generateRandomTree(){
/***
 * El método CanvasRenderingContext2D.clearRect() del API Canvas 2D convierte todos los pixeles en el rectangulo definido por el punto de inicio (x, y) y tamaño (width, height) a negro transparente, borrando cualquier contenido dibujado anteriormente.
 */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(canvas.width/2, canvas.height - 50, 120, 2, 5, 'white', 'green');
}

generateButton.addEventListener('click', generateRandomTree)