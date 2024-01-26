let frontpage = document.getElementById("frontContainer");
let playbtn = document.getElementById("play");
let settingbtn = document.getElementById("setting");
let aboutbtn = document.getElementById("about");

let settingpage = document.getElementById("settingContainer");
let onsound = document.getElementById("onsoundimage");
let offsound = document.getElementById("offsoundimage");
let closeSetting = document.getElementById("closeimage");
let aboutPage = document.getElementById("aboutContainer");
let closeAbout = document.getElementById("closeAboutImage");

let playArea = document.getElementById("container");
let player = document.getElementById("player");
let object1 = document.getElementById("object1");
let object2 = document.getElementById("object2");
let object3 = document.getElementById("object3");
let object4 = document.getElementById("object4");
let score = document.getElementById("score");
let msg = document.getElementById("msg");
let highScoreMsg = document.getElementById("highscore");
let restartIcon = document.getElementById("restartIcon");
let homeIcon = document.getElementById("homeIcon");


let out = false;
let sc = 0;
let originaltop = parseInt(getComputedStyle(player).top);
let outSound = new Audio('component/out.mp3');
let jumpSound = new Audio('component/jump.mp3');
let sound = true;
let highScore = localStorage.getItem("BouncingBallHighScore");
let msgContainer = document.getElementById("msgContainer");

if(highScore == null){
    highScore = 0;
}

//for disable sound
offsound.onclick = function () {
    sound = false;
    onsound.style.border = "none";
    offsound.style.border = "2px solid black"
}

//for enable sound
onsound.onclick = function () {
    sound = true;
    offsound.style.border = "none";
    onsound.style.border = "2px solid black";
}

//for open settings
settingbtn.onclick = function () {
    frontpage.style.display = "none";
    settingpage.style.display = "block";
}

//for close settings
closeSetting.onclick = function () {
    settingpage.style.display = "none";
    frontpage.style.display = "flex";
}

//for open about
aboutbtn.onclick = function(){
    frontpage.style.display = "none";
    aboutPage.style.display = "block";
    let hgscore = document.getElementById("hgscore");
    hgscore.innerHTML = "Your High Score : " + highScore;
}

//for close about
closeAbout.onclick = function(){
    aboutPage.style.display = "none";
    frontpage.style.display = "flex";
}

restartIcon.onclick = function(){
    scoreContainer.style.display = "none";
    playArea.style.display = "block";
    
    window.addEventListener("keyup", fun);
    window.addEventListener("click", fun);
    main();
}

homeIcon.onclick = function(){
    scoreContainer.style.display = "none";
    frontpage.style.display = "flex";
}

function fun() {
    let objects = this.document.getElementsByClassName("object");
    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.add("ani");
        player.classList.remove("out");
    }

    if (sound) {
        outSound.load();
        jumpSound.play();
    }

    player.style.top = "-45%";
    setTimeout(() => {
        player.style.height = "25px";
        player.style.top = "0%";
        player.style.boxShadow = "0px 0px 15px black";

        setTimeout(() => {
            player.style.height = "30px";
            player.style.boxShadow = "0px 0px 0px black";
        }, 200);

    }, 600);
}

//for play game
playbtn.onclick = function () {
    frontpage.style.display = "none";
    playArea.style.display = "block";
    sc = 0;


    //Ball Jumping
    window.addEventListener("keyup", fun);
    window.addEventListener("click", fun);

    main();
}

function main(){

    let scoreContainer = document.getElementById("scoreContainer");
    let scoreContainerHighScore = document.getElementById("scoreContainerHighScore");
    let scoreContainerScore = document.getElementById("scoreContainerScore");
    

    let objectCheck = setInterval(() => {
        // Checking each object
        if (!out) {
            check(object1);
            check(object2);
            check(object3);
            check(object4);
            msg.innerHTML = "";
            highScoreMsg.innerHTML = "High Score : " + highScore;
        }
        else {
            if (highScore < sc || highScore == null) {
                localStorage.setItem("BouncingBallHighScore", sc);
                highScore = sc;
            }

            object1.classList.remove("ani");
            object2.classList.remove("ani");
            object3.classList.remove("ani");
            object4.classList.remove("ani");

            player.classList.remove("out");
            player.classList.add("out");

            clearInterval(objectCheck);
            playArea.style.display = "none";
            scoreContainer.style.display = "block";
            scoreContainerHighScore.innerHTML = "High Score : " + highScore;
            scoreContainerScore.innerHTML = "Score : " + sc;

            sc = 0;
            out = false;

            window.removeEventListener("click",fun);
            window.removeEventListener("keyup",fun);
        }
    }, 100);
}


// Function check the ball is overlap or not
function check(obj) {
    let pwidth = parseInt(getComputedStyle(player).width);
    let pleft = parseInt(getComputedStyle(player).left);
    let ptop = parseInt(getComputedStyle(player).top);

    let oleft = parseInt(getComputedStyle(obj).left);
    let oheight = parseInt(getComputedStyle(obj).height);
    let owidth = parseInt(getComputedStyle(obj).width);


    if (oleft < (pleft + pwidth) && oleft > pleft && (originaltop - ptop) < oheight) {

        if (sound) {
            outSound.play();
        }
        out = true;
    }
    else {
        sc += 1;
        score.innerHTML = "Your Score : " + sc;
    }
}