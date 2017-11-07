


let getLocation = function () {
          navigator.geolocation.getCurrentPosition(getWeather);

}


let getWeather = function(hallo) {
  let latitude = hallo.coords.latitude;
  let longitude = hallo.coords.longitude;
  console.log ("The latitude is " + latitude + " and the longitude is " + longitude)

  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'


  fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);

}

document.getElementById("get_forecast").addEventListener("click", getLocation);

let convertToJSON = function(response) {
  return response.json();
}

let updateWeather = function(test) {
  let city = test.name;
  let temp = test.main.temp;
  let tempr = Math.round(temp);
  let icon = test.weather[0].icon;
  let celcius = ((temp-32)/1.8);
  let cel = Math.round(celcius);
  celdec = cel/10;


  document.querySelector("#weather h4").innerHTML = city;
  document.querySelector("#weather p").innerHTML = "It is " + tempr + " ℉ " + "/ " + cel + " ℃" + " Outside";
  document.querySelector("#weather img").src= "http://openweathermap.org/img/w/" + icon + ".png";
}



let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
}
