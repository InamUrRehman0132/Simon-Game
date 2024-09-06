let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');
let body = document.querySelector('body');

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 400);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 400);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);

    gameFlash(randbtn); 
}

function reSet() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    h2.innerHTML = `Press any key to start`;
    body.classList.add('waiting');
    setTimeout(function() {
        body.classList.remove('waiting');
    }, 2000); // Remove the waiting class after 2 seconds
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("same");
    } else {
        h2.innerHTML = `Game over! Your score was ${level} <br> Press any key to start!`;
        body.classList.add('game-over');
        setTimeout(function() {
            body.classList.remove('game-over');
            reSet();
        }, 2000); // Remove the game-over class after 2 seconds
    }
}

function btnPress() {
    if (!started) {
        h2.innerHTML = `Press any key to start!`;
        body.classList.add('waiting');
        setTimeout(function() {
            body.classList.remove('waiting');
        }, 2000); // Remove the waiting class after 2 seconds
        return;
    }

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1); 
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener('click', btnPress);
}
