const spotifyPlayer = (trackId) =>
  `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

const albums = [
  {
    slug: "joji-sanctuary",
    title: "Sanctuary",
    artist: "Joji",
    cover: "assets/covers/joji-sanctuary.webp",
    player: spotifyPlayer("4VQH4VluDUOsOuDxccTeyN"),
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
    player: spotifyPlayer("00WLowvlN5cjkYpQV6pjo4"),
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
    player: spotifyPlayer("1KZB7zYegoY7sM2AKZday7"),
    x: 43,
    y: 52,
    r: -5,
    z: 12,
  },
  {
    slug: "frank-ocean-seigfried",
    title: "Seigfried",
    artist: "Frank Ocean",
    cover: "assets/covers/frank-ocean-seigfried.webp",
    player: spotifyPlayer("1BViPjTT585XAhkUUrkts0"),
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
    player: spotifyPlayer("0lyqOQHPupP6ruQ0f263WJ"),
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
    player: spotifyPlayer("3Xz3KJ4ZsFmiwRcrzuXV3m"),
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
    player: spotifyPlayer("3Koj6jG4FjCyjjL3hvAIx0"),
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
