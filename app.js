const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector("#search-btn");
const toggleBtn = document.querySelector(".toggle-btn i");

const apiKey = "b9f582c94ccd1f653f37f4e7ad0df9ee";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

async function getWeatherData(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      alert("Invalid City Name");
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    showWeatherInfo(data);
  } catch (error) {
    console.log(error.message);
  }
}

const showWeatherInfo = (data) => {
  document.querySelector(".sub-info1 h2").innerText = data.main.humidity + `%`;

  document.querySelector(".weather-info1 h1").innerText = data.main.temp + `°C`;

  if (data.weather[0].main === "Clear") {
    document.querySelector(".weather-info1 img").src = "images/clear.png";
  } else if (data.weather[0].main === "Clouds") {
    document.querySelector(".weather-info1 img").src = "images/clouds.png";
  } else if (data.weather[0].main === "Mist") {
    document.querySelector(".weather-info1 img").src = "images/mist.png";
  } else if (data.weather[0].main === "Snow") {
    document.querySelector(".weather-info1 img").src = "images/snow.png";
  } else if (data.weather[0].main === "Drizzle") {
    document.querySelector(".weather-info1 img").src = "images/drizzle.png";
  } else if (data.weather[0].main === "Rain") {
    document.querySelector(".weather-info1 img").src = "images/rain.png";
  }
  let locationName = document.querySelector(".search-box input").value;
  document.querySelector(".weather-info1 h2").innerText = locationName;

  document.querySelector(".sub-info2 h2").innerText = data.wind.speed + `km/h`;

  saveData();
};
function saveData() {
  const weatherData = document.querySelector(".main-section").innerHTML;
  localStorage.setItem("weatherInfo", weatherData);
}

function loadData() {
  const savedData = localStorage.getItem("weatherInfo");
  const mainElement = document.querySelector(".main-section");
  if (savedData) {
    mainElement.innerHTML = savedData;
  }
}
loadData();

searchBtn.addEventListener("click", () => {
  getWeatherData(searchBox.value);
});

searchBox.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.id === "selected") {
    toggleBtn.removeAttribute("class", "fa-solid fa-toggle-on");
    toggleBtn.setAttribute("class", "fa-solid fa-toggle-off");

    document.querySelector("body").classList.remove("dark-mode");
    toggleBtn.removeAttribute("id", "selected");
  } else {
    toggleBtn.removeAttribute("class", "fa-solid fa-toggle-off");
    toggleBtn.setAttribute("class", "fa-solid fa-toggle-on");

    document.querySelector("body").classList.add("dark-mode");

    toggleBtn.setAttribute("id", "selected");
  }

  saveToggleBtn();
});

//For toggle button
function saveToggleBtn() {
  let isDarkMode = document
    .querySelector("body")
    .classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

function displayToggleBtn() {
  let isDarkMode = localStorage.getItem("darkMode") === "true";
  const body = document.querySelector("body");

  if (isDarkMode) {
    body.classList.add("dark-mode");
    toggleBtn.classList.remove("fa-toggle-off");
    toggleBtn.classList.add("fa-toggle-on");
    toggleBtn.setAttribute("id", "selected");
  } else {
    body.classList.remove("dark-mode");
    toggleBtn.classList.remove("fa-toggle-on");
    toggleBtn.classList.add("fa-toggle-off");
    toggleBtn.removeAttribute("id", "selected");
  }
}

displayToggleBtn();
