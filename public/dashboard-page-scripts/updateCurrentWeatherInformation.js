async function updateCurrentWeatherInformation() {
    const apiKey = "76cb01ad9a2578a192f7863c7ec385fd";
    const city = "Berlin";
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    // Fetch the coordinates
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const lon = data[0].lon;
    const lat = data[0].lat;

    // Fetch the weather information
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
        throw new Error(`HTTP error! status: ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();
    const temperature = weatherData.main.temp;

    const temperatureElement = document.getElementById('temperature');
    temperatureElement.textContent = `The current temperature in ${city} is ${temperature}°C`;
}
