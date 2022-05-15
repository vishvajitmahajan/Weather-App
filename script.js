let weather = {
  apiKey: "763d781f62d97fdbac6fcfbec5ffb6c9",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    switch(description)
    {
      case "clear sky":
                        document.body.style.backgroundImage ="url(assets/clear_sky.jpg)"
                        break
      case "few clouds":
                        document.body.style.backgroundImage ="url(assets/few_clouds.jpg)"
                        break
      case "scattered clouds":
                        document.body.style.backgroundImage ="url(assets/scattered_clouds.jpg)"
                        break
      case "broken clouds":
        console.log("broken")
                        document.body.style.backgroundImage ="url(assets/broken_clouds.jpg)"
                        break
      case "shower rain":
                        document.body.style.backgroundImage ="url(assets/shower_rain.jpg)"
                        break
      case "rain":
                        document.body.style.backgroundImage ="url(assets/rain.jpg)"
                        break
      case "thunderstorm":
                        document.body.style.backgroundImage ="url(assets/thunderstorm.jpg)"
                        break
      case "snow":
                        document.body.style.backgroundImage ="url(assets/snow.jpg)"
                        break
      case "mist":
                        document.body.style.backgroundImage ="url(assets/mist.jpg)"
                        break
      default:
        document.body.style.backgroundImage ="url(assets/default.jpg)"
                        
    }
/* 
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')"; */
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Chinchwad");
