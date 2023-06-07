class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.resetBtn = document.querySelector('.reset');
        this.stopBtn = document.querySelector('.stop');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.hihatOpenAudio = document.querySelector('.hihat-open-sound');
        this.crashAudio = document.querySelector('.crash-sound');
        this.tomAudio = document.querySelector('.tom-sound');
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.tempoNumber = document.querySelector('.tempo-number span');
        this.index = 0;
        this.bpm = this.tempoNumber.innerText;
        this.isPlaying = null;
        this.step = 0;
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
    }
    activePad() {
        this.classList.toggle('active');
    }
    repeat() {
        const activeBars = document.querySelectorAll(`.b${this.step}`);
        activeBars.forEach((bar) => {
            bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                if (bar.classList.contains('hihat-open-pad')) {
                    this.hihatOpenAudio.currentTime = 0;
                    this.hihatOpenAudio.play();
                }
                if (bar.classList.contains('crash-pad')) {
                    this.crashAudio.currentTime = 0;
                    this.crashAudio.play();
                }
                if (bar.classList.contains('tom-pad')) {
                    this.tomAudio.currentTime = 0;
                    this.tomAudio.play();
                }
            }
        });
        this.index++;
        this.step = this.index % 8;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
            this.playBtn.innerHTML =
                '<i class="fa-regular fa-circle-pause"></i>';
            this.playBtn.title = 'Pause';
            this.playBtn.classList.add('btnActive');
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.playBtn.innerHTML =
                '<i class="fa-regular fa-circle-play"></i>';
            this.playBtn.title = 'Play';
            this.playBtn.classList.remove('btnActive');
        }
        this.playBtn.style.animation = 'playTrack 0.2s alternate ease-in-out 2';
    }
    reset() {
        this.pads.forEach((pad) => {
            pad.classList.remove('active');
        });
        this.resetBtn.style.animation =
            'resetRotate 0.5s alternate ease-in-out';
    }
    stop() {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        this.step = 0;
        this.index = 0;
        this.stopBtn.style.animation = 'playTrack 0.2s alternate ease-in-out 2';
        this.playBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
        this.playBtn.classList.remove('btnActive');
    }
    offAnimation() {
        this.style.animation = '';
    }
    changeSound(e) {
        switch (e.target.name) {
            case 'snare-select':
                this.snareAudio.src = e.target.value;
                break;
            case 'kick-select':
                this.kickAudio.src = e.target.value;
                break;
            case 'hihat-select':
                this.hihatAudio.src = e.target.value;
                break;
            case 'hihat-open-select':
                this.hihatOpenAudio.src = e.target.value;
                break;
            case 'crash-select':
                this.crashAudio.src = e.target.value;
                break;
            case 'tom-select':
                this.tomAudio.src = e.target.value;
                break;
            default:
                alert(`There is no sound for ${e.target.innerText}`);
        }
    }
    mute(e) {
        e.target.classList.toggle('muteOn');
        e.target.title = 'Unmute';
        if (e.target.classList.contains('kick-volume')) {
            if (this.kickAudio.volume) {
                this.kickAudio.volume = 0;
            } else {
                this.kickAudio.volume = 1;
            }
        } else if (e.target.classList.contains('snare-volume')) {
            if (this.snareAudio.volume) {
                this.snareAudio.volume = 0;
            } else {
                this.snareAudio.volume = 1;
            }
        } else if (e.target.classList.contains('hihat-volume')) {
            if (this.hihatAudio.volume) {
                this.hihatAudio.volume = 0;
            } else {
                this.hihatAudio.volume = 1;
            }
        } else if (e.target.classList.contains('hihat-open-volume')) {
            if (this.hihatOpenAudio.volume) {
                this.hihatOpenAudio.volume = 0;
            } else {
                this.hihatOpenAudio.volume = 1;
            }
        } else if (e.target.classList.contains('crash-volume')) {
            if (this.crashAudio.volume) {
                this.crashAudio.volume = 0;
            } else {
                this.crashAudio.volume = 1;
            }
        } else if (e.target.classList.contains('tom-volume')) {
            if (this.tomAudio.volume) {
                this.tomAudio.volume = 0;
            } else {
                this.tomAudio.volume = 1;
            }
        } else {
            e.target.classList.remove('muteOn');
            alert(`There is no audio track for ${e.target.classList}`);
        }
    }
    updateBpm(e) {
        this.tempoNumber.innerText = e.target.value;
        this.bpm = this.tempoNumber.innerText;
    }
    updateTempo() {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if (this.playBtn.classList.contains('btnActive')) {
            this.start();
        }
    }
}

const drumKit = new DrumKit();

// Event Listeners

drumKit.pads.forEach((pad) => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', drumKit.offAnimation);
});

drumKit.playBtn.addEventListener('click', () => {
    drumKit.start();
});

drumKit.resetBtn.addEventListener('click', () => {
    drumKit.reset();
});

drumKit.stopBtn.addEventListener('click', () => {
    drumKit.stop();
});

drumKit.resetBtn.addEventListener('animationend', drumKit.offAnimation);
drumKit.playBtn.addEventListener('animationend', drumKit.offAnimation);
drumKit.stopBtn.addEventListener('animationend', drumKit.offAnimation);

drumKit.selects.forEach((select) => {
    select.addEventListener('change', (e) => {
        drumKit.changeSound(e);
    });
});

drumKit.muteBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', (e) => {
    drumKit.updateBpm(e);
});
drumKit.tempoSlider.addEventListener('change', () => {
    drumKit.updateTempo();
});
