window.onload = function () {
    // Initialize variables
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const progressBar = document.getElementById("progressBar");
    const currentTimeSpan = document.getElementById("currentTime");
    const durationTimeSpan = document.getElementById("durationTime");
    const songTitle = document.getElementById("songTitle");

    const audio = new Audio();
    const playlist = [
        { title: 'Soulmate', src: './music/_Soulmate_320(PagalWorld.com.sb).mp3' }, 
        { title: 'Tu Hai Kahan', src: './music/_Tu Hai Kahan_320(PagalWorld.com.sb).mp3' },
        { title: 'O Sajni Re', src: './music/O Sajni Re_320(PagalWorld.com.sb).mp3' },
        { title: 'Nothing', src: './music/Nothing-Bruno-Major(PagalWorld).mp3' },
        { title: 'Dancing With Your Ghost', src: './music/Dancing-With-Your-Ghost-Sasha-sloan(PagalWorld).mp3' },
        { title: 'Goodbye', src: './music/Never Say Goodbye - Aftermorning Chillout Mashup_320(PagalWorld.com.sb).mp3' },
        { title: 'Without Me', src: './music/Without Me - Various.mp3' },
        { title: 'FE!N', src: './music/Travis-Scott-Fein_320(PagalWorld).mp3' },
        { title: 'Jheeley', src: './music/Jheeley_64(PagalWorld.com.tw).mp3' },
    ];
    let currentTrack = 0;

    loadTrack(currentTrack);

    function loadTrack(trackIndex) {
        const track = playlist[trackIndex];
        audio.src = track.src;
        audio.load();
        songTitle.textContent = track.title;

        audio.addEventListener('loadedmetadata', () => {
            progressBar.value = 0;
            durationTimeSpan.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('error', () => {
            console.error('Failed to load the audio file:', audio.src);
        });
    }

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    nextBtn.addEventListener('click', () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        audio.play();
        playPauseBtn.textContent = 'Pause';
    });

    prevBtn.addEventListener('click', () => {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        audio.play();
        playPauseBtn.textContent = 'Pause';
    });

    audio.addEventListener('timeupdate', () => {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });

    progressBar.addEventListener('input', () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    audio.addEventListener('ended', () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        audio.play();
        playPauseBtn.textContent = 'Pause';
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    const songCards = document.querySelectorAll('.song-card');
    songCards.forEach(card => {
        card.addEventListener('click', () => {
            const songTitleFromCard = card.getAttribute('data-title');
            const trackIndex = playlist.findIndex(track => track.title === songTitleFromCard);

            if (trackIndex !== -1) {
                currentTrack = trackIndex;
                loadTrack(currentTrack);
                audio.play();
                playPauseBtn.textContent = 'Pause';
            }
        });
    });
};
