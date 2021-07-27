const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  //validate mandatory fields

  const cityElementValue = document.querySelector("#ciudad").value;
  const countryElementValue = document.querySelector("#pais").value;

  console.log(cityElementValue);
  console.log(countryElementValue);

  if (cityElementValue === "" || countryElementValue === "") {
    showError("Debes rellenar los dos campos");

    return;
  }

  askAPI(cityElementValue, countryElementValue);
}

//ask API

function showError(msg) {
  const alertElement = document.querySelector(".bg-red-100");

  if (!alertElement) {
    //create alert

    const alert = document.createElement("div");

    alert.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alert.innerHTML = `
  <strong class="font-bold">Error!</strong>
  <span class="block">${msg}</span>`;

    container.appendChild(alert);

    //remove alert after 5 sec

    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
}

function askAPI(cityElementValue, countryElementValue) {
  const appId = "332450c72eb611ebb192c76792f2ee0a";

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityElementValue},${countryElementValue}&appid=${appId}`;

  Spinner(); //show the spinner while page rendering

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cleanHTML(); //clean previous html
      if (data.cod === "404") {
        showError("esa ciudad no existe...");
        return;
      }

      //show data in html
      showWeather(data);
    });
}

function showWeather(data) {
  const {
    name,
    main: { temp, temp_max, temp_min, humidity },
  } = data;

  const tempCentigrades = Math.round(temp) - 273;
  const max = Math.round(temp_max) - 273;
  const min = Math.round(temp_min) - 273;

  const nameCity = document.createElement("p");
  nameCity.textContent = `El tiempo para hoy en ${name}`;
  nameCity.classList.add("font-bold", "text-2xl");

  const actualTemp = document.createElement("p");
  actualTemp.innerHTML = `${tempCentigrades} &#8451;`;
  actualTemp.classList.add("font-bold", "text-6xl");

  const tempMax = document.createElement("p");
  tempMax.innerHTML = `Max: ${max} &#8451;`;
  tempMax.classList.add("text-xl");

  const tempMin = document.createElement("p");
  tempMin.innerHTML = `Min: ${min} &#8451;`;
  tempMin.classList.add("text-xl");

  const humidityDate = document.createElement("p");
  humidityDate.textContent = `Humedad relativa: ${humidity} %`;
  humidityDate.classList.add("text-xl");

  const resultDiv = document.createElement("div");
  resultDiv.classList.add("text-center", "text-white");
  resultDiv.appendChild(nameCity);
  resultDiv.appendChild(actualTemp);
  resultDiv.appendChild(tempMax);
  resultDiv.appendChild(tempMin);
  resultDiv.appendChild(humidityDate);

  resultado.appendChild(resultDiv);
}

function cleanHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  cleanHTML();

  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");
  divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
`;
  resultado.appendChild(divSpinner);
}
