class AudioHub {
    static BG_MUSIC = new Audio('audio/Jump_Squawk_Repeat.mp3');
    static BOSS_HIT = new Audio('audio/boss sound.wav');
    static CHAR_HIT = new Audio('audio/529346__fluxedmac__boss_vocalattack_3.wav');

    static allSounds = [AudioHub.BG_MUSIC, AudioHub.BOSS_HIT, AudioHub.CHAR_HIT];

    static play(sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play failed:', e));
    }

    static applySoundSettings(enabled) {
        AudioHub.allSounds.forEach((sound) => {
            sound.muted = !enabled;
        });
    }
}

AudioHub.BG_MUSIC.loop = true;
