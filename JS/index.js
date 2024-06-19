const input = document.getElementById("location");
const search = document.getElementById("button");
const weather = document.querySelector(".row");
const dataError = document.querySelector(".error");
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "TuesDay",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let country;
search.addEventListener("click", function () {
  country = input.value;
  position(country);
});

async function position(city) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7e881895e5414f10b77122414241906&q=${city}&days=3`
    );
    if (!response.ok) throw new Error("no matching");
    let data = await response.json();
    const dayMonth = new Date(data.forecast.forecastday[0].date);
    const day = dayMonth
      .toDateString()
      .split(" ")
      .slice(1, 3)
      .reverse()
      .join(" ");
    displayData(data, day);
    weather.classList.remove("d-none");
    dataError.classList.add("d-none");
  } catch (error) {
    weather.classList.add("d-none");
    dataError.classList.remove("d-none");
    dataError.innerHTML = `<p class="text-center fs-1 text-danger py-5">Invalid location</p>`;
  }
}

function displayData(data, day) {
  weather.innerHTML = ` <div class="col-md-6 col-lg-4">
  <div class="head py-2">
  <p class="m-0">${dayList[now.getDay()]}</p>
  <span class="m-0">${day}</span>
  </div>
  <div class="main py-4">
  <span class="fs-5 fw-bold">${data.location.name}</span>
  <h1 class="degree">${data.current.temp_c}<sup>o</sup>C</h1>
          <div class="img">
            <img src="${data.current.condition.icon}" alt="sunny">
            </div>
            <p class="fs-6 pt-4 text-primary">${data.current.condition.text}</p>
            <div class="details d-flex justify-content-start gap-5">
            <div class="image d-flex gap-1">
            <img src="imgs/icon-umberella@2x.png" alt="umberella">
            <span class="fw-light">20%</span>
            </div>
            <div class="image d-flex gap-1">
            <img src="imgs/icon-wind@2x.png" alt="umberella">
            <span class="fw-light">18km/h</span>
            </div>
            <div class="image d-flex gap-1">
            <img src="imgs/icon-compass@2x.png" alt="umberella">
            <span class="fw-light">20%</span>
            </div>
            </div>
            </div>
            </div>
            <div class="col-md-6 col-lg-4 second">
        <div class="head py-2">
          <p class="m-0 m-auto">${dayList[now.getDay() + 1]}</p>
        </div>
        <div class="main py-4 text-center">
        <div class="img my-3">
        <img src="${
          data.forecast.forecastday[1].day.condition.icon
        }" alt="sunny">
        </div>
        <span class="degree">${
          data.forecast.forecastday[1].day.maxtemp_c
        }<sup>o</sup>C</span>
        <span class="low d-block text-secondary fs-5">${
          data.forecast.forecastday[1].day.mintemp_c
        }<sup>o</sup></span>
        <p class="fs-6 pt-4 text-primary">${
          data.forecast.forecastday[1].day.condition.text
        }</p>
        </div>
        </div>
        <div class="col-md-6 col-lg-4">
        <div class="head py-2">
        <p class="m-0 m-auto">${dayList[now.getDay() + 2]}</p>
        </div>
        <div class="main py-4 text-center">
        <div class="img my-3">
        <img src="${
          data.forecast.forecastday[2].day.condition.icon
        }" alt="sunny">
        </div>
        <span class="degree">${
          data.forecast.forecastday[2].day.maxtemp_c
        }<sup>o</sup>C</span>
        <span class="low d-block text-secondary fs-5">${
          data.forecast.forecastday[2].day.mintemp_c
        }<sup>o</sup></span>
        <p class="fs-6 pt-4 text-primary">${
          data.forecast.forecastday[2].day.condition.text
        }</p>
        </div>
        </div>`;
}

(function myLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const { latitude, longitude } = position.coords;
        try {
          let response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=7e881895e5414f10b77122414241906&days=3&q=${latitude},${longitude}`
          );
          if (!response.ok) throw new Error("no matching");
          let data = await response.json();
          const dayMonth = new Date(data.forecast.forecastday[0].date);
          const day = dayMonth
            .toDateString()
            .split(" ")
            .slice(1, 3)
            .reverse()
            .join(" ");
          displayData(data, day);
          weather.classList.remove("d-none");
          dataError.classList.add("d-none");
        } catch (error) {
          weather.classList.add("d-none");
          dataError.classList.remove("d-none");
          dataError.innerHTML = `<p class="text-center fs-1 text-danger py-5">Invalid location</p>`;
        }
      },
      function () {
        position("cairo");
      }
    );
  } else {
    alert("your browser does not support geolocation");
  }
})();
