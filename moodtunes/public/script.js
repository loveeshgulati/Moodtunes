window.onload = function() {
    // Check if the popup has been shown before
    if (!localStorage.getItem("popupShown")) {
        document.getElementById("popup").style.display = "block";
        
        // Blur all content except the popup
        document.querySelectorAll('.content').forEach(el => el.classList.add('blur'));
    }

    // Handle button clicks
    document.getElementById("happy").addEventListener("click", function() {
        // Hide the popup
        document.getElementById("popup").style.display = "none";
        document.querySelectorAll('.content').forEach(el => el.classList.remove('blur'));

        // Set the popupShown flag in localStorage
        localStorage.setItem("popupShown", "true");

        // Redirect to the main page (assuming it's index.html)
        window.location.href = "happy.html";
    });

    document.getElementById("love").addEventListener("click", function() {
        // Hide the popup before redirecting
        document.getElementById("popup").style.display = "none";
        document.querySelectorAll('.content').forEach(el => el.classList.remove('blur'));

        // Set the popupShown flag in localStorage
        localStorage.setItem("popupShown", "true");

        // Redirect to page2.html
        window.location.href = "love.html";
    });


    document.getElementById("home").addEventListener("click", function() {
        // Hide the popup before redirecting
        document.getElementById("popup").style.display = "none";
        document.querySelectorAll('.content').forEach(el => el.classList.remove('blur'));

        // Set the popupShown flag in localStorage
        localStorage.setItem("popupShown", "true");

        // Redirect to page2.html
        window.location.href = "index.html";
    });


     // Initialize variables
     const playPauseBtn = document.getElementById("playPauseBtn");
     const prevBtn = document.getElementById("prevBtn");
     const nextBtn = document.getElementById("nextBtn");
     const progressBar = document.getElementById("progressBar");
     const currentTimeSpan = document.getElementById("currentTime");
     const durationTimeSpan = document.getElementById("durationTime");
     const songTitle = document.getElementById("songTitle");
 
     // Create an audio element and set an array of tracks
     const audio = new Audio();
     const playlist = [
         {title: 'Soulmate', src: './music/_Soulmate_320(PagalWorld.com.sb).mp3'}, 
         {title: 'Song 2', src: 'track2.mp3'},
         {title: 'Song 3', src: 'track3.mp3'}
     ];
     let currentTrack = 0;
 
     
     loadTrack(currentTrack);
 
     function loadTrack(trackIndex) {
         audio.src = playlist[trackIndex].src;
         audio.load();
         songTitle.textContent = playlist[trackIndex].title; 
 
         // Update total duration after loading metadata
         audio.addEventListener('loadedmetadata', () => {
             durationTimeSpan.textContent = formatTime(audio.duration);
         });
     }
 
     // Play or Pause the audio
     playPauseBtn.addEventListener('click', () => {
         if (audio.paused) {
             audio.play();
             playPauseBtn.textContent = 'Pause';
         } else {
             audio.pause();
             playPauseBtn.textContent = 'Play';
         }
     });
 
     // Play the next track
     nextBtn.addEventListener('click', () => {
         currentTrack = (currentTrack + 1) % playlist.length;
         loadTrack(currentTrack);
         audio.play();
         playPauseBtn.textContent = 'Pause';
     });
 
     // Play the previous track
     prevBtn.addEventListener('click', () => {
         currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
         loadTrack(currentTrack);
         audio.play();
         playPauseBtn.textContent = 'Pause';
     });
 
     // Update progress bar as the audio plays
     audio.addEventListener('timeupdate', () => {
         progressBar.value = (audio.currentTime / audio.duration) * 100;
         currentTimeSpan.textContent = formatTime(audio.currentTime);
     });
 
     // Seek to different parts of the audio
     progressBar.addEventListener('input', () => {
         audio.currentTime = (progressBar.value / 100) * audio.duration;
     });
 
     // Format time in minutes and seconds
     function formatTime(seconds) {
         const min = Math.floor(seconds / 60);
         const sec = Math.floor(seconds % 60);
         return `${min}:${sec < 10 ? '0' + sec : sec}`;
     }


};



