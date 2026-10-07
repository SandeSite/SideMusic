const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Genre filter
const filterButtons = document.querySelectorAll(".filter");
const releaseCards = document.querySelectorAll(".release-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedGenre = button.dataset.filter;

    releaseCards.forEach(card => {
      const cardGenre = card.dataset.genre;
      card.style.display =
        selectedGenre === "All" || cardGenre === selectedGenre
          ? "block"
          : "none";
    });
  });
});

// Demo music player
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerPlay = document.getElementById("playerPlay");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const progressBar = document.querySelector(".progress-bar");

let isPlaying = false;
let progressValue = 0;
let timer = null;

function startDemoTrack(title, artist) {
  playerTitle.textContent = title;
  playerArtist.textContent = artist;
  progressValue = 0;
  progress.style.width = "0%";
  currentTime.textContent = "0:00";
  isPlaying = true;
  playerPlay.textContent = "❚❚";
  runTimer();
}

function runTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (!isPlaying) return;

    progressValue += 0.67;

    if (progressValue >= 100) {
      progressValue = 0;
      isPlaying = false;
      playerPlay.textContent = "▶";
    }

    progress.style.width = progressValue + "%";

    const seconds = Math.floor((progressValue / 100) * 150);
    currentTime.textContent =
      Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
  }, 1000);
}

document.querySelectorAll(".play-button").forEach(button => {
  button.addEventListener("click", () => {
    startDemoTrack(button.dataset.title, button.dataset.artist);
  });
});

playerPlay.addEventListener("click", () => {
  if (playerTitle.textContent === "Nothing playing") return;

  isPlaying = !isPlaying;
  playerPlay.textContent = isPlaying ? "❚❚" : "▶";

  if (isPlaying) {
    runTimer();
  } else {
    clearInterval(timer);
  }
});

progressBar.addEventListener("click", event => {
  if (playerTitle.textContent === "Nothing playing") return;

  const rect = progressBar.getBoundingClientRect();
  const clicked = (event.clientX - rect.left) / rect.width;
  progressValue = Math.max(0, Math.min(100, clicked * 100));
  progress.style.width = progressValue + "%";

  const seconds = Math.floor((progressValue / 100) * 150);
  currentTime.textContent =
    Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
});

// Newsletter demo
const newsletterForm = document.getElementById("newsletterForm");
const formMessage = document.getElementById("formMessage");

newsletterForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();

  if (email) {
    formMessage.textContent = "Thanks — you're on the SideMusic list.";
    newsletterForm.reset();
  }
});

document.getElementById("eventButton").addEventListener("click", () => {
  alert("Events section coming soon.");
});
