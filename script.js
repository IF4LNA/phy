// Data Lagu (Kamu bisa sesuaikan di sini)
const songs = [
    {
        title: 'Judul Lagu 1', // TODO: Ganti judul lagu
        artist: 'Nama Artis 1', // TODO: Ganti nama artis
        audioSrc: 'audio/lagu1.mp3', // TODO: Pastikan nama file cocok
        artSrc: 'images/rob.png' // TODO: Siapkan gambar cover
    },
    {
        title: 'Judul Lagu 2', // TODO: Ganti judul lagu
        artist: 'Nama Artis 2', // TODO: Ganti nama artis
        audioSrc: 'audio/lagu2.mp3', // TODO: Pastikan nama file cocok
        artSrc: 'images/fotoin aku.png' // TODO: Siapkan gambar cover
    }
];

// Elemen-elemen dari HTML
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

// Audio player tersembunyi
const audio = new Audio();

// State
let songIndex = 0;
let isPlaying = false;

// Fungsi untuk memuat lagu
function loadSong(song) {
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;
    albumArt.src = song.artSrc;
    audio.src = song.audioSrc;
}

// Fungsi untuk play lagu
function playSong() {
    isPlaying = true;
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Fungsi untuk pause lagu
function pauseSong() {
    isPlaying = false;
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// Fungsi untuk lagu sebelumnya
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Fungsi untuk lagu berikutnya
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set Progress Bar saat diklik
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // Otomatis lanjut ke lagu berikutnya

progressContainer.addEventListener('click', setProgress);

// Load lagu pertama saat halaman dibuka
loadSong(songs[songIndex]);