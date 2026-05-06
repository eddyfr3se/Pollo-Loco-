let canvas;
let world;
let keyboard = new Keyboard();
let soundEnabled =
  localStorage.getItem("soundEnabled") === "false" ? false : true;

/**
 * Initializes the game, binds button events, and sets sound icon.
 */
function init() {
  bindBttnPressEvents();
  let icon = document.getElementById("soundBtn");
  if (icon) {
    icon.innerText = soundEnabled ? "🔊" : "🔇";
  }
}

/**
 * Binds all button press events for mobile controls.
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
 * Binds left/right movement buttons for touch controls.
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
 * Binds jump and throw action buttons for touch controls.
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
 * Starts the game, resets keyboard, updates UI, and initializes world/audio.
 */
function startGame() {
  document.body.classList.add("game-started");
  resetKeyboard();
  updateUIForGameStart();
  initWorldAndAudio();
  checkMobileFullscreen();
}

/**
 * Resets all keyboard input states to false.
 */
function resetKeyboard() {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
}

/**
 * Updates the UI to show the game and hide menus.
 */
function updateUIForGameStart() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("instructionsPanel").style.display = "none";
  document.getElementById("gameOverlay").style.display = "flex";
  document.getElementById("mobileControls").classList.add("show-mobile");
}

/**
 * Initializes the level, world, and background music.
 */
function initWorldAndAudio() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  AudioHub.play(AudioHub.BG_MUSIC);
  applySoundSettings();
}

/**
 * Requests fullscreen mode on mobile devices if supported.
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
 * Shows the instructions panel and hides the start screen.
 */
function openInstructions() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("instructionsPanel").style.display = "flex";
}

/**
 * Hides the instructions panel and shows the start screen.
 */
function closeInstructions() {
  document.getElementById("instructionsPanel").style.display = "none";
  document.getElementById("startScreen").style.display = "flex";
}

/**
 * Handles game over state and displays the end screen.
 * @param {any} isWin - True if player won, false if lost.
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
 * Clears all running intervals in the game.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Restarts the game from the end screen.
 */
function restartGame() {
  document.getElementById("endScreen").style.display = "none";
  startGame();
}

/**
 * Reloads the page to return to the home/start screen.
 */
function goToHome() {
  window.location.reload();
}

/**
 * Toggles sound on/off and updates the sound icon.
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
 * Applies the current sound setting to all audio.
 */
function applySoundSettings() {
  AudioHub.applySoundSettings(soundEnabled);
}

/**
 * Toggles fullscreen mode for the game container.
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
