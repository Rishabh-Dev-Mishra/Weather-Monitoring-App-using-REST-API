/**
 * Weather App
 */

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response) => {
    return response.json();
  });
};

/**
 * Retrieve city input and get the weather data
 */
searchCity = () => {
  const city = document.getElementById("city-input").value;
  getWeatherData(city)
    .then((res) => {
      showWeatherData(res);
    })
    .catch((error) => {
      console.log(error);
      console.log("Something happend");
    });
};

/**
 * Show the weather data in HTML
 */

const FtoC = (temp)=>{
  let celsius= (temp-32)/1.8;
  return celsius;
}

showWeatherData = (weatherData) => {
  document.getElementById("city-name").innerText = weatherData.name;
  document.getElementById("weather-type").innerText =
    weatherData.weather[0].main;
    // let celsius= (weatherData.main.temp-32)/1.8;
  document.getElementById("temp").innerText = Math.round(FtoC(weatherData.main.temp));
  document.getElementById("min-temp").innerText = FtoC(weatherData.main.temp_min);
  document.getElementById("max-temp").innerText = FtoC(weatherData.main.temp_max);
  document.getElementById("weather-output").classList.add("visible");
};
