// Initialized variables
let is_game_running = false;
let score = 0;
let checkpointSound;
let lose_sound;

// Declared variables
let end;
let start;
let boundaries;
let status_display;
let items;
let reset_btn;


document.addEventListener("DOMContentLoaded", loadPage);

function displayScore(message) {
    if (message != "") {
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
    }
}

function gameOver() {
    if (is_game_running) {
        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)";
        }
        if (score > 0) {
            score = score - 1;
        }
        displayScore("Game Over!");
        lose_sound.play()
        is_game_running = false;
        clearTimeout(window.timerId); 
    }
}

function startGame() {
    displayScore("");
    is_game_running = true;
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = ""; 
    }
    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].style.backgroundColor = "#eeeeee"; 
    }
    window.timerId = setTimeout(manageTimer, 10000); 
}

function endGame() {
    if (is_game_running) {
        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].style.backgroundColor = "rgb(113 225 141)";
        }
        score = score + 5; 
        displayScore("You Won!");
        is_game_running = false;
        clearTimeout(window.timerId); 
    }
}

function resetGame() {
    score= 0 
    is_game_running = false;
    status_display.innerHTML = "";
    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].style.backgroundColor = ""; 
    }
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = ""; 
    }
}

function manageTimer() {
    if (is_game_running) {
        gameOver(); 
        displayScore("Time's Up! Game Over!");
    }
}

function checkpoint() {
    if (is_game_running) {
        score += 1; 
      
        for(let i = 0; i < items.length; i++){
            if(items[i].style.display !=="none"){
                items[i].style.display = "none";
                checkpointSound.play();
                break;
            }
          
        }
    }
    else{
        for(let i = 0;i < items.length;i++){
        items[i].style.display = ""
    }
}
}

function loadPage() {
    checkpointSound = document.getElementById('checkpoint-sound');
    lose_sound= document.getElementById('lose-sound');
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    reset_btn = document.getElementById("reset-btn");
    status_display = document.getElementById("status");
    items = document.getElementsByClassName("item");

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("mouseover", checkpoint);
    }

    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    reset_btn.addEventListener('click',resetGame)

 
    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].addEventListener("mouseover", gameOver);
    }

   
}
