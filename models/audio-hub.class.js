/**
 * Represents the AudioHub.
  * @class AudioHub
 */
class AudioHub {
  static BG_MUSIC = new Audio("audio/Jump_Squawk_Repeat.mp3");
  static BOSS_HIT = new Audio("audio/boss sound.wav");
  static CHAR_HIT = new Audio(
    "audio/529346__fluxedmac__boss_vocalattack_3.wav",
  );
  static CHAR_RUN = new Audio("audio/sounds/character/characterRun.mp3");
  static CHAR_JUMP = new Audio("audio/sounds/character/characterJump.wav");

  /**
   * Array containing all audio instances.
   */
  static allSounds = [AudioHub.BG_MUSIC, AudioHub.BOSS_HIT, AudioHub.CHAR_HIT, AudioHub.CHAR_RUN, AudioHub.CHAR_JUMP];

  /**
   * Plays a given audio instance from the beginning.
   * @param {HTMLAudioElement} sound - The audio element to play.
   */
  static play(sound) {
    sound.currentTime = 0;
    sound.play().catch((e) => console.log("Audio play failed:", e));
  }

  /**
   * Applies the sound settings to all audio instances.
   * @param {boolean} enabled - Whether sound is enabled.
   */
  static applySoundSettings(enabled) {
    AudioHub.allSounds.forEach((sound) => {
      sound.muted = !enabled;
    });
  }
}

AudioHub.BG_MUSIC.loop = true;
AudioHub.CHAR_RUN.loop = true;
