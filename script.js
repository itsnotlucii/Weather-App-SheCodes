let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();
let year = now.getFullYear();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let currentTime = document.querySelector("#current-time");
let morning = "am";
let evening = "pm";
if (hours < 12) {
  currentTime.innerHTML = `${hours}:${minutes} ${morning}`;
} else {
  currentTime.innerHTML = `${hours}:${minutes} ${evening}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${date} ${month} ${year}`;

function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  if (searchInput.value.length > 0) {
    let units = "metric";
    let apiKey = "c83467d2813a5ff97677bad9626889da";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
    let area = document.querySelector("#area");
    area.innerHTML = `${searchInput.value}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
  } else {
    alert("Where the heckeroonie are you? 🤔");
  }
}
let form = document.querySelector("#weather-search");
form.addEventListener("submit", showSearch);

function displayTemperature(response) {
  let area = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${area}°C`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = "metric";
  let apiKey = "c83467d2813a5ff97677bad9626889da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocalWeather);

  function showLocalWeather(response) {
    let localCityName = response.data.name;
    let localCityElement = document.querySelector("#area");
    localCityElement.innerHTML = `${localCityName}`;

    let localCityTemp = Math.round(response.data.main.temp);
    let localCityTempElement = document.querySelector("#main-temp");
    localCityTempElement.innerHTML = `${localCityTemp}°C`;
  }
}

let currentLocButton = document.querySelector("#current-location-button");
currentLocButton.addEventListener("click", getCurrentPosition);
