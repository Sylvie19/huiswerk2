// Listen for the Search button and contact the movie service.
let form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", function(event) {
  event.preventDefault();
  let search_term = document.getElementsByTagName("input")[0].value;
  getMovie(search_term);
  document.getElementsByTagName("input")[0].value = ""
  document.getElementsByTagName("input")[0].autofocus = 1;
})


// This function takes a potential movie title as input,
// and outputs a URL that will query the service for that title.
let movieServiceUrl = function(title) {
  // let api_key = "e9743662f5a39568d8e25225f2c97e09";
  let api_key = 'bde024f3eb43f597aafe01ed9c9098c6'

  let url = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US";
  url = url + "&query=" + title;
  return url;
}

// This function take a movie title as input,
// contacts the movie service,
// converts the service's response into JSON,
// then updates the page.
// If anything goes wrong, it will display an error message.
let getMovie = function(title) {
  let serviceUrl = movieServiceUrl(title);
  fetch(serviceUrl).then(convertDataToJSON).then(receiveMovieData).catch(displayError);
}

// Convert the movie service's raw response into JSON
// (ie. a JavaScript object)
let convertDataToJSON = function(response) {
  return response.json();
}

// Given the data from the service,
// assume the first result is the best match
// and construct a URL to the poster image.
// Then update the <img> element with that URL.
let receiveMovieData = function(dataFromService) {
  topHit = dataFromService.results[0];

  console.debug("The top hit was: ")
  console.debug(topHit)

if (topHit.title == "Apollo 13") {
  window.alert("You have won 10000000 dollars!!")
}

else{
  window.alert("You didn't win. Nice try.")
}


  // Let's update the page with what we know so far
  document.querySelector("#movie h4").innerHTML = topHit.title + " " + "(" + topHit.release_date.substr (0,4) + ")"
  document.querySelector('#movie img').src = "http://image.tmdb.org/t/p/w300/" + topHit.poster_path;;


  // CHALLENGE #1:
  // Update the page with the movie's overview.

document.querySelector(".card-text em").innerHTML = topHit.overview



  // CHALLENGE #2:
  // Change the code above to also show the year in the h4 element,
  // like this:
  //
  // Apollo 13 (1995)
  //
  // HINT: You'll find the substr() method on string objects useful.
  //       For example, try these in your console:
  //
  //       "Go U NU".substr(0, 2)
  //       "Go U NU".substr(5, 2)
  //       "Go U NU".substr(3, 1)



  // Start getting more info from the API
  // let api_key = "e9743662f5a39568d8e25225f2c97e09";
  let api_key = 'bde024f3eb43f597aafe01ed9c9098c6'
  let credits_url = "https://api.themoviedb.org/3/movie/" + topHit.id + "/credits?api_key=" + api_key
  fetch(credits_url).then(convertDataToJSON).then(receiveCreditsData);
}

let receiveCreditsData = function(dataFromService) {
  console.debug("Cast and crew:")
  console.debug(dataFromService)

  // Challenge #3: Update the page with the name of the director
  //               and the cast.

let roles = dataFromService.cast.slice(0,3)
console.debug("The first three roles are:")
console.debug(roles)
// De laatste regel is alleen bedoeld zodat je in de console kunt zien wat er gebeurt, dit heeft geen verder nut

for (role of roles) {
console.debug(role.name + " played " + role.character)
}





document.querySelector("#actor1").innerHTML = role.name
document.querySelector("#actor2").innerHTML = role.name + " played " + role.character
document.querySelector("#actor3").innerHTML = role.name + " played " + role.character

  //
  // HINTS:
  // * The crew will have someone with the "job" of "Director"
  // * For the cast, the slice() method on arrays can be useful.
  //   For example, try this in your console:
  //
  //   ["Global Hub", "Norris", "Allen Center", "Ryan Field"].slice(0,2)
}

let displayError = function(err, status, msg) {
  console.debug(err)
  console.debug(status)
  console.debug(msg)
  window.alert("Sorry, something went wrong.  Check the console for details.");
}

// The official list of genres as published by themoviedb.org
let genres = {
      "28": "Action",
      "12": "Adventure",
      "16": "Animation",
      "35": "Comedy",
      "80": "Crime",
      "99": "Documentary",
      "18": "Drama",
      "10751": "Family",
      "14": "Fantasy",
      "36": "History",
      "27": "Horror",
      "10402": "Music",
      "9648": "Mystery",
      "10749": "Romance",
      "878": "Science Fiction",
      "10770": "TV Movie",
      "53": "Thriller",
      "10752": "War",
      "37": "Western"
  };
