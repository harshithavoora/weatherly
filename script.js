const apiKey = '4baed415ddfd06d70fe03b8bbbf440fe';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === '404') {
      document.getElementById('weatherResult').innerHTML = `<p>City not found</p>`;
      return;
    }

    // Adding weather icons
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weatherHtml = `
      <img src="${iconUrl}" alt="Weather Icon" class="weather-icon" />
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherHtml;

  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById('weatherResult').innerHTML = `<p>Error fetching weather data</p>`;
  }
}
