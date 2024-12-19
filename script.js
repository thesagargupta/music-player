// === MENU TOGGLE FUNCTIONALITY ===
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

// Close the menu when a menu item is clicked
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        closeBtn.style.display = 'none';
        hamburger.style.display = 'block';
    });
});

// Reset button visibility based on screen size
function updateMenuButtons() {
    if (window.innerWidth <= 1150) {
        hamburger.style.display = 'block';
        closeBtn.style.display = 'none';
    } else {
        hamburger.style.display = 'none';
        closeBtn.style.display = 'none';
    }
}
window.addEventListener('load', updateMenuButtons);
window.addEventListener('resize', updateMenuButtons);

// === DARK MODE FUNCTIONALITY ===
const toggleButton = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggle-icon');
const body = document.body;

// Toggle dark mode
toggleButton.addEventListener('click', function () {
    body.classList.toggle('dark-mode');

    // Update the icon
    toggleIcon.textContent = body.classList.contains('dark-mode') ? '🌞' : '🌙';
});

// === FOOTER YEAR DISPLAY ===
const yearElement = document.querySelector(".footer-bottom p");
const currentYear = new Date().getFullYear();
yearElement.innerHTML = `&copy; ${currentYear} MusicoFile. All Rights Reserved.`;

// === MUSIC PLAYER FUNCTIONALITY ===
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const volumeBar = document.querySelector('.volume-bar');
const volumeIcon = document.querySelector('.volume-icon');
const playbarThumbnail = document.querySelector('.playbar-left .song-thumbnail');
const playbarTitle = document.querySelector('.playbar-left .song-title');
const playbarArtist = document.querySelector('.playbar-left .artist-name');

// === SEARCH FUNCTIONALITY ===
const searchInput = document.getElementById('search-bar');
const searchResults = document.querySelector('.search-results'); // Container for displaying search suggestions

let currentSongIndex = 0;
let songs = [];

// Initialize songs from cards
const songCards = document.querySelectorAll('.song-card');
songCards.forEach((card, index) => {
    songs.push({
        src: card.dataset.song,
        thumbnail: card.dataset.thumbnail,
        title: card.dataset.title.toLowerCase(),
        artist: card.dataset.artist.toLowerCase(),
    });

    // Play song when card is clicked
    card.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playSong();
    });
});

// Search Songs
// === SEARCH FUNCTIONALITY WITH FILTERED PLAYLIST ===
 // Container for displaying search suggestions
let originalSongs = [...songs]; // Keep a backup of the full playlist
let filteredSongs = []; // Temporary array for filtered search results

// Search Songs
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ''; // Clear previous suggestions

    if (query) {
        // Filter songs by title or artist
        filteredSongs = originalSongs.filter(song =>
            song.title.includes(query) || song.artist.includes(query)
        );

        // Display suggestions
        filteredSongs.forEach((song, index) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.textContent = `${song.title.charAt(0).toUpperCase() + song.title.slice(1)} - ${song.artist}`;
            resultItem.dataset.index = index; // Attach the filtered index

            // Click event to play the song and update the playlist
            resultItem.addEventListener('click', () => {
                songs = filteredSongs; // Update the playlist to filtered songs
                currentSongIndex = index; // Set the index of the clicked song
                loadSong(currentSongIndex); // Load the selected song
                playSong(); // Play the song

                // Clear the search bar and results
                searchInput.value = '';
                searchResults.innerHTML = '';
            });

            searchResults.appendChild(resultItem);
        });
    } else {
        // Reset to original playlist if search input is cleared
        songs = originalSongs;
    }
});

// === REMAINING FUNCTIONALITY (PLAY, NEXT, PREVIOUS, ETC.) REMAINS THE SAME ===

// Load a song into the player
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    playbarThumbnail.src = song.thumbnail;
    playbarTitle.textContent = song.title.charAt(0).toUpperCase() + song.title.slice(1);
    playbarArtist.textContent = song.artist.charAt(0).toUpperCase() + song.artist.slice(1);
}

// Play the song
function playSong() {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Play the next song in the filtered playlist
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

// Play the previous song in the filtered playlist
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

// Load a song into the player
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    playbarThumbnail.src = song.thumbnail;
    playbarTitle.textContent = song.title.charAt(0).toUpperCase() + song.title.slice(1);
    playbarArtist.textContent = song.artist.charAt(0).toUpperCase() + song.artist.slice(1);
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
    const volume = volumeBar.value / 100;
    audioPlayer.volume = volume;

    // Update the icon
    if (volume === 0) {
        audioPlayer.muted = true;
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        audioPlayer.muted = false;
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
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

// Get elements
const playbarContainer = document.querySelector('.playbar-container');
const playbarToggle = document.getElementById('playbar-toggle');
const toggleIcon2 = document.querySelector('.toggle-icon2');

// Toggle Playbar visibility
playbarToggle.addEventListener('click', () => {
  playbarContainer.classList.toggle('active');

  // Change the toggle icon
  if (playbarContainer.classList.contains('active')) {
    toggleIcon2.textContent = '▼'; // Icon for sliding down
  } else {
    toggleIcon2.textContent = '▲'; // Icon for sliding up
  }
});


// Get elements
const songThumbnail = document.querySelector('.song-thumbnail');

// Play the song
function playSong() {
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  playPauseBtn.classList.add('playing'); // Add playing style to button
  songThumbnail.classList.add('playing'); // Add animation to thumbnail
}



const songTitle = document.querySelector('.song-title');

function playSong() {
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  playPauseBtn.classList.add('playing');
  songThumbnail.classList.add('playing');
  songTitle.textContent = `Playing: ${songs[currentSongIndex].title}`; // Update title
}

function pauseSong() {
  audioPlayer.pause();
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  playPauseBtn.classList.remove('playing');
  songThumbnail.classList.remove('playing');
  songTitle.textContent = songs[currentSongIndex].title; // Reset title
}
