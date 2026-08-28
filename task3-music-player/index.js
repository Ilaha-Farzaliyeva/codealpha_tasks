const cover = document.querySelector('.cover-img img')
const title = document.querySelector('.title h3')
const artist = document.querySelector('.title p')
const audio = document.getElementById('audio')
const currentTimeEl = document.querySelector('.current-time')
const progress = document.querySelector('.progress')
const durationEl = document.querySelector('.duration')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const playlist = document.querySelector('.playlist');
const playlistContainer = document.querySelector('.playlist-container');
const playlistDropdown = document.querySelector('.playlist-dropdown');
const playlistArrow = document.querySelector('.playlist-arrow');
const arrowIcon = playlistArrow.querySelector('i');
const volumeBtn = document.getElementById('volume-btn');
const volumePanel = document.getElementById('volume-panel');
const volumeSlider = document.getElementById('volume-slider');
const volumePercent = document.getElementById('volume-percent');



const songs = [
  {
    title: "Sahil boyu gəzirəm",
    artist: "Qaya qrupu",
    src: "assets/music/sahil-boyu.mp3",
    cover: "assets/images/sahil-boyu.jpg"
  },
  {
    title: "Ey həyat sən nə qəribəsən",
    artist: "Qaya qrupu",
    src: "assets/music/heyat.mp3",
    cover: "assets/images/heyat.jpg"
  },
  {
    title: "Karusel",
    artist: "Orxan Zeynallı",
    src: "assets/music/karusel.mp3",
    cover: "assets/images/karusel.jpg"
  },
  {
    title: "Qaytar eşqimi",
    artist: "MARDAN",
    src: "assets/music/qaytar-esqimi.mp3",
    cover: "assets/images/qaytar-esqimi.jpg"
  },
  {
    title: "Bir bahardır",
    artist: "İradə İbrahimova",
    src: "assets/music/bahar.mp3",
    cover: "assets/images/bahar.jpg"
  },
  {
    title: "Söz olmasaydı",
    artist: "Şövkət Ələkbərova",
    src: "assets/music/soz-olmasaydi.mp3",
    cover: "assets/images/soz-olmasaydi.jpg"
  },
  {
    title: "Ortak",
    artist: "Melike Şahin",
    src: "assets/music/ortak.mp3",
    cover: "assets/images/ortak.jpg"
  },
  {
    title: "Doldum",
    artist: "Adamalar",
    src: "assets/music/doldum.mp3",
    cover: "assets/images/doldum.jpg"
  },
  {
    title: "Hamıdan gözəl mənəm",
    artist: "Şövkət Ələkbərova",
    src: "assets/music/gozel.mp3",
    cover: "assets/images/gozel.jpg"
  },
  {
    title: "Mən beləyəm",
    artist: "Çinarə Məlikzadə",
    src: "assets/music/beleyem.mp3",
    cover: "assets/images/beleyem.jpg"
  }
]

// Song controls

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

loadSong(songs[songIndex]);

function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener('click', nextSong);

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);

// Timing and progress

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateProgress() {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
}
audio.addEventListener('timeupdate', updateProgress);

function setProgress() {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

progress.addEventListener('input', setProgress);
audio.addEventListener('ended', nextSong);

// Volume controls

volumeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  volumePanel.classList.toggle('hidden');
});
volumeSlider.addEventListener('input', (e) => {
  const val = Number(e.target.value);
  audio.volume = val / 100;
  volumePercent.textContent = `${val}%`;
});

volumeSlider.addEventListener('change', () => {
  volumePanel.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  if (!volumePanel.contains(e.target) && e.target !== volumeBtn) {
    volumePanel.classList.add('hidden');
  }
});

// Playlist management

function createPlaylist() {
  playlistDropdown.innerHTML = '';
  songs.forEach((song, index) => {
    const item = document.createElement('li');
    item.classList.add('playlist-item');
    item.innerHTML = `
      <span>${song.title} - ${song.artist}</span>
    `;

    item.addEventListener('click', () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
      playlistDropdown.classList.add('hidden');
    });

    playlistDropdown.appendChild(item);
  });
}

createPlaylist();

playlistArrow.addEventListener('click', (e) => {
  e.stopPropagation();
  playlistDropdown.classList.toggle('hidden');
  playlistArrow.classList.toggle('open');

});

document.addEventListener('click', (e) => {
  if (!playlistDropdown.contains(e.target) && !playlistArrow.contains(e.target)) {
    playlistDropdown.classList.add('hidden');
    playlistArrow.classList.remove('open');
  }
});

