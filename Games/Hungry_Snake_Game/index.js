let canvas = document.getElementById('canvas');
let canvas_width = window.innerWidth / 1.011;
let canvas_height = window.innerHeight / 1.011;
let can = canvas.getContext('2d');

canvas.width = canvas_width;
canvas.height = canvas_height;

const about = document.querySelector(".snake_about_r");
const setting = document.querySelector(".snake_setting_r");
const quit = document.querySelector(".snake_quit_r");
const exit = document.getElementsByClassName("exit_button");
let on1 = 1, off1 = 0;

let musicSound = new Audio('music/snake.mp3');
let foodMusic = new Audio('music/snake_food.mp3');

let indexDivX = 0;
let indexDivY = 0;
let speed = 7;
let score = 0;
let highscoreval;
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else {
    highscoreval = JSON.parse(highscore);
    can.fillStyle = "white";
    can.font = "4vw Poppins sans-serif";
    can.fillText("highscore : " + highscoreval, canvas.width / 33, canvas.height / 15);
}

let box = 25;
let snakeX = 10;
let snakeY = 10;
let w = 0;

let foodX = 5;
let foodY = 5;
let food_color = ["yellow", "PaleTurquoise", "LimeGreen", "hotpink", "salmon", "MediumPurple", "red", "magenta", "orange", "lightblue", "MediumAquaMarine", "NavajoWhite", "yellow"];
let food_border_color = ["orange", "DarkTurquoise", "DarkGreen", "deeppink", "red", "RebeccaPurple", "maroon", "purple", "brown", "navy", "DarkCyan", "SandyBrown", "orange"];
let food_i = 0;

const snakeParts = [];
let tailLength = 0;

class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Circle {
    constructor(xpoint, ypoint, radius, color, border_color) {
        this.xpoint = xpoint;
        this.ypoint = ypoint;
        this.radius = radius;
        this.color = color;
        this.border_color = border_color;
    }
    draw(can) {
        if (this.radius > 0) {
            can.beginPath();
            can.arc(this.xpoint, this.ypoint, this.radius, 0, Math.PI * 2);
            can.strokeStyle = this.border_color;
            can.lineWidth = 5;
            can.fillStyle = this.color;
            can.fill();
            can.stroke();
            can.closePath();
        }
    }
}


snake_game_about.onclick = () => {
    snake_game_start.style.display = "none";
    snake_game_about.style.display = "none";
    snake_game_setting.style.display = "none";
    snake_game_quit.style.display = "none";
    about.style.display = "block";
}

for (let i = 0; i < exit.length; i++) {
    exit[i].onclick = () => {

        about.style.display = "none";
        setting.style.display = "none";
        snake_game_start.style.display = "block";
        snake_game_about.style.display = "block";
        snake_game_setting.style.display = "block";
        snake_game_quit.style.display = "block";
    }
}

snake_game_setting.onclick = () => {
    snake_game_start.style.display = "none";
    snake_game_about.style.display = "none";
    snake_game_setting.style.display = "none";
    snake_game_quit.style.display = "none";
    setting.style.display = "block";
}

on_music.onclick = () => {
    on1 = 1;
    off1 = 0;
}

off_music.onclick = () => {
    off1++;
    on1 = 0;
}

function main(ctime) {
    if (on1 == 1) {
        musicSound.play();
    }

    bload();

    drawSnake();
    snakeFood();

    chageFoodPosition();
    drawScore();
    chageSnakeposition();

    let result = gameOver();
    if (result) {
        snake_exit_button.onclick = () => {
            result = false;
            canvas.style.display = "none";
            snake_first_page.style.display = "block";
            snake_exit_button.style.display = "none";

            snakeX = 10;
            snakeY = 10;
            food_i = 0;
            foodX = 5;
            foodY = 5;
            speed = 7;
            score = 0;
            tailLength = 0;
            snakeParts.splice(0, snakeParts.length);

            snake_UpKey_button.style.display = "none";
            snake_DownKey_button.style.display = "none";
            snake_LeftKey_button.style.display = "none";
            snake_RightKey_button.style.display = "none";
        }
        return result;
    }


    if (canvas_width <= 700 || canvas_height <= 700) {
        snake_UpKey_button.style.display = "block";
        snake_DownKey_button.style.display = "block";
        snake_LeftKey_button.style.display = "block";
        snake_RightKey_button.style.display = "block";

        snake_UpKey_button.onclick = () => {
            indexDivX = 0;
            indexDivY = -1;
            w = 1;
        }

        snake_DownKey_button.onclick = () => {
            indexDivX = 0;
            indexDivY = 1;
            w = 2;
        }

        snake_RightKey_button.onclick = () => {
            indexDivX = 1;
            indexDivY = 0;
            w = 3;
        }

        snake_LeftKey_button.onclick = () => {
            indexDivX = -1;
            indexDivY = 0;
            w = 4;
        }
    }
    setTimeout(main, 1000 / speed);
}

function bload() {
    can.fillStyle = 'black';
    can.fillRect(0, 0, canvas.width, canvas.height);

    can.font = "4vw Poppins sans-serif";
    can.fillStyle = "white";
    can.fillText("Snake Game", canvas.width / 2.4, canvas.height / 15);
}

function drawSnake() {

    setShadow(can, "IndianRed", 0, 0, 25);
    let circle = new Circle(snakeX * box, snakeY * box, box + 5, 'IndianRed', 'DarkRed');
    circle.draw(can);

    if (w == 0 || w == 1) {
        circle = new Circle(snakeX * box - 13, snakeY * box - 5, box - 13, 'black', 'white');
        circle.draw(can);

        circle = new Circle(snakeX * box + 13, snakeY * box - 5, box - 13, 'black', 'white');
        circle.draw(can);
    }

    else if (w == 2) {
        circle = new Circle(snakeX * box - 13, snakeY * box + 7, box - 13, 'black', 'white');
        circle.draw(can);

        circle = new Circle(snakeX * box + 13, snakeY * box + 7, box - 13, 'black', 'white');
        circle.draw(can);
    }

    else if (w == 3) {
        circle = new Circle(snakeX * box + 7, snakeY * box - 13, box - 13, 'black', 'white');
        circle.draw(can);

        circle = new Circle(snakeX * box + 7, snakeY * box + 13, box - 13, 'black', 'white');
        circle.draw(can);
    }
    else if (w == 4) {
        circle = new Circle(snakeX * box - 5, snakeY * box - 13, box - 13, 'black', 'white');
        circle.draw(can);

        circle = new Circle(snakeX * box - 5, snakeY * box + 13, box - 13, 'black', 'white');
        circle.draw(can);
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];

        setShadow(can, food_color[food_i - 1], 0, 0, 25);
        let circle = new Circle(part.x * box, part.y * box, box - 7, food_color[food_i - 1], food_border_color[food_i - 1]);
        circle.draw(can);
    }

    snakeParts.push(new snakePart(snakeX, snakeY));

    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
}


function snakeFood() {
    if (food_i == 13) {
        food_i = 1;
    }

    tant = setShadow(can, food_color[food_i], 0, 0, 25);
    let circle = new Circle(foodX * box, foodY * box, box - 2, food_color[food_i], food_border_color[food_i]);
    circle.draw(can);
}

function setShadow(can, color, ox, oy, blur) {
    can.shadowColor = color;
    can.shadowOffsetX = ox;
    can.shadowOffsetY = oy;
    can.shadowBlur = blur;
}

function chageSnakeposition() {
    snakeX = snakeX + indexDivX;
    snakeY = snakeY + indexDivY;

}

function chageFoodPosition() {

    if (snakeX === foodX && snakeY === foodY) {
        
        if(on1 == 1)
        {
            foodMusic.play();
        }
        let a = 1;
        let b = canvas.width / box - 1;
        foodX = Math.round(a + (b - a) * Math.random());

        a = 1;
        b = canvas.height / box - 1;
        foodY = Math.round(a + (b - a) * Math.random());

        tailLength++;
        score++;
        speed += 0.5;
        food_i += 1;
    }
}

function gameOver() {
    let gameOver = false;

    if (snakeX - 1 < 0 || snakeY - 1 < 0 || snakeX + 1 >= canvas.width / box || snakeY + 1 >= canvas.height / box) {
        gameOver = true;
    }


    for (i = 1; i < snakeParts.length; i++) {
        if (snakeParts[i].x === snakeX && snakeParts[i].y === snakeY) {
            gameOver = true;
            break;
        }
    }


    if (gameOver) {

        var gradient = can.createLinearGradient(0, 0, canvas.width, 0, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.3", "blue");
        gradient.addColorStop("0.7", "red");
        gradient.addColorStop("1.0", "pink");

        can.font = "15vw Poppins sans-serif";
        can.fillStyle = gradient;
        can.fillText("Game Over", canvas.width / 7, canvas.height / 2);

        can.font = "15vw Poppins sans-serif";
        can.strokeStyle = "white";
        can.strokeText("Game Over", canvas.width / 7, canvas.height / 2);
        snake_exit_button.style.display = "block";

        musicSound.pause();
    }
    return gameOver;
}

function drawScore() {
    can.fillStyle = "white";
    can.font = "4vw Poppins sans-serif";
    can.fillText("score : " + score, canvas.width / 1.2, canvas.height / 15);

    if (score > highscoreval) {
        highscoreval = score;
        localStorage.setItem("highscore", JSON.stringify(highscoreval));
    }

    can.fillStyle = "white";
    can.font = "4vw Poppins sans-serif";
    can.fillText("highscore : " + highscoreval, canvas.width / 33, canvas.height / 15);
}

snake_game_start.onclick = () => {
    window.requestAnimationFrame(main);
    snake_first_page.style.display = "none";
    canvas.style.display = "block";
}

window.addEventListener("keydown", e => {

    switch (e.key) {

        case "ArrowUp":
            indexDivX = 0;
            indexDivY = -1;
            w = 1;
            break;

        case "ArrowDown":
            indexDivX = 0;
            indexDivY = 1;
            w = 2;
            break;

        case "ArrowRight":
            indexDivX = 1;
            indexDivY = 0;
            w = 3;
            break;

        case "ArrowLeft":
            indexDivX = -1;
            indexDivY = 0;
            w = 4;
            break;

        default:
            break;
    }
})

