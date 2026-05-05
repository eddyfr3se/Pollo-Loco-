let canvas;
let world;
let keyboard = new Keyboard();
let soundEnabled =
  localStorage.getItem("soundEnabled") === "false" ? false : true;

/**
 * Executes the init function.
 */
function init() {
  bindBttnPressEvents();
  let icon = document.getElementById("soundBtn");
  if (icon) {
    icon.innerText = soundEnabled ? "🔊" : "🔇";
  }
}

/**
 * Executes the bindBttnPressEvents function.
 */
function bindBttnPressEvents() {
  bindMovementButtons();
  bindActionButtons();
  let buttons = document.querySelectorAll(".mobile-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("contextmenu", (e) => e.preventDefault());
  });
}

/**
 * Executes the bindMovementButtons function.
 */
function bindMovementButtons() {
  let btnLeft = document.getElementById("btnLeft");
  let btnRight = document.getElementById("btnRight");
  if (btnLeft) {
    btnLeft.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    });
    btnLeft.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    });
  }
  if (btnRight) {
    btnRight.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    });
    btnRight.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    });
  }
}

/**
 * Executes the bindActionButtons function.
 */
function bindActionButtons() {
  let btnJump = document.getElementById("btnJump");
  let btnThrow = document.getElementById("btnThrow");
  if (btnJump) {
    btnJump.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.UP = true;
    });
    btnJump.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.UP = false;
    });
  }
  if (btnThrow) {
    btnThrow.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
    });
    btnThrow.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.SPACE = false;
    });
  }
}

/**
 * Executes the startGame function.
 */
function startGame() {
  document.body.classList.add("game-started");
  resetKeyboard();
  updateUIForGameStart();
  initWorldAndAudio();
  checkMobileFullscreen();
}

/**
 * Executes the resetKeyboard function.
 */
function resetKeyboard() {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
}

/**
 * Executes the updateUIForGameStart function.
 */
function updateUIForGameStart() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("instructionsPanel").style.display = "none";
  document.getElementById("gameOverlay").style.display = "flex";
  document.getElementById("mobileControls").classList.add("show-mobile");
}

/**
 * Executes the initWorldAndAudio function.
 */
function initWorldAndAudio() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  AudioHub.play(AudioHub.BG_MUSIC);
  applySoundSettings();
}

/**
 * Executes the checkMobileFullscreen function.
 */
function checkMobileFullscreen() {
  if (window.matchMedia("(max-width: 1366px) and (pointer: coarse)").matches) {
    let elem = document.getElementById("gameContainer");
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => console.log(err));
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
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
});

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
});

/**
 * Executes the openInstructions function.
 */
function openInstructions() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("instructionsPanel").style.display = "flex";
}

/**
 * Executes the closeInstructions function.
 */
function closeInstructions() {
  document.getElementById("instructionsPanel").style.display = "none";
  document.getElementById("startScreen").style.display = "flex";
}

/**
 * Executes the gameOver function.
 * @param {any} isWin - The isWin parameter.
 */
function gameOver(isWin) {
  clearAllIntervals();
  AudioHub.BG_MUSIC.pause();
  AudioHub.BG_MUSIC.currentTime = 0;
  document.getElementById("endScreen").style.display = "flex";
  let imgPath = isWin
    ? "img/You won, you lost/You Win A.png"
    : "img/You won, you lost/Game Over.png";
  document.getElementById("endScreenImage").src = imgPath;
}

/**
 * Executes the clearAllIntervals function.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Executes the restartGame function.
 */
function restartGame() {
  document.getElementById("endScreen").style.display = "none";
  startGame();
}

/**
 * Executes the goToHome function.
 */
function goToHome() {
  window.location.reload();
}

/**
 * Executes the toggleSound function.
 */
function toggleSound() {
  if (document.activeElement) document.activeElement.blur();
  soundEnabled = !soundEnabled;
  localStorage.setItem("soundEnabled", soundEnabled);
  let icon = document.getElementById("soundBtn");
  if (soundEnabled) {
    icon.innerText = "🔊";
  } else {
    icon.innerText = "🔇";
  }
  applySoundSettings();
}

/**
 * Executes the applySoundSettings function.
 */
function applySoundSettings() {
  AudioHub.applySoundSettings(soundEnabled);
}

/**
 * Executes the toggleFullscreen function.
 */
function toggleFullscreen() {
  if (document.activeElement) document.activeElement.blur();
  let elem = document.getElementById("gameContainer");
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
