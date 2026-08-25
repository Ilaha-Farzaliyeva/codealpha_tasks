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
const playlistContainer = document.querySelector('.playlist');

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
]

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

function createPlaylist() {
  playlistContainer.innerHTML = '';
  songs.forEach((song, index) => {
    const item = document.createElement('div');
    item.classList.add('playlist-item');
    item.innerHTML = `
      <span>${song.title} - ${song.artist}</span>
    `;

    item.addEventListener('click', () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });

    playlistContainer.appendChild(item);
  });
}

createPlaylist();