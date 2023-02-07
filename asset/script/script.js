
//canvas 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// variables
// speed
// on x
vx = 10;
// on y
vy = 0;

// appleX
let appleX = 0;
// appleY
let appleY = 0;

// score
let score = 0;

// directionBug
let directionBug = false;

// stopGame
let stopGame = false;

let img = new Image();

img.src = '/asset/image/backGroundGreen.png';


// create snake

let snake = [
    {x:140,y:150},
    {x:130,y:150},
    {x:120,y:150},
    {x:110,y:150}
];

function cleanCanvas() {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);

    ctx.drawImage(img,0,0);
}

function animation(){

    if (stopGame === true) {
        return;
    }else{
        setTimeout(function() {
    
            directionBug = false;
    
            cleanCanvas();
            drawApple();
            moveSnake(); 
            createSnake();
            // recursion
            animation();
        },100);
    }


}

animation();
createApple();


function createPieces(pieces) {
    ctx.fillStyle='yellowgreen';
    ctx.strokeStyle='black';
    ctx.fillRect(pieces.x,pieces.y,10,10);
    ctx.strokeRect(pieces.x,pieces.y,10,10);
}

function createSnake(){
    snake.forEach(element=>{
        createPieces(element);
    })
}

// move snake
function moveSnake(){
    const head = {x:snake[0].x +vx, y: snake[0].y +vy};
    snake.unshift(head);

    if (endGame()) {
        snake.shift(head);
        restart();
        stopGame = true;
        return;
    }

    const snakeEatApple= snake[0].x === appleX && snake[0].y === appleY;

    if (snakeEatApple) {
        score +=10;
        document.getElementById('score').innerHTML = score;
        createApple();
    }else{
        snake.pop();
    }
}

document.addEventListener('keydown',changeDirection);

function changeDirection(event) {

    // skip bug direction
    if (directionBug) {
        return;
    }
    
    directionBug = true;

    const arrowUp = 38;
    const arrowDown = 40;
    const arrowRight = 39;
    const arrowLeft = 37;

    const direction = event.keyCode;


    const up = vy === -10;
    const down = vy === 10;
    const right = vx === 10;
    const left = vx === -10;

if (direction === arrowLeft && !right) {
    vx = -10;    
    vy = 0;    
}
if (direction === arrowUp && !down) {
    vx = 0;    
    vy = -10;    
}
if (direction === arrowRight && !left) {
    vx = 10;    
    vy = 0;    
}
if (direction === arrowDown && !up) {
    vx = 0;    
    vy = 10;    
}

}


function randomNumber() {
    return Math.round((Math.random()*290)/10)*10;
}

function createApple() {
    appleX = randomNumber();
    appleY = randomNumber();

    snake.forEach((part)=>{
        const snakeOnApple = part.x == appleX && part.y == appleY;
        if (snakeOnApple) {
            createApple();
        }
    });
}

function drawApple(){
    ctx.fillStyle='red';
    ctx.strokeStyle='darkred';
    ctx.beginPath();
    ctx.arc(appleX+5,appleY+5,5,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
}

function endGame() {

    let deadSnake = snake.slice(1,-1);
    let bitten = false;
    deadSnake.forEach(pieces=>{
        if (pieces.x === snake[0].x && pieces.y === snake[0].y) {
            bitten = true;
        }
    })

    const touchWallLeft = snake[0].x < -1;
    const touchWallRight = snake[0].x > canvas.width - 10;
    const touchWallUp = snake[0].y < -1;
    const touchWallDown = snake[0].y > canvas.height - 10;
    
    let touchWall = false;

    if (bitten || touchWallLeft || touchWallRight || touchWallUp || touchWallDown) {
        touchWall = true;
    }

    return touchWall;
}


function restart() {
    const restart = document.getElementById('restart');
    restart.style.display = 'block';

    document.addEventListener('keydown',(e)=>{
        if (e.key === ' ') {
            document.location.reload(true);
        }
    })
}

//save
function save() {
    let name = prompt("merci de me donner votre pseudo", "Mc nugets");
    if (name != null) {
        console.log(name);
        console.log(score);

        fetch(`http://127.0.0.1:3000/new/${name}/${score}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));


    }
}