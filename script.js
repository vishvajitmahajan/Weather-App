let weather = {
  url: "https://calm-tan-springbok-gown.cyclic.app/api/weather",
  fetchWeather: async function (city) {
    const result = await fetch(this.url, {
      method: "POST",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    });
    const data = await result.json();
    console.log(data);
    this.displayWeather(data);
    this.showHistory();
  },
  displayWeather: function (data) {
    const { name, visibility } = data;
    const { icon, description } = data.weather[0];
    const {
      temp,
      humidity,
      pressure,
      temp_min: min,
      temp_max: max,
    } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = "Temperature: " + temp + "°C";
    document.querySelector(".min").innerText = "Min Temp: " + min + "°C";
    document.querySelector(".max").innerText = "Max Temp: " + max + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

    document.querySelector(".weather").classList.remove("loading");
    switch (description) {
      case "clear sky":
        document.body.style.backgroundImage = "url(assets/clear_sky.jpg)";
        break;
      case "few clouds":
        document.body.style.backgroundImage = "url(assets/few_clouds.jpg)";
        break;
      case "scattered clouds":
        document.body.style.backgroundImage =
          "url(assets/scattered_clouds.jpg)";
        break;
      case "broken clouds":
        console.log("broken");
        document.body.style.backgroundImage = "url(assets/broken_clouds.jpg)";
        break;
      case "shower rain":
        document.body.style.backgroundImage = "url(assets/shower_rain.jpg)";
        break;
      case "rain":
        document.body.style.backgroundImage = "url(assets/rain.jpg)";
        break;
      case "thunderstorm":
        document.body.style.backgroundImage = "url(assets/thunderstorm.jpg)";
        break;
      case "snow":
        document.body.style.backgroundImage = "url(assets/snow.jpg)";
        break;
      case "mist":
        document.body.style.backgroundImage = "url(assets/mist.jpg)";
        break;
      default:
        document.body.style.backgroundImage = "url(assets/default.jpg)";
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
  getWeatherData: async function () {
    const result = await fetch(this.url);
    const { current, history } = await result.json();
    return { current, history };
  },
  showDefaultWeather: async function () {
    const { current } = await this.getWeatherData();
    this.displayWeather(current);
  },
  clearHistory: function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  },
  showHistory: async function () {
    const { history } = await this.getWeatherData();
    const list = document.querySelector(".history");
    this.clearHistory(list);
    history.filter(history=>history.data.cod===200).reverse().forEach((history) => {
      const { data: item, createdAt } = history;
      const date = new Date(Date.parse(createdAt)).toDateString();
      const time = new Date(Date.parse(createdAt)).toLocaleTimeString();
      const { name, visibility } = item;
      const { icon, description } = item.weather[0];
      const {
        temp,
        humidity,
        pressure,
        temp_min: min,
        temp_max: max,
      } = item.main;
      const { speed } = item.wind;
      const div = document.createElement("div");
      const metaDiv = document.createElement("div");
      const imgDiv = document.createElement("div");
      const image = document.createElement("img");
      const Name = document.createElement("h4");
      const weather = document.createElement("h4");
      const Datee = document.createElement("h6");
      const Time = document.createElement("h6");
      metaDiv.classList.add("meta");
      div.classList.add("flex-between");
      div.classList.add("item");
      imgDiv.classList.add("imgDiv");
      image.src = "https://openweathermap.org/img/wn/" + icon + ".png";
      weather.textContent = description;
      Name.textContent = name;
      Datee.textContent = date;
      Time.textContent = time;
      metaDiv.appendChild(Name);
      metaDiv.appendChild(Datee);
      metaDiv.appendChild(Time);
      imgDiv.appendChild(image);
      imgDiv.appendChild(weather);
      div.appendChild(metaDiv);
      div.appendChild(imgDiv);
      list.appendChild(div);
    });
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

weather.showDefaultWeather();
weather.showHistory();
