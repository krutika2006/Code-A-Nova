const apiKey = "6c1a7f2b50c316f9914f795e49bdfb17";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        if(weatherData.cod != 200){
            alert(weatherData.message);
            return;
        }

        console.log("Weather Data:", weatherData);

        document.getElementById("cityName").innerText =
        `${weatherData.name}, ${weatherData.sys.country}`;

        document.getElementById("temp").innerText =
        `${Math.round(weatherData.main.temp)}°C`;

        document.getElementById("humidity").innerText =
        weatherData.main.humidity;

        document.getElementById("wind").innerText =
        weatherData.wind.speed;

        document.getElementById("condition").innerText =
        weatherData.weather[0].description;

        document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

        changeTheme(weatherData.weather[0].main);

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        displayForecast(forecastData.list);

    }
    catch(error){
        console.error(error);
        alert("Error fetching weather data");
    }
}

function displayForecast(data){

    const container =
    document.getElementById("forecastContainer");

    container.innerHTML = "";

    for(let i = 0; i < data.length; i += 8){

        const item = data[i];

        const card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <h4>${item.dt_txt.split(" ")[0]}</h4>

            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

            <p><strong>${Math.round(item.main.temp)}°C</strong></p>

            <p>${item.weather[0].main}</p>
        `;

        container.appendChild(card);
    }
}

function changeTheme(condition){

    document.body.className = "";

    condition = condition.toLowerCase();

    console.log("Current Weather Condition:", condition);

    // Snow
    if(
        condition.includes("snow") ||
        condition.includes("sleet") ||
        condition.includes("blizzard")
    ){
        document.body.classList.add("snowy");
    }

    // Thunderstorm
    else if(
        condition.includes("thunder") ||
        condition.includes("storm")
    ){
        document.body.classList.add("thunder");
    }

    // Rain
    else if(
        condition.includes("rain") ||
        condition.includes("drizzle")
    ){
        document.body.classList.add("rainy");
    }

    // Sunny
    else if(condition.includes("clear")){
        document.body.classList.add("sunny");
    }

    // Cloudy
    else if(condition.includes("cloud")){
        document.body.classList.add("cloudy");
    }

    // Default
    else{
        document.body.classList.add("cloudy");
    }
}

// Search using Enter Key
document.getElementById("cityInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getWeather();
    }

});

// Default city on startup
window.onload = function(){

    document.getElementById("cityInput").value = "Nagpur";

    getWeather();


};
