let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyPress); 

let fps = 1000/15;
let tileSize = 20;
let gridSize = 40;

canvas.width = tileSize * gridSize;
canvas.height = tileSize * gridSize;

let apple = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
};

let velocity = {
    x: 1,
    y: 0
};

function keyPress(e) {
    switch(e.keyCode) {
        case 37:
            velocity.x = -1;
            velocity.y = 0;
            break;
        case 38:
            velocity.x = 0;
            velocity.y = -1;
            break;
        case 39:
            velocity.x = 1;
            velocity.y = 0;
            break;
        case 40:
            velocity.x = 0;
            velocity.y = 1;
            break;
    }
}

function Snake() {
    this.x = Math.floor(gridSize / 2);
    this.y = Math.floor(gridSize / 2);
    this.body = [];
    this.length = 4;
    for(let i = 0; i < this.length; i++) {
        this.body.push({x: this.x, y: this.y})
    }
}

Snake.prototype.update = function() {
    this.x += velocity.x;
    this.y += velocity.y;

    if(this.x < 0 || this.x > gridSize || this.y < 0 || this.y > gridSize) {
        location.reload();
    }

    for(let i = 0; i < this.length; i++) {
        if(this.x == this.body[i].x && this.y == this.body[i].y) {
            location.reload();
        }
    }
    
    if(this.x == apple.x && this.y == apple.y) {
        this.length++;
        this.body.push({x: this.x, y: this.y})
        apple.x = Math.floor(Math.random() * gridSize);
        apple.y = Math.floor(Math.random() * gridSize);
    }

    this.body.push({x: this.x, y: this.y})
    while(this.body.length > this.length) {
        this.body.shift();
    }

    this.draw();
}

Snake.prototype.draw = function() {
    ctx.fillStyle = 'white';
    for(let i = 0; i < this.body.length; i++) {
        ctx.fillRect(this.body[i].x * tileSize, this.body[i].y * tileSize, tileSize - 1, tileSize - 1);
    }
}

let snake = new Snake();
function animate() {
    requestAnimationFrame(animate);
    let now = Date.now();
    let elapsed = now - start;

    if(elapsed > fps) {
        start = now - (elapsed % fps);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize - 1, tileSize - 1);

        snake.update();
    }
}

let start = Date.now();
animate();