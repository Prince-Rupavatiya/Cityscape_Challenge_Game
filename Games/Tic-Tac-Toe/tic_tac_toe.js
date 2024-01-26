let tic_tac_toe_game_start = document.getElementById("tic_tac_toe_game_start");
let tic_tac_toe_game_about = document.getElementById("tic_tac_toe_game_about");
let tic_tac_toe_game_setting = document.getElementById("tic_tac_toe_game_setting");
let tic_tac_toe_game_quit = document.getElementById("tic_tac_toe_game_quit");

const about = document.querySelector(".tic_tac_toe_about_r");
const setting = document.querySelector(".tic_tac_toe_setting_r");
const quit = document.querySelector(".tic_tac_toe_quit_r");
const exit = document.getElementsByClassName("exit_button");
let on1 = 1, off1 = 0;

tic_tac_toe_game_about.onclick = () => {
    tic_tac_toe_game_start.style.display = "none";
    tic_tac_toe_game_about.style.display = "none";
    tic_tac_toe_game_setting.style.display = "none";
    tic_tac_toe_game_quit.style.display = "none";
    about.style.display = "block";
}

for (let i = 0; i < exit.length; i++) {
    exit[i].onclick = () => {

        about.style.display = "none";
        setting.style.display = "none";
        tic_tac_toe_game_start.style.display = "block";
        tic_tac_toe_game_about.style.display = "block";
        tic_tac_toe_game_setting.style.display = "block";
        tic_tac_toe_game_quit.style.display = "block";
    }
}

tic_tac_toe_game_setting.onclick = () => {
    tic_tac_toe_game_start.style.display = "none";
    tic_tac_toe_game_about.style.display = "none";
    tic_tac_toe_game_setting.style.display = "none";
    tic_tac_toe_game_quit.style.display = "none";
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

tic_tac_toe_game_start.onclick = () => {
    tic_tac_toe_first_page.style.display = "none";
    tic_tac_toe_main_game.style.display = "block";
    
}
