let n = 0;
let score_ID;
let leftSide_road;
let leftSide_car;
let rightSide_road;
let rightSide_car;
let main_menuPlay = 0;
let carWidth ;
let roadWidth;
let rightRoad;
let leftRoad;

const redCar = document.getElementById("car_red");
const blueCar = document.getElementById("car_blue");
const orangeCar = document.getElementById("car_orange");
const yellowCar = document.getElementById("car_yellow");
const greenCar = document.getElementById("car_green");
const road = document.getElementById("road");
let gameOver = false; 

// let background_music = document.getElementById("background_music");
let accident_music = document.getElementById("accident_music");
accident_music.pause();
let play_button = document.getElementById("play_button");
let arrowBut = document.getElementById("arrowBut");

function play() {
    if(main_menuPlay > 0)
    {   
        game_page.style.opacity = 1;
        score_page.style.display = 'none';
        clearInterval(score_ID);
        clearInterval(blueInterval);
        clearInterval(yellowInterval);
        clearInterval(orangeInterval);
        clearInterval(greenInterval);
        n = 0;
        restartAllAnimations();
        overlap();
        gameOver = false;
        scores.style.display = 'flex';
    }
    
    document.getElementById("front_page").style.display = 'none';
    document.getElementById("game_page").style.display = 'block';

    //set animations
    document.getElementById("car_blue").style.animation = ' car 5s linear infinite';
    document.getElementById("car_yellow").style.animation = ' car 4s linear infinite';
    document.getElementById("car_orange").style.animation = ' car 6s linear infinite';
    document.getElementById("car_green").style.animation = ' car 7s linear infinite';

    leftSide_road = parseInt(document.getElementById("road").getBoundingClientRect().left);  //return the left position and convert it to integer. 
    leftSide_car = parseInt(document.getElementById("car_red").getBoundingClientRect().left);

    leftRoad = leftSide_road;
  
    carWidth = redCar.offsetWidth; //retrieve width
    roadWidth = road.offsetWidth;
    rightSide_car = leftSide_car + carWidth;
    rightSide_road = leftSide_road + roadWidth;
    rightRoad = rightRoad;
}

function overlap() {
    score_ID = setInterval(() => {
        document.getElementById("score").innerHTML = "Score : " + n;
        n = n + 1;
    
        const blueRect = blueCar.getBoundingClientRect(); //return position
        const redRect = redCar.getBoundingClientRect();
        const orangeRect = orangeCar.getBoundingClientRect();
        const yellowRect = yellowCar.getBoundingClientRect();
        const greenRect = greenCar.getBoundingClientRect();
    
        if (
            blueRect.right > redRect.left &&
            blueRect.left < redRect.right &&
            blueRect.bottom > redRect.top &&
            blueRect.top < redRect.bottom
        ) {
            if(music_play == 1)
            {
                accident_music.play();
            }
           gameOver = true;
            clearInterval(score_ID);
            pause_animation();
            score_pageFunc();
        }
        else if (
            orangeRect.right > redRect.left &&
            orangeRect.left < redRect.right &&
            orangeRect.bottom > redRect.top &&
            orangeRect.top < redRect.bottom
        ) {
            if(music_play == 1)
            {
                accident_music.play();
            }
            gameOver = true;
            clearInterval(score_ID);
            pause_animation();
            score_pageFunc();
        }
        else if (
            yellowRect.right > redRect.left &&
            yellowRect.left < redRect.right &&
            yellowRect.bottom > redRect.top &&
            yellowRect.top < redRect.bottom
        ) 
        {
            if(music_play == 1)
            {
                accident_music.play();
            }
            gameOver = true;
            clearInterval(score_ID);
            pause_animation();
            score_pageFunc();
        }
        else if (
            greenRect.right > redRect.left &&
            greenRect.left < redRect.right &&
            greenRect.bottom > redRect.top &&
            greenRect.top < redRect.bottom
        ) {
            if(music_play == 1)
            {
                accident_music.play();
            }
            gameOver = true;
            clearInterval(score_ID);
            pause_animation();
            score_pageFunc();
        }
    }, 100); // Specify the interval duration in milliseconds
    
}
overlap(); //initial call

function pause_animation(){
    const animations = document.getAnimations();
    for (const animation of animations) {
       animation.pause();
    }
}

let highscore = document.getElementById("highscore");
let yourscore = document.getElementById("yourscore");

let get_hscore = localStorage.getItem('high_score'); //fetch high score from locaal storage.
let h_score;
h_score  = get_hscore;

let display_hscore = document.getElementById("display_hscore"); //fetch element.
display_hscore.innerHTML =  'High Score : ' + get_hscore; //initial highscore

let arrowButDisable = false; //to prevent arrowkey function when game is over;
let score_page = document.getElementById("score_page");
let scores = document.getElementById("write");
function score_pageFunc() {

    arrowButDisable = true;
    clearInterval(score_ID);
    clearInterval(blueInterval);
    clearInterval(yellowInterval);
    clearInterval(orangeInterval);
    clearInterval(greenInterval);
    scores.style.display = 'none';
    score_page.style.display = 'block';

    if(n > h_score)
    {
        h_score = n-1;
        localStorage.setItem('high_score', h_score);
        highscore.innerHTML = 'High Score : ' + h_score; //scorePage
        display_hscore.innerHTML =  'High Score : ' + h_score; //gamePage
    }
    else{
        highscore.innerHTML = 'High Score : ' + h_score;
    }
    yourscore.innerHTML = 'Your Score : ' + (n - 1); 
}

let game_page = document.getElementById("game_page");
let main_menu = document.getElementById("main_menu");
main_menu.onclick = function(){
    game_page.style.display = 'none';
    score_page.style.display = 'none';
    front_page.style.display = 'block';
    main_menuPlay = 1;
    arrowButDisable = false;
}

let restart = document.getElementById("restart_button");
restart.onclick = function (){
    arrowButDisable = false;
    scores.style.display = 'flex';
    gameOver = false;
    score_page.style.display = 'none';
    n = 0;
    restartAllAnimations();
    overlap();
}

//fetch all animations from statring.
function restartAllAnimations() {
    const animations = document.getAnimations();
    for (const animation of animations) {
        animation.currentTime = 0;
        animation.play();
    }
}

let setting_button = document.getElementById("setting_button");
let setting_page = document.getElementById("setting_page");
let close = document.getElementById("close_button");
let playMusic_button = document.getElementById("play_music"); 
let muteMusic_button = document.getElementById("mute_music"); 
let music_play = 1;

setting_button.onclick = function(){
    setting_page.style.display = 'block';
    play_button.style.display = 'none';
    setting_button.style.display = 'none';

    close.onclick = function(){
        setting_page.style.display = 'none';
        play_button.style.display = 'block';
        setting_button.style.display = 'block';
    }
    muteMusic_button.onclick = function(){
        muteMusic_button.style.border = '4px solid black';
        playMusic_button.style.border = '';
        music_play = 0;
    }
    playMusic_button.onclick = function(){
        playMusic_button.style.border = '4px solid black';
        muteMusic_button.style.border = '';
        music_play = 1;
    }
}


let blueInterval, yellowInterval, orangeInterval, greenInterval;


//----------------------------------------------------------------------------------------------------------



window.addEventListener("keydown", function (x) {
    if(gameOver) return; //if game is over then prevent window key event;

    
    if (x.key == 'ArrowLeft')
     {
        if ((leftSide_car < leftSide_road))
            {
                gameOver = true;
                pause_animation();
                score_pageFunc();
            }
        else 
            {
                leftSide_car = leftSide_car - 9;
                document.getElementById("car_red").style.left = leftSide_car + 'px';
            }
    } 
    
    else if (x.key == 'ArrowRight')
    {
        rightSide_car = leftSide_car + carWidth;
        rightSide_road = leftSide_road + roadWidth;

     
       if (rightSide_car >= rightSide_road)
            {
                gameOver = true;
                pause_animation();
                score_pageFunc();
            } 
        else 
            {
                leftSide_car = leftSide_car + 9;
                document.getElementById("car_red").style.left = leftSide_car + 'px';
            }
    }
});






let front_page = document.getElementById("front_page");

Left_Key.onclick = () =>{
    if(arrowButDisable)return;
    if ((leftSide_car < leftSide_road))
    {
        gameOver = true;
        pause_animation();
        score_pageFunc();
    }
else 
    {
        leftSide_car = leftSide_car - 10;
        document.getElementById("car_red").style.left = leftSide_car + 'px';
    }
}

Right_Key.onclick = () => {
      if(arrowButDisable)return;
    rightSide_car = leftSide_car + carWidth;
    rightSide_road = leftSide_road + roadWidth;

 
   if (rightSide_car >= rightSide_road)
        {
            gameOver = true;
            pause_animation();
           score_pageFunc();
        } 
    else 
        {
            leftSide_car = leftSide_car + 10;
            document.getElementById("car_red").style.left = leftSide_car + 'px';
        }
    
}

