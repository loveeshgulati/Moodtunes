window.onload = function () {
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const progressBar = document.getElementById("progressBar");
    const currentTimeSpan = document.getElementById("currentTime");
    const durationTimeSpan = document.getElementById("durationTime");
    const songTitle = document.getElementById("songTitle");

    const audio = new Audio();
    const playlist = [
        { title: 'Soulmate', src: './music/_Soulmate_320(PagalWorld.com.sb).mp3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-oyXwAHmOc4QBHpMXI-5VGtKB_qWVhmkvIc8JWGGlgrExdCp6EBSwCmx5im5VfudJ78&usqp=CAU' }, 
        { title: 'Tu Hai Kahan', src: './music/_Tu Hai Kahan_320(PagalWorld.com.sb).mp3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvVeZHcHq63w8nt-OUT1HqE1sXZ5XpHzEDsg&s' },
        { title: 'O Sajni Re', src: './music/O Sajni Re_320(PagalWorld.com.sb).mp3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJa80_CDZJux7ZqMyklL3cS8eHVDwOOBgbmA&s' },
        // Add more songs to the playlist as needed
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

        // Add the song to the playlist in localStorage when it is played
        addToPlaylist(track.title, track.src, track.image);
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

    function addToPlaylist(songName, songSrc, songImage) {
        let playlist = JSON.parse(localStorage.getItem('playedPlaylist')) || [];
        // Avoid adding duplicate songs
        if (!playlist.some(song => song.name === songName)) {
            playlist.push({ name: songName, src: songSrc, image: songImage });
            localStorage.setItem('playedPlaylist', JSON.stringify(playlist));
        }
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
