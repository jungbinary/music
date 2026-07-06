const albums = [
  {
    slug: "joji-sanctuary",
    title: "Sanctuary",
    artist: "Joji",
    cover: "assets/covers/joji-sanctuary.webp",
    youtube: "https://www.youtube.com/watch?v=YWN81V7ojOE",
    x: 14,
    y: 33,
    r: -13,
    z: 3,
  },
  {
    slug: "joji-die-for-you",
    title: "Die For You",
    artist: "Joji",
    cover: "assets/covers/joji-die-for-you.webp",
    youtube: "https://www.youtube.com/watch?v=OoJ4Ba1rkY4",
    x: 28,
    y: 74,
    r: 9,
    z: 7,
  },
  {
    slug: "black-skirts-king-of-hurts",
    title: "King of Hurts",
    artist: "The Black Skirts",
    cover: "assets/covers/black-skirts-king-of-hurts.webp",
    youtube: "https://www.youtube.com/watch?v=liLuJHShuN4",
    x: 42,
    y: 50,
    r: -5,
    z: 12,
  },
  {
    slug: "frank-ocean-seigfried",
    title: "Seigfried",
    artist: "Frank Ocean",
    cover: "assets/covers/frank-ocean-seigfried.webp",
    youtube: "https://www.youtube.com/watch?v=p_oL2OIGo04",
    x: 56,
    y: 77,
    r: -10,
    z: 4,
  },
  {
    slug: "jaurim-i-am-sorry-i-hate-you",
    title: "I Am Sorry, I Hate You",
    artist: "Jaurim",
    cover: "assets/covers/jaurim-i-am-sorry-i-hate-you.webp",
    youtube: "https://www.youtube.com/watch?v=rBa4ZYxI4vM",
    x: 73,
    y: 31,
    r: 13,
    z: 6,
  },
  {
    slug: "whys-young-dimension-theory",
    title: "Dimension Theory",
    artist: "Whys Young",
    cover: "assets/covers/whys-young-dimension-theory.webp",
    youtube: "https://www.youtube.com/watch?v=IAGBO7OQgXA",
    x: 27,
    y: 42,
    r: -7,
    z: 2,
  },
  {
    slug: "okashii-rumble",
    title: "Rumble",
    artist: "OKASHII",
    cover: "assets/covers/okashii-rumble.webp",
    youtube: "https://www.youtube.com/watch?v=kW4nifkpgFY",
    x: 49,
    y: 24,
    r: 8,
    z: 9,
  },
  {
    slug: "cigarettes-after-sex-k",
    title: "K.",
    artist: "Cigarettes After Sex",
    cover: "assets/covers/cigarettes-after-sex-k.webp",
    youtube: "https://www.youtube.com/watch?v=L4sbDxR22z4",
    x: 78,
    y: 70,
    r: 11,
    z: 5,
  },
];

const albumLayer = document.querySelector(".album-layer");
const nowPlaying = document.querySelector("#nowPlaying");
const closeButton = document.querySelector("#panelClose");
const panelCover = document.querySelector("#panelCover");
const panelTitle = document.querySelector("#panelTitle");
const panelArtist = document.querySelector("#panelArtist");
const youtubeLink = document.querySelector("#youtubeLink");

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
  youtubeLink.href = album.youtube;
  nowPlaying.classList.add("is-visible");
  nowPlaying.removeAttribute("aria-hidden");
}

function closePanel() {
  nowPlaying.classList.remove("is-visible");
  nowPlaying.setAttribute("aria-hidden", "true");
  youtubeLink.href = "#";
  document.querySelectorAll(".album-card.is-active").forEach((card) => {
    card.classList.remove("is-active");
  });
}

albums.forEach(makeCard);
closeButton.addEventListener("click", closePanel);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanel();
});
