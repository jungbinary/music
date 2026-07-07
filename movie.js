const movies = {
  "blade-runner": {
    title: "blade runner",
    year: "1982",
    director: "a film by ridley scott",
    note: "I am drawn to flawed messiahs:\nthose not chosen by fate, but made sacred by failure and lack.",
    poster: "assets/movie/blade-runner.webp",
  },
  matrix: {
    title: "matrix",
    year: "1999",
    director: "a film by the wachowskis",
    poster: "assets/movie/the-matrix.webp",
  },
  alien: {
    title: "alien",
    year: "1979",
    director: "a film by ridley scott",
    poster: "assets/movie/alien.webp",
  },
  "dune-part-one": {
    title: "dune part 1",
    year: "2021",
    director: "a film by denis villeneuve",
    poster: "assets/movie/dune-part-one.webp",
  },
};

const moviePanel = document.querySelector("#moviePanel");
const moviePanelClose = document.querySelector("#moviePanelClose");
const moviePanelTitle = document.querySelector("#moviePanelTitle");
const moviePanelYear = document.querySelector("#moviePanelYear");
const moviePanelDirector = document.querySelector("#moviePanelDirector");
const moviePanelNote = document.querySelector("#moviePanelNote");

function openMoviePanel(movieKey) {
  const movie = movies[movieKey];
  if (!movie) return;

  document.querySelectorAll(".poster-card.is-active").forEach((poster) => {
    poster.classList.remove("is-active");
  });

  document.querySelector(`[data-movie="${movieKey}"]`)?.classList.add("is-active");
  moviePanelTitle.textContent = movie.title;
  moviePanelYear.textContent = `(${movie.year})`;
  moviePanelDirector.textContent = movie.director;
  moviePanelNote.textContent = movie.note || "";
  moviePanelNote.hidden = !movie.note;
  moviePanel.classList.add("is-visible");
  moviePanel.removeAttribute("aria-hidden");
}

function closeMoviePanel() {
  moviePanel.classList.remove("is-visible");
  moviePanel.setAttribute("aria-hidden", "true");
  document.querySelectorAll(".poster-card.is-active").forEach((poster) => {
    poster.classList.remove("is-active");
  });
}

document.querySelectorAll(".poster-card").forEach((poster) => {
  poster.addEventListener("click", () => openMoviePanel(poster.dataset.movie));
});

moviePanelClose.addEventListener("click", closeMoviePanel);
