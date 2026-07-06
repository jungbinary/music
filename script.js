const albums = [
  {
    slug: "joji-sanctuary",
    title: "Sanctuary",
    artist: "Joji",
    cover: "assets/covers/joji-sanctuary.webp",
    player:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/jojiofficial/sanctuary&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false",
    x: 17,
    y: 34,
    r: -13,
    z: 3,
  },
  {
    slug: "joji-die-for-you",
    title: "Die For You",
    artist: "Joji",
    cover: "assets/covers/joji-die-for-you.webp",
    player: "https://www.youtube.com/embed/OoJ4Ba1rkY4?autoplay=1&playsinline=1&rel=0",
    x: 30,
    y: 73,
    r: 9,
    z: 7,
  },
  {
    slug: "black-skirts-king-of-hurts",
    title: "King of Hurts",
    artist: "The Black Skirts",
    cover: "assets/covers/black-skirts-king-of-hurts.webp",
    player: "https://www.youtube.com/embed/liLuJHShuN4?autoplay=1&playsinline=1&rel=0",
    x: 43,
    y: 52,
    r: -5,
    z: 5,
  },
  {
    slug: "frank-ocean-seigfried",
    title: "Seigfried",
    artist: "Frank Ocean",
    cover: "assets/covers/frank-ocean-seigfried.webp",
    player: "https://www.youtube.com/embed/p_oL2OIGo04?autoplay=1&playsinline=1&rel=0",
    x: 61,
    y: 74,
    r: -10,
    z: 4,
  },
  {
    slug: "jaurim-i-am-sorry-i-hate-you",
    title: "I Am Sorry, I Hate You",
    artist: "Jaurim",
    cover: "assets/covers/jaurim-i-am-sorry-i-hate-you.webp",
    player: "https://www.youtube.com/embed/rBa4ZYxI4vM?autoplay=1&playsinline=1&rel=0",
    x: 75,
    y: 32,
    r: 13,
    z: 6,
  },
  {
    slug: "leegodo-mouse",
    title: "Mouse",
    artist: "lee-godo",
    cover: "assets/covers/leegodo-mouse.webp",
    player: "https://www.youtube.com/embed/fLWuMf3ggHc?autoplay=1&playsinline=1&rel=0",
    x: 83,
    y: 64,
    r: -7,
    z: 8,
  },
  {
    slug: "okashii-rumble",
    title: "Rumble",
    artist: "OKASHII",
    cover: "assets/covers/okashii-rumble.webp",
    player: "https://www.youtube.com/embed/kW4nifkpgFY?autoplay=1&playsinline=1&rel=0",
    x: 54,
    y: 24,
    r: 8,
    z: 9,
  },
];

const albumLayer = document.querySelector(".album-layer");
const nowPlaying = document.querySelector("#nowPlaying");
const closeButton = document.querySelector("#panelClose");
const panelCover = document.querySelector("#panelCover");
const panelTitle = document.querySelector("#panelTitle");
const panelArtist = document.querySelector("#panelArtist");
const audioPlayer = document.querySelector("#audioPlayer");

function makeCard(album) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "album-card";
  button.dataset.slug = album.slug;
  button.setAttribute("aria-label", `${album.title} - ${album.artist}`);
  button.style.setProperty("--x-pos", `${album.x}%`);
  button.style.setProperty("--y-pos", `${album.y}%`);
  button.style.setProperty("--r", `${album.r}deg`);
  button.style.setProperty("--z", album.z);

  const sleeve = document.createElement("span");
  sleeve.className = "sleeve";

  const image = document.createElement("img");
  image.src = album.cover;
  image.alt = `${album.title} cover`;
  image.loading = "eager";

  sleeve.append(image);
  button.append(sleeve);
  button.addEventListener("click", () => openPanel(album));
  albumLayer.append(button);
}

function openPanel(album) {
  document.querySelectorAll(".album-card.is-active").forEach((card) => {
    card.classList.remove("is-active");
  });

  albumLayer.querySelector(`[data-slug="${album.slug}"]`)?.classList.add("is-active");
  panelCover.src = album.cover;
  panelCover.alt = `${album.title} cover`;
  panelTitle.textContent = album.title.toLocaleLowerCase("en-US");
  panelArtist.textContent = album.artist.toLocaleLowerCase("en-US");
  audioPlayer.src = album.player;
  nowPlaying.classList.add("is-visible");
  nowPlaying.removeAttribute("aria-hidden");
}

function closePanel() {
  nowPlaying.classList.remove("is-visible");
  nowPlaying.setAttribute("aria-hidden", "true");
  audioPlayer.src = "";
  document.querySelectorAll(".album-card.is-active").forEach((card) => {
    card.classList.remove("is-active");
  });
}

albums.forEach(makeCard);
closeButton.addEventListener("click", closePanel);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanel();
});
