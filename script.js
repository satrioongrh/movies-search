// ajax, jquery

// $(".search-btn").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?i=tt3896198&apikey=a7e84d4c&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movie-container").html(cards);

//       // ketika di klik
//       $(".btn-moviesDetail").on("click", function () {
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=a7e84d4c&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = movieDetails(m);
//             $(".detailMovies").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

//vanila js

// const searchbtn = document.querySelector(".search-btn");
// searchbtn.addEventListener("click", function () {
//   let inputkeyword = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?i=tt3896198&apikey=a7e84d4c&s=" + inputkeyword.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // ketika di klik
//       const showdetails = document.querySelectorAll(".btn-moviesDetail");
//       showdetails.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=a7e84d4c&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = movieDetails(m);
//               const modalbody = document.querySelector(".detailMovies");
//               modalbody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

//vanila js refactor fetch

const searchbtn = document.querySelector(".search-btn");
searchbtn.addEventListener("click", async function () {
  try {
    let inputkeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputkeyword.value);
    console.log(movies);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

// event binding

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("btn-moviesDetail")) {
    const imdbid = e.target.dataset.imdbid;
    const details = await getDetailMovies(imdbid);
    updateUIMovies(details);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=a7e84d4c&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function getDetailMovies(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=a7e84d4c&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIMovies(m) {
  const movieDetail = movieDetails(m);
  const modalbody = document.querySelector(".detailMovies");
  modalbody.innerHTML = movieDetail;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
                    <div class="card">
                      <img src="${m.Poster}" class="card-img-top" />
                      <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary btn-moviesDetail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${m.imdbID}">show details</a>
                      </div>
                    </div>
                  </div>`;
}

function movieDetails(m) {
  return `<div class="container-fluid">
                                  <div class="row">
                                    <div class="col-md-3">
                                      <img src="${m.Poster}" class="img-fluid" />
                                    </div>
                                    <div class="col-md">
                                      <ul class="list-group">
                                        <li class="list-group-item"><h4>${m.Title}</h4></li>
                                        <li class="list-group-item"><strong>Sutradara :</strong>${m.Director}</li>
                                        <li class="list-group-item"><strong>actors :</strong>${m.Actors}</li>
                                        <li class="list-group-item"><strong>writer :</strong>${m.Writer}</li>
                                        <li class="list-group-item"><strong>plot :</strong><br />${m.Plot}</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>`;
}
