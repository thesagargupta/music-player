// Menu Toggle Functionality
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const menuItems = document.querySelectorAll('.mobile-menu ul li');

// Function to open the mobile menu
hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    hamburger.style.display = 'none';
    closeBtn.style.display = 'block';
});

// Function to close the mobile menu
closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    closeBtn.style.display = 'none';
    hamburger.style.display = 'block';
});

// Close the mobile menu when a menu item is clicked
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        closeBtn.style.display = 'none';
        hamburger.style.display = 'block';
    });
});

// Reset button visibility on page load for responsiveness
window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
        closeBtn.style.display = 'none';
    } else {
        hamburger.style.display = 'none';
        closeBtn.style.display = 'none';
    }
});

// Re-check visibility on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
        closeBtn.style.display = 'none';
    } else {
        hamburger.style.display = 'none';
        closeBtn.style.display = 'none';
    }
});

// Dark Mode Functionality
const toggleButton = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggle-icon');
const body = document.body;

toggleButton.addEventListener('click', function () {
    body.classList.toggle('dark-mode');

    // Switch the icon based on the mode
    if (body.classList.contains('dark-mode')) {
        toggleIcon.textContent = '🌞'; // Sun icon for light mode
    } else {
        toggleIcon.textContent = '🌙'; // Moon icon for dark mode
    }
});

// Footer Year Display
const yearElement = document.querySelector(".footer-bottom p");
const currentYear = new Date().getFullYear();
yearElement.innerHTML = `&copy; ${currentYear} MusicoFile. All Rights Reserved.`;

// Music Player Functionality
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const volumeBar = document.querySelector('.volume-bar');
const volumeIcon = document.querySelector('.volume-icon'); // Volume icon element
const playbarThumbnail = document.querySelector('.playbar-left .song-thumbnail');
const playbarTitle = document.querySelector('.playbar-left .song-title');
const playbarArtist = document.querySelector('.playbar-left .artist-name');

let currentSongIndex = 0;
let songs = [];

// Initialize songs from cards
const songCards = document.querySelectorAll('.song-card');
songCards.forEach((card, index) => {
    songs.push({
        src: card.dataset.song,
        thumbnail: card.dataset.thumbnail,
        title: card.dataset.title,
        artist: card.dataset.artist,
    });

    // Play song when card is clicked
    card.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playSong();
    });
});

// Load a song into the player
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    playbarThumbnail.src = song.thumbnail;
    playbarTitle.textContent = song.title;
    playbarArtist.textContent = song.artist;
}

// Play the song
function playSong() {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Pause the song
function pauseSong() {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Toggle play/pause
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// Play the next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

// Play the previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

// Update progress bar and time
audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;

    // Update time display
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

// Seek song
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

// Update volume
volumeBar.addEventListener('input', () => {
    const volume = volumeBar.value / 100; // Calculate volume from slider value
    audioPlayer.volume = volume;

    // If volume is 0, mute the audio and update the icon
    if (volume === 0) {
        audioPlayer.muted = true;
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Mute icon
    } else {
        audioPlayer.muted = false;
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>'; // Unmute icon
    }
});

// Mute/Unmute functionality for volume icon
volumeIcon.addEventListener('click', () => {
    if (audioPlayer.muted) {
        audioPlayer.muted = false; // Unmute
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>'; // Volume up icon
        volumeBar.value = audioPlayer.volume * 100; // Update volume slider to current volume
    } else {
        audioPlayer.muted = true; // Mute
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Mute icon
        volumeBar.value = 0; // Set slider to 0 when muted
    }
});

// Format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Load the first song on page load
loadSong(currentSongIndex);
