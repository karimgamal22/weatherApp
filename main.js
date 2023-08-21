const api = {
  key: "5585df2bff792a8556e3fda6c5eda943",
  base: "https://api.openweathermap.org/data/2.5/",
  location_api: "0f761a30-fe14-11e9-b59f-e53803842572",
};
let weather = {};
let mainClass = "";
const app_container = document.getElementById("app_container");
const weather_location = document.getElementById("location");
const date = document.getElementById("date");
const temperature_current = document.getElementById("temperature_current");
const temperature_max_min = document.getElementById("temperature_max_min");
const _typeweather = document.getElementById("_typeweather");
const weather_desc = document.getElementById("weather_desc");

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    firstcall();
    addsearchlisener();
  }
});

const addsearchlisener = () => {
  let location_input = document.getElementById("location_input");
  location_input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      getweatherdata(location_input.value);
    }
  });
};

const firstcall = () => {
  fetch("https://geolocation-db.com/json/" + api.location_api)
    .then((res) => res.json())
    .then((result) => {
      getweatherdata(result.city);
    });
};

addsearchlisener();
const getweatherdata = (city) => {
  fetch(`${api.base}weather?q=${city}&&units=metric&appid=${api.key}`)
    .then((res) => res.json())
    .then((data) => {
      weather = { ...data };
      fill_data(weather);
    });
};

const fill_data = (weather) => {
  mainClass =
    typeof weather.main != undefined
      ? weather.main.temp > 18
        ? "hot"
        : "cold"
      : "";
  app_container.className = mainClass;
  weather_location.innerHTML = `${weather.name} , ${weather.sys.country}`;
  date.innerHTML = datebuild(new Date());
  temperature_current.innerHTML = `temperaturecurrent ${Math.round(
    weather.main.temp
  )} °C`;
  temperature_max_min.innerHTML = `
  High:${Math.round(weather.main.temp_max)}°C
  ,
  Low:${Math.round(weather.main.temp_min)}°C
  `;
  _typeweather.innerHTML = `${weather.weather[0].main}`;
  weather_desc.innerHTML = `${
    weather.weather[0].description
  } wind speed is ${Math.round(weather.wind.speed)}`;
};

const datebuild = (d) => {
  let date = String(new window.Date());
  date = date.slice(3, 15);
  return date;
};
getweatherdata();
