// I broke the API in parts. Better to understand- Fabio
const api_base = "https://api.themoviedb.org/3"
const api_key = "api_key=477f5f5debaf48768ed55d725362b931"
const nowPlaying = "/movie/now_playing?"
const bestRated = "/movie/top_rated?"
const popular = "/movie/popular?"
const upcoming = "/movie/upcoming?"

const searchURL ="https://api.themoviedb.org/3/search/movie?api_key=477f5f5debaf48768ed55d725362b931";

const title = document.querySelector(".title");
const container = document.querySelector(".container");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

// dropdown buttons- Fabio
const popularBtn = document.querySelector('#popular')
const topRatedBtn = document.querySelector('#topRated')
const upComingBtn = document.querySelector('#upcoming')
const sortAtoZ = document.querySelector('#sortAtoZ')


// API FETCH
function getMovies(api){
  fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        const movie = data.results;
        // sortAtoZ(movie);
        // sortByPopularity(movie);
        // sortByReleaseDate(movie);
        // sortByRating(movie);
        cardSyntax(movie)
      })
      .catch((err) => console.log(err));
  }
    getMovies(api_base + nowPlaying + api_key)
  
    
// SORT/FILTER (NAV BAR)
const sort = document.querySelector("#sort-filter");
const dropdown = document.querySelector(".no-content");
sort.addEventListener("click", filter);

function filter() {
  const arrow = document.getElementById("arrow");
  arrow.classList.toggle("rotate-arrow");
  dropdown.classList.toggle("dropdown-content");
  dropdown.classList.toggle("no-content");
}



// CARD SYNTAX FUNCTION
function cardSyntax(movies) {
  let details = movies.map((item) => {
    return` 
    <a class="card" href="../details/details.html?id=${item.id}">
      <img src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt="">
      <div class="rating">${item.vote_average.toFixed(1)}</div>
    </a>`
  }).join('');
  title.innerHTML = "Now Playing"
  container.innerHTML = details;
}

//filter to Most Popular- Fabio
function mostPopular(popular){
  fetch(popular)
     .then((response) => response.json())
     .then((data) => {
       const movie = data.results;
       cardSyntax(movie)
       title.innerHTML = 'Most Popular'
     })
     .catch((err) => console.log(err));
   }   
popularBtn.addEventListener('click', ()=> {
  mostPopular(api_base + popular + api_key)
})


//filter to Best Rated- Fabio
function topRated(bestRate){
  fetch(bestRate)
     .then((response) => response.json())
     .then((data) => {
       const movie = data.results;
       cardSyntax(movie)
       title.innerHTML = 'Best Rated'
     })
     .catch((err) => console.log(err));
   }   
topRatedBtn.addEventListener('click', ()=> {
  topRated(api_base + bestRated + api_key)
})


//filter to Upcoming- Fabio
function upComing(upcomig){
  fetch(upcomig)
     .then((response) => response.json())
     .then((data) => {
       const movie = data.results;
       cardSyntax(movie)
       title.innerHTML = 'Upcoming'
     })
     .catch((err) => console.log(err));
   }  
upComingBtn.addEventListener('click', ()=> {
  upComing(api_base + upcoming + api_key)
})



// FILTER FUNCTIONS

// sortAtoZ can be updated to omit 'A' and 'The'.
// ie, show 'The Whale' as 'W' in the alphabet instead of 'T'.
// - Scott
// function sortAtoZ(movie) {
//   let details = movie.sort((a, b) => a.title.localeCompare(b.title)).map(item => cardSyntax(item)
//   ).join('');
//   title.innerHTML = `<h2>A to Z</h2>`;
//   container.innerHTML = details;
// }
// function sortByPopularity(movie) {
//   let details = movie.sort((a, b) => b.popularity - a.popularity).map(item => cardSyntax(item)
//   ).join('');
//   title.innerHTML = `<h2>Most Popular</h2>`;
//   container.innerHTML = details;
// }
// function sortByReleaseDate(movie) {
//   let details = movie.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).map(item => cardSyntax(item)
//   ).join('');
//   title.innerHTML = `<h2>New Releases</h2>`;
//   container.innerHTML = details;
// }
// function sortByRating(movie) {
//   let details = movie.sort((a, b) => b.vote_average - a.vote_average).map(item => cardSyntax(item)
//   ).join('');
//   title.innerHTML = `<h2>Best Rated</h2>`;
//   container.innerHTML = details;
// }



// SEARCH 
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;
  if (searchValue) {
    getMovies(searchURL +"&query="+ searchValue);

    // search = ''; commented out this code, as it was giving and error with resetting the search after submit. seems to work now --Ray
  } else {
    getMovies(api_base + nowPlaying + api_key);
  }
//Added the code below to reset the search value --Ray
  document.querySelector("#search").value = "";
});

// Observation:
// -we are missing A to Z filter
// -Title inside the grid is too small, maybe we can position it in the middle
// -- After you type anything in the search, We have to remove the name from the input
