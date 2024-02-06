async function searchWeatherInformation(e) {
    const apiKey = "76cb01ad9a2578a192f7863c7ec385fd";

    // Find the user's city
    const usernData = sessionStorage.getItem('username');
    const cityData = document.getElementById('citySearch').value;

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityData}&limit=1&appid=${apiKey}`;

    // Fetch the coordinates
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const lon = data[0].lon;
    const lat = data[0].lat;
    const country = data[0].country;
    const state = data[0].state;

    // Fetch the weather information
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
        throw new Error(`HTTP error! status: ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();
    const temperature = weatherData.main.temp;

    const temperatureElement = document.getElementById('city_temperature');
    temperatureElement.textContent = `The current temperature in ${cityData}, located in ${state} (${country}), is ${temperature}°C`;
    
    const weatherCondition = weatherData.weather[0].main;
    const imgElement = document.createElement('img');

    switch (weatherCondition) {
    case 'Clear':
        imgElement.src = '/weather-pictures/Clear.png';
        break;
    case 'Clouds':
        imgElement.src = '/weather-pictures/Clouds.png';
        break;
    case 'Rain':
        imgElement.src = '/weather-pictures/Rain.png';
        break;
    case 'Snow':
        imgElement.src = '/weather-pictures/Snow.png';
        break;
    case 'Thunderstorm':
        imgElement.src = '/weather-pictures/Thunderstorm.png';
        break;
    }

    const container = document.getElementById('research_temperature');
    container.innerHTML = '';
    container.appendChild(imgElement);
}