let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('audio/Jump_Squawk_Repeat.mp3');
let soundEnabled = true;

function init() {
    bindBttnPressEvents();
}

function bindBttnPressEvents() {
    let btnLeft = document.getElementById('btnLeft');
    let btnRight = document.getElementById('btnRight');
    let btnJump = document.getElementById('btnJump');
    let btnThrow = document.getElementById('btnThrow');

    if (btnLeft) {
        btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard.LEFT = true; });
        btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); keyboard.LEFT = false; });
    }
    if (btnRight) {
        btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard.RIGHT = true; });
        btnRight.addEventListener('touchend', (e) => { e.preventDefault(); keyboard.RIGHT = false; });
    }
    if (btnJump) {
        btnJump.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard.UP = true; });
        btnJump.addEventListener('touchend', (e) => { e.preventDefault(); keyboard.UP = false; });
    }
    if (btnThrow) {
        btnThrow.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard.SPACE = true; });
        btnThrow.addEventListener('touchend', (e) => { e.preventDefault(); keyboard.SPACE = false; });
    }

    let buttons = document.querySelectorAll('.mobile-btn');
    buttons.forEach(btn => {
        btn.addEventListener('contextmenu', e => e.preventDefault());
    });
}

function startGame() {
    document.body.classList.add('game-started');
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('instructionsPanel').style.display = 'none';
    document.getElementById('gameOverlay').style.display = 'flex';
    document.getElementById('mobileControls').classList.add('show-mobile');







    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    backgroundMusic.loop = true;
    backgroundMusic.play();
    applySoundSettings();
    console.log('My Character is', world.character);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

})

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

})

function openInstructions() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('instructionsPanel').style.display = 'flex';
}

function closeInstructions() {
    document.getElementById('instructionsPanel').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
}

function gameOver(isWin) {
    clearAllIntervals();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    document.getElementById('endScreen').style.display = 'flex';
    let imgPath = isWin ? 'img/You won, you lost/You Win A.png' : 'img/You won, you lost/Game Over.png';
    document.getElementById('endScreenImage').src = imgPath;
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function restartGame() {
    document.getElementById('endScreen').style.display = 'none';
    startGame();
}

function goToHome() {
    window.location.reload();
}

function toggleSound() {
    if (document.activeElement) document.activeElement.blur();
    soundEnabled = !soundEnabled;
    let icon = document.getElementById('soundBtn');
    if (soundEnabled) {
        icon.innerText = '🔊';
    } else {
        icon.innerText = '🔇';
    }
    applySoundSettings();
}

function applySoundSettings() {
    backgroundMusic.muted = !soundEnabled;
    if (world && world.character) world.character.characterHitSound.muted = !soundEnabled;
    if (world && world.level) {
        let boss = world.level.enemies.find(e => e instanceof Endboss);
        if (boss) boss.bossHitSound.muted = !soundEnabled;
    }
}


function toggleFullscreen() {
    if (document.activeElement) document.activeElement.blur();
    let elem = document.getElementById('gameContainer');
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}
