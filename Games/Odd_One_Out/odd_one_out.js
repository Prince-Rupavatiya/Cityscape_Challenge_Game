let stage = 1; // to display level count.
let find = 0; //identify obj is found or not
let start_but = 0; //to identify about start or restart button is clicked or not.
let firstPlay = 0; //to reset game
let prev_divName; //to fetch prev id from div_id
let div_name; // to fetch curr id from div_id

//-------------------------------------------------------------play
let play_button = document.getElementById("play_button");
let front_page = document.getElementById("front_page");
let game_page = document.getElementById("game_page");
let aboutBox = document.getElementById("aboutBox");
let oddOneOutCloseButton = document.getElementById("oddOneOutCloseButton");

play_button.onclick = function(){
    front_page.style.display = 'none';
    game_page.style.display = 'block';
    getAnimationFunc(); //fetch animation
    ani_name.pause(); //initial state

    if(firstPlay > 0)
    {
        restartGameFunc();
    }
    else{
        firstPlay = 1;  
    }   
}


//----------------------------------------------------getanimation name
let ani_name;
function getAnimationFunc()
{
    let animations = document.getAnimations();
    for (const anim1 of animations) {
        if (anim1.effect.target === timeSubDiv) {
            ani_name = anim1; 
        }
    }
}

function restartGameFunc(){

    if (timeID_start) {
        clearTimeout(timeID_start);
    }
    if(timeID_restart){
        clearTimeout(timeID_restart);
    }
    if(timeID_next){
        clearTimeout(timeID_next);
    }

    //reset all things
    stage = 1; 
    find = 0;
    start_but = 0;
    click = 0;
    w = 0;

    prev_divName = div_id[19];
    div_name = div_id[0];
   
    document.getElementById(prev_divName).style.display = 'none';
    document.getElementById(div_name).style.display = 'block';
    document.getElementById(div_name).style.filter = 'blur(5px)';
    ani_name.pause();

    level.style.display = 'block';
    start_button.style.display = 'block';
    level.innerHTML = 'Level ' + stage;
    word1.innerHTML = " ";
   
}

about_button.onclick = function(){
    aboutBox.style.display = 'block';
}

oddOneOutCloseButton.onclick = function(){
    aboutBox.style.display = 'none';
}




const div_id = ["div_ice","div_flower", "div_hat","div_bus","div_girl","div_emoji","div_doremon","div_panda","div_blackBall","div_ring","div_animal",
"div_ball","div_gift","div_red","div_purpleBall","div_sheep","div_flower3","div_baby","div_penguin","div_owl"];

const words = ["Great!!","Nice!!","Wohoo!","Superb!","Awesome!!","Incredible!","Excellent!!","Genius..!"]
let w = 0;
let word1  = document.getElementById("word");

//-------------------------------------------start

let timeID_start;
let timeID_restart;
let timeID_next;
let start_button = document.getElementById("start");
let background_audio = document.getElementById("background_audio");

function start()
{
    start_but = 1;    // to make sure startbutton is clicked. 
    if(audio_play == true)
    {
        background_audio.play();
    }
    find = 0;     // for obj not found.
    ani_name.currentTime = 0;
    ani_name.play();

    // clear timeouts if there.
    if (timeID_start) {
        clearTimeout(timeID_start);
    }
    if(timeID_restart){
        clearTimeout(timeID_restart);
    }
    if(timeID_next){
        clearTimeout(timeID_next);
    }
  
    start_button.style.display = 'none';

    div_name = div_id[stage-1];  //current stage is 1
    document.getElementById(div_name).style.filter = 'none';

    timeID_start = setTimeout(timeout,15000); //call timeout func after 15 sec.
}


let oddOneOutPlay = document.getElementById("oddOneOutPlay"); //music play button
let oddOneOutMute = document.getElementById("oddOneOutMute"); //music mute button
let audio_play = true;

oddOneOutPlay.onclick = function(){
    audio_play = true;
    background_audio.play();

    oddOneOutPlay.style.transition = "transform 0.5s ease";
    oddOneOutPlay.style.transform = "scale(1.4)";

    oddOneOutMute.style.transition = "";
    oddOneOutMute.style.transform = "scale(1)";
}

oddOneOutMute.onclick = function(){
    audio_play = false;
    background_audio.pause();

    oddOneOutPlay.style.transition = "";
    oddOneOutPlay.style.transform = "scale(1)";

    oddOneOutMute.style.transition = "transform 0.5s ease";
    oddOneOutMute.style.transform = "scale(1.4)";
}


//---------------------------------------------------------timeout

function timeout()
    {
        if(find==0)  //obj not found
        { 
            restart_button.disabled = false;  // enable restart button.
            start_but = 0; //restart is not clicked.

            //blur div according to the stage when times up.
            for(let i = 1; i <= 20; i++) 
            {
                if(stage == i)
                {
                    let div_name = div_id[stage-1];  
                    document.getElementById(div_name).style.filter = 'blur(5px)';
                    
                    level.style.transition = "transform 0.5s ease";
                    level.style.transform = "scale(1.4)";
                    level.innerHTML = 'Times Up'; //scale up
                 
                   setTimeout(function () {
                       level.style.transition = "transform 0.5s ease";
                       level.style.transform = "scale(1)"; //scale down
                   }, 380);
                }
            }
        }
         
    }
  

//----------------------------------------------------------------------------restart
let restart_button = document.getElementById("restart");
restart_button.disabled = true; //initially restart is disabled.

function restart()
{
    restart_button.disabled = true;//disable restart.
    start_but = 1; //to make sure restart is clicked and time is started.
    find = 0; //set find to 0 that obj still not found.
    level.innerHTML = 'Level ' + stage; //display current level.
    ani_name.currentTime = 0;
    ani_name.play();
    if (timeID_start) {
        clearTimeout(timeID_start);
    }
    if (timeID_restart) {
        clearTimeout(timeID_restart);
    }
    if(timeID_next){
        clearTimeout(timeID_next);
    }

   
    let div_name = div_id[stage-1];
    document.getElementById(div_name).style.filter = 'none';
    timeID_restart = setTimeout(timeout,15000); //call timeout func after 15 sec.
   
}



let ice = document.getElementById("ice_unique");
let flower = document.getElementById("flower_unique");
let hat = document.getElementById("hat_unique");
let bus = document.getElementById("bus_unique");
let girl = document.getElementById("girl_unique");
let emoji = document.getElementById("emoji_unique");
let doremon = document.getElementById("doremon_unique");
let panda = document.getElementById("panda_unique");
let blackBall = document.getElementById("blackBall_unique");
let gift = document.getElementById("gift_unique");
let animal = document.getElementById("animal_unique");
let ball = document.getElementById("ball_unique");
let ring = document.getElementById("ring_unique");
let red = document.getElementById("red_unique");
let purpleBall = document.getElementById("purpleBall_unique");
let sheep = document.getElementById("sheep_unique");
let flower3 = document.getElementById("flower3_unique");
let baby = document.getElementById("baby_unique");
let penguin = document.getElementById("penguin_unique");
let owl = document.getElementById("owl_unique");

ice.onclick = function(){
    msgDisplay(ice)
};

flower.onclick = function(){
    msgDisplay(flower)
};

hat.onclick = function(){
    msgDisplay(hat)
};

bus.onclick = function(){
    msgDisplay(bus)
};

girl.onclick = function(){
    msgDisplay(girl)
};

emoji.onclick = function(){
    msgDisplay(emoji)
};

doremon.onclick = function(){
    msgDisplay(doremon)
};

panda.onclick = function(){
    msgDisplay(panda)
};

blackBall.onclick = function(){
    msgDisplay(blackBall)
};

gift.onclick = function(){
    msgDisplay(gift)
};
animal.onclick = function(){
    msgDisplay(animal)
};
ball.onclick = function(){
    msgDisplay(ball)
};
ring.onclick = function(){
    msgDisplay(ring)
};
red.onclick = function(){
    msgDisplay(red)
};
purpleBall.onclick = function(){
    msgDisplay(purpleBall)
};
sheep.onclick = function(){
    msgDisplay(sheep)
};
flower3.onclick = function(){
    msgDisplay(flower3)
};
baby.onclick = function(){
    msgDisplay(baby)
};
penguin.onclick = function(){
    msgDisplay(penguin)
};
owl.onclick = function(){

level.innerHTML = "Congratulations, you won the game..";
    msgDisplay(owl);

    setTimeout(() => {
        game_page.style.display = 'none';
        front_page.style.display = 'block';
    }, 3000);
};

let next_button = document.getElementById("next");
next_button.disabled = true; //initially next is disabled.

let click = 0; // to prevent multiple clicks.
    function msgDisplay(picture)
    {
        if (start_but == 1 && click == 0)  //start or restart is clicked and set click to 0 to make sure only one time obj is clicked.
        {
            objFound(picture);
            click = 1;
        }
        else if(click == 1)
        {
            level.innerHTML = 'Click next';
        }
        else{
            level.innerHTML = 'Please start the game first.';
        }
    }

  
    let click_audio = document.getElementById("clickSound");
    let level = document.getElementById("level");
    // let objTransformTimeOut;
    let obj; 
    function objFound(obj)
    {
        obj.style.transition = "transform 0.5s ease";
        obj.style.transform = "scale(1.4)";
        level.style.transition = "transform 0.5s ease";
        level.style.transform = "scale(1.3)";
    
        setTimeout(() => {
            obj.style.transition = "transform 0.5s ease";
            obj.style.transform = "scale(1)";
            level.style.transition = "transform 0.5s ease";
            level.style.transform = "scale(1)";
        }, 380);
        stage =stage+1;
        find = 1;
        ani_name.pause();
        word1.innerHTML = words[w];
        word1.style.transition = "transform 0.5s ease";
        word1.style.transform = "scale(1.3)";
        
        if(audio_play == true)
        {
            click_audio.currentTime = 0; //click audio play
            click_audio.play();
        }
       
        if(stage == 9)
        {
            w = -1;
        }
        else if(stage == 17)
        {
            w = 1;
        }
        w = w + 1;
    
        next_button.disabled = false; //enable next button
        if(stage > 20)
        {
            restart_button.disabled = true;
            next_button.disabled = true;
        }
    }
     
    function next()
    {
        click = 0; // set click to 0.
        find = 0; //obj not found.
        next_button.disabled = true;
        restart_button.disabled = true;
    
        level.style.transition = "";
        level.style.transform = "scale(1)";
        level.innerHTML = 'Level ' + stage;
       
        ani_name.currentTime = 0;
        ani_name.play();
        word1.innerHTML = "";
        word1.style.transition = "";
        word1.style.transform = "";
       
        if (timeID_start) {
            clearTimeout(timeID_start);
        }
        if(timeID_restart){
            clearTimeout(timeID_restart);
        }
        if(timeID_next){
            clearTimeout(timeID_next);
        }
    
        timeID_next = setTimeout(timeout,15000); //call timeout function after 15 sec.
    
         prev_divName = div_id[stage-2];
         div_name = div_id[stage-1];
        document.getElementById(prev_divName).style.display = 'none';
        document.getElementById(div_name).style.display = 'block';
    }
