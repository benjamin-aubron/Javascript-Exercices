const loader = document.querySelector(".loader");
const errorInformation = document.querySelector(".error-information");

async function getWeatherData() {
  try {
    const response = await fetch(
      "http://api.airvisual.com/v2/nearest_city?key=ed774a0a-b158-494a-990d-57a8e715f64c"
    );

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`)
    }
    const responseData = await response.json();
    const sortedData = {
      city: responseData.data.city,
      country: responseData.data.country,
      iconID: responseData.data.current.weather.ic,
      temperature: responseData.data.current.weather.tp,
    };
    console.log(sortedData);
    populateUI(sortedData);
  } catch (error) {
    loader.textContent = "";
    errorInformation.textContent = error.message;
  }
}

setTimeout(getWeatherData, 1000);

const place = document.querySelector(".place");
const country = document.querySelector(".country");
const temperature = document.querySelector(".temperature");
const icon = document.querySelector(".icon");

function populateUI(sortedData) {
  place.textContent = sortedData.city;
  country.textContent = sortedData.country;
  country.className = "country text-xl text-center mb-20";
  temperature.textContent = `${sortedData.temperature}°`;
  icon.innerHTML = `
  <img src="https://airvisual.com/images/${sortedData.iconID}.png" class="flex mx-auto justify-center size-20">
  `;
  loader.textContent = "";
}
