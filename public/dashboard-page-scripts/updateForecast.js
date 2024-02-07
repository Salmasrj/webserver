async function updateForecast(e) {
    //document.getElementById("slidingContainer").hidden = false;
    const apiKey = "76cb01ad9a2578a192f7863c7ec385fd";

    // Find the user's city
    const usernData = sessionStorage.getItem('username');
    const cityData = sessionStorage.getItem('city');

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityData}&limit=1&appid=${apiKey}`;

    // Fetch the coordinates
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const lon = data[0].lon;
    const lat = data[0].lat;
    
    

    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const options = {weekday: "short", month: "short", day: "numeric", hour:"numeric"}
    
    let dateTimes = [];
    let shortWeathers = [];
    let temperatures = [];
    
    

    for (let i = 1; i <= 5; i++) {    
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error(`HTTP error! status: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        temperatures[i] = weatherData.list[i].main.temp;
        const temperaturesField = document.getElementById("temp"+i);
        temperaturesField.textContent = `${temperatures[i]}`;

        shortWeathers[i] = weatherData.list[i].weather[0].main;
        const shortWeathersField = document.getElementById("weather"+i);
        shortWeathersField.textContent = `${shortWeathers[i]}`;

        dateTimes[i] = weatherData.list[i].dt_txt.main;
        const dateTimesField = document.getElementById("date"+i);
        dateTimesField.textContent = `${dateTimes[i].toLocaleDateString("en-US", options)}`;

    }

        // remplir avec les infos demander

}