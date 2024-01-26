let canvas = document.getElementById('piano_tiles_game');
let canvas_width = window.innerWidth / 1.011;
let canvas_height = window.innerHeight / 1.011;
let can = canvas.getContext('2d');

canvas.width = canvas_width;
canvas.height = canvas_height;

let piano_tiles_music_1 = new Audio('piano_tiles_music/a.mp3');
let piano_tiles_music_2 = new Audio('piano_tiles_music/d.mp3');
let piano_tiles_music_3 = new Audio('piano_tiles_music/e.mp3');
let piano_tiles_music_4 = new Audio('piano_tiles_music/f.mp3');
let piano_tiles_music_5 = new Audio('piano_tiles_music/g.mp3');
let piano_tiles_music_6 = new Audio('piano_tiles_music/h.mp3');
let music = 0;

let now = 0;
let s = 'play';
let s_col = 'pink';
let s_shadow_color = 'orange';
let back_col = 'black'
let tiles_col = 'white';

let tiles_color = ["yellow", "PaleTurquoise", "LimeGreen", "hotpink", "salmon", "MediumPurple", "pink", "magenta", "orange", "lightblue", "MediumAquaMarine", "NavajoWhite"];
let tiles_shadow_color = ["orange", "DarkTurquoise", "DarkGreen", "deeppink", "red", "RebeccaPurple", "maroon", "purple", "brown", "navy", "DarkCyan", "SandyBrown"];
let i = 0;
let tiles = [];
let gameOver = false;
let exit1 = 0;


let piano_tiles_game_start = document.getElementById("piano_tiles_game_start");
let piano_tiles_game_about = document.getElementById("piano_tiles_game_about");
let piano_tiles_game_setting = document.getElementById("piano_tiles_game_setting");
let piano_tiles_game_quit = document.getElementById("piano_tiles_game_quit");


const about = document.querySelector(".piano_tiles_about_r");
const setting = document.querySelector(".piano_tiles_setting_r");
const quit = document.querySelector(".piano_tiles_quit_r");
const exit = document.getElementsByClassName("exit_button");
let on1 = 1;

piano_tiles_game_about.onclick = () => {
    piano_tiles_game_start.style.display = "none";
    piano_tiles_game_about.style.display = "none";
    piano_tiles_game_setting.style.display = "none";
    piano_tiles_game_quit.style.display = "none";
    about.style.display = "block";
}

for (let i = 0; i < exit.length; i++) {
    exit[i].onclick = () => {

        about.style.display = "none";
        setting.style.display = "none";
        piano_tiles_game_start.style.display = "block";
        piano_tiles_game_about.style.display = "block";
        piano_tiles_game_setting.style.display = "block";
        piano_tiles_game_quit.style.display = "block";
    }
}

piano_tiles_game_setting.onclick = () => {
    piano_tiles_game_start.style.display = "none";
    piano_tiles_game_about.style.display = "none";
    piano_tiles_game_setting.style.display = "none";
    piano_tiles_game_quit.style.display = "none";
    setting.style.display = "block";
}

on_music.onclick = () => {
    on1 = 1;
}

off_music.onclick = () => {
    on1 = 0;
}

piano_tiles_game_start.onclick = () => {
    piano_tiles_first_page.style.display = "none";
    canvas.style.display = "block";
    window.requestAnimationFrame(main);
}

let score = 0;
let piano_tiles_highscore;

let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    piano_tiles_highscore = 0;
    localStorage.setItem("highscore", JSON.stringify(piano_tiles_highscore));
}
else {
    piano_tiles_highscore = JSON.parse(highscore);
    can.fillStyle = "white";
    can.font = "4vw Poppins sans-serif";
    can.fillText("highscore : " + piano_tiles_highscore, canvas.width / 33, canvas.height / 15);
}

class Tile {
    constructor(lane) {
        this.lane = lane;
        this.w = canvas.width / 4;
        this.h = canvas.height / 5;
        this.x = this.lane * canvas.width / 4;
        this.y = -2 * this.h;
        this.speed = 7;
    }

    show() {

        if ((score > 100 && score < 250) || (score > 500 && score < 750) || (score > 1000 && score < 1250)) {

            if (this.lane == 0 || this.lane == 2) {
                can.fillStyle = tiles_shadow_color[i];
                can.fillRect((this.lane * this.w) + 15, this.y, (this.w) - 30, this.h);
                setShadow(can, tiles_color[i], 0, 0, 25);
            }

            else {
                can.fillStyle = tiles_shadow_color[i];
                can.fillRect((this.lane * this.w) + 15, this.y, (this.lane * this.w) - 30, this.h);
                setShadow(can, tiles_color[i], 0, 0, 25);
            }
            if (i == 12) {
                i = 0;
                this.speed += 3;
            }
        }

        else {
            if (this.lane == 0 || this.lane == 2) {
                can.fillStyle = tiles_color[i];
                can.fillRect((this.lane * this.w) + 15, this.y, (this.w) - 30, this.h);
                setShadow(can, tiles_shadow_color[i], 0, 0, 25);
            }

            else {
                can.fillStyle = tiles_color[i];
                can.fillRect((this.lane * this.w) + 15, this.y, (this.lane * this.w) - 30, this.h);
                setShadow(can, tiles_shadow_color[i], 0, 0, 25);
            }
            if (i == 12) {
                i = 0;
                this.speed += 3;
            }
        }
    }

    move() {
        this.y += this.speed;
    }

    arrive() {
        return this.y > -this.h + 5;
    }

    touched(x, y) {
        if ((x > this.x) && (x < this.x + this.w) && (y > this.y) && (y < this.y + this.h)) {
            i++;
            if (this.y < this.h / 2) {
                score += 1;
                s = 'lame';
            } else if (this.y < 3 * this.h / 2) {
                score += 2;
                s = 'not bad';
            } else if (this.y < 5 * this.h / 2) {
                score += 3;
                s = 'nice';
            } else if (this.y < 7 * this.h / 2) {
                score += 4;
                s = 'super';
            } else if (this.y < 9 * this.h / 2) {
                score += 5;
                s = 'you rock';
            }

            if (score > piano_tiles_highscore) {
                piano_tiles_highscore = score;
                localStorage.setItem("highscore", JSON.stringify(piano_tiles_highscore));
            }
            if (on1 == 1) {
                if (music == 0) {
                    piano_tiles_music_1.play();
                    music++;
                }
                else if (music == 1) {
                    piano_tiles_music_2.play();
                    music++;
                }
                else if (music == 2) {
                    piano_tiles_music_3.play();
                    music++;
                }
                else if (music == 3) {
                    piano_tiles_music_4.play();
                    music++;
                }
                else if (music == 4) {
                    piano_tiles_music_5.play();
                    music++;
                }
                else if (music == 5) {
                    piano_tiles_music_6.play();
                    music = 0;
                }
            }

            return true;
        } else {
            s = 'LMAO';
            return false;
        }

    }


    missed() {
        return this.y > 9 * this.h / 2;
    }
}

tiles.push(new Tile(Math.floor(Math.random() * 4)));

function main() {

    can.fillStyle = back_col;
    can.fillRect(0, 0, canvas.width, canvas.height);
  
    tiles_draw();
    draw();

    setTimeout(main, 1000 / 30);
}

function draw() {
    

    can.font = "60px Poppins sans-serif";
    can.fillStyle = s_col;
    setShadow(can, s_shadow_color, 0, 0, 25);

    if (canvas.width < 700 && canvas.height >= 400) {
        can.font = "42px Poppins sans-serif";
        can.fillText("highscore : " + piano_tiles_highscore, canvas.width / 33, canvas.height / 16);
        can.font = "45px Poppins sans-serif";
        can.fillText(s, canvas.width / 2.75, canvas.height / 8);

    }
    else if (canvas.height < 700 && canvas.width >= 400) {
        can.font = "42px Poppins sans-serif";
        can.fillText("highscore : " + piano_tiles_highscore, canvas.width / 33, canvas.height / 8);
        can.font = "45px Poppins sans-serif";
        can.fillText(s, canvas.width / 2.25, canvas.height / 8);
    }
    else {
        can.fillText(s, canvas.width / 2.15, canvas.height / 15);
        can.fillText("highscore : " + piano_tiles_highscore, canvas.width / 33, canvas.height / 15);

    }

    if (canvas.width < 700 && canvas.height >= 400) {
        if (score < 10) {
            can.fillText(score, canvas.width / 2.18, canvas.height / 5);
        }
        else if (score < 100) {
            can.fillText(score, canvas.width / 2.40, canvas.height / 5);
        }
        else {
            can.fillText(score, canvas.width / 2.48, canvas.height / 5);
        }
    }
    else if (canvas.height < 700 && canvas.width >= 400) {
        if (score < 10) {
            can.fillText(score, canvas.width / 2.07, canvas.height / 4);
        }
        else if (score < 100) {
            can.fillText(score, canvas.width / 2.15, canvas.height / 4);
        }
        else {
            can.fillText(score, canvas.width / 2.17, canvas.height / 4);
        }
    }

    else {
        if (score < 10) {
            can.fillText(score, canvas.width / 2.05, canvas.height / 7);
        }
        else if (score < 100) {
            can.fillText(score, canvas.width / 2.10, canvas.height / 7);
        }
        else {
            can.fillText(score, canvas.width / 2.15, canvas.height / 7);
        }
    }


    if ((score > 100 && score < 250) || (score > 500 && score < 750) || (score > 1000 && score < 1250)) {
        back_col = 'white';
        tiles_col = 'black';
        s_col = 'blue';
        s_shadow_color = 'navy';
    }

    else {
        back_col = 'black';
        tiles_col = 'white';
        s_col = 'yellow';
        s_shadow_color = "orange";
    }


    can.beginPath();

    can.moveTo(1 * canvas.width / 4, 0);
    can.lineTo(1 * canvas.width / 4, canvas.height);
    can.lineWidth = 0.8;
    can.strokeStyle = tiles_col;

    can.moveTo(2 * canvas.width / 4, 0);
    can.lineTo(2 * canvas.width / 4, canvas.height);

    can.moveTo(3 * canvas.width / 4, 0);
    can.lineTo(3 * canvas.width / 4, canvas.height);

    can.moveTo(0, 4 * canvas.height / 5);
    can.lineTo(canvas.width, 4 * canvas.height / 5);

    can.stroke();


}

function tiles_draw() {

    if (tiles[tiles.length - 1].arrive()) {
        console.log(tiles[1]);
        tiles.push(new Tile(Math.floor(Math.random() * 4)));
    }

    if (tiles[0].missed()) {
        gameOver = true;
    }

    for (var tile of tiles) {
        if (!gameOver) {
            tile.move();
        }
        tile.show();

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
        can.lineWidth = 3;
        can.strokeText("Game Over", canvas.width / 7, canvas.height / 2);

        if(exit1 == 0)
        {
            piano_tiles_exit_button.style.display = 'block';
        }
        piano_tiles_exit_button.onclick = () => {
            piano_tiles_exit_button.style.display = "none";
            canvas.style.display = "none";
            piano_tiles_first_page.style.display = "block";
            exit1 = 1;
        }

        piano_tiles_game_start.onclick = () =>{
            canvas.style.display = "block";
            piano_tiles_first_page.style.display = "none";
            gameOver = false;
            exit1 = 0;
            speed = 7;
            score = 0;
            s = 'play';
            i = 0;
            tiles.splice(0, tiles.length);
            tiles.push(new Tile(Math.floor(Math.random() * 4)));
        }

    }
}

canvas.addEventListener('click', function (event) {
    if (!gameOver) {
        mousePressed(event);
    }
});

function mousePressed(event) {
    let mouseX = event.clientX - canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (tiles[0].touched(mouseX, mouseY)) {
        tiles.splice(0, 1);
    }
    else {
        gameOver = true;
    }
}

function setShadow(can, color, offsetX, offsetY, blur) {
    can.shadowColor = color;
    can.shadowOffsetX = offsetX;
    can.shadowOffsetY = offsetY;
    can.shadowBlur = blur;
}

