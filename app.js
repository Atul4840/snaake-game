// canvas select
let canvas = document.querySelector("canvas");
// console.log('object');
// brush lo

let ctx = canvas.getContext("2d");

let cellSize = 50;
let boardHeight = 600;
let boardWidth = 1000;
let direction = "right";

let snakeCells = [
    [0, 0],
    [50, 0],
    [100, 0],
];

// khana banao snake ke liye

function foodGenerate() {
    return [
        Math.floor((Math.random() * boardWidth - cellSize) / cellSize) * cellSize,
        Math.floor((Math.random() * boardHeight - cellSize) / cellSize) * cellSize,
    ];
}

let food = foodGenerate();

// snake ko draw kro

function draw() {
    // clear all the  board
    ctx.clearRect(0, 0, boardWidth, boardHeight);
    for (let cell of snakeCells) {
        ctx.fillStyle = "red";
        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
    }
    ctx.fillStyle = "purple";

    ctx.fillRect(food[0], food[1], cellSize, cellSize);
}

function update() {
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];

    //   let newHeadX = headX + cellSize;
    //   let newHeadY = headY;

    let newHeadX;
    let newHeadY;

    if (direction === "up") {
        newHeadX = headX;
        newHeadY = headY - cellSize;
    } else if (direction === "down") {
        newHeadX = headX;
        newHeadY = headY + cellSize;
    } else if (direction === "left") {
        newHeadX = headX - cellSize;
        newHeadY = headY;
    } else if (direction === "right") {
        newHeadX = headX + cellSize;
        newHeadY = headY;
    }

    for (let i = 0; i < snakeCells.length - 1; i++) {
        if (snakeCells[i][0] === newHeadX && snakeCells[i][1] === newHeadY) {
          gameOver();
          
        }
      }

    snakeCells.push([newHeadX, newHeadY]);

    if (food[0] === newHeadX && food[1] === newHeadY) {
        food = foodGenerate();
    } else {
        snakeCells.shift();
    }

    if ( newHeadX < 0 || newHeadX >= boardWidth || newHeadY < 0 || newHeadY >= boardHeight) {
        gameOver();
        
    }
}

function resetGame(){
   
        snakeCells = [[0, 0], [50, 0], [100, 0]];
        food = generateFood();
        direction = 'right';

        return;
     
}


function gameOver() {
    alert('Game Over!');
    resetGame();
  }

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && direction != "down") {
        direction = "up";
    } else if (event.key === "ArrowDown" && direction != "up") {
        direction = "down";
    } else if (event.key === "ArrowLeft" && direction != "right") {
        direction = "left";
    } else if (event.key === "ArrowRight" && direction != "left") {
        direction = "right";
    }
});

setInterval(function () {
    update();
    draw();
}, 200);
