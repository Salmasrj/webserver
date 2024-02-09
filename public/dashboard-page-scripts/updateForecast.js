async function updateForecast(e) {
    const apiKey = "76cb01ad9a2578a192f7863c7ec385fd";
    const usernData = sessionStorage.getItem('username');
    const cityData = sessionStorage.getItem('city');

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityData}&limit=1&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const lon = data[0].lon;
    const lat = data[0].lat;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
        throw new Error(`HTTP error! status: ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();
    const slidingContainer = document.getElementById("slidingContainer");
    slidingContainer.innerHTML = "";
    slidingContainer.className = 'slidingContainer';
    const options = {weekday: "short", month: "short", day: "numeric", hour:"numeric"}

    weatherData.list.forEach(element => {
        const newcard = document.createElement('div');
        newcard.className = 'card';
        const temperatures = Math.round(element.main.temp);
        const shortWeathers = element.weather[0].main;
        const dateTimes = new Date(element.dt_txt);
        
        const imgElement = document.createElement('img');

        switch (shortWeathers) {
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

        newcard.innerHTML = `
        <div class="row">
            <div class="column-container">
                <div class="container">
                    <h3 id="date"> ${dateTimes.toLocaleDateString("en-US", options)}</h3>
                    <h4><b id="weather">Weather condition : </b> ${shortWeathers}</h4>
                </div>
                <div class="container">
                    <img id="weather-icon-card" src="${imgElement.src}" alt="weather-icon">
                </div>
            </div>
            <div class="column-container">
                <p id="temp">The temparature will be : ${temperatures}°C</p>
            </div>
        </div>
        `;
        slidingContainer.appendChild(newcard);
    });
}