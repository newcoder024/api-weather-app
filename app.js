const apiKey = "85a07391f9cff6eeb48b4398fdb483ca"; // api-sleutel voor OpenWeatherMap

function searchCity(){
    const city = document.getElementById("locationInput").value.trim();
    document.getElementById("result-cont").style.display = "flex"; // maak de section zichtbaar
    document.getElementById("main-results").style.display = "flex"; // maak de main zichtbaar
    document.getElementById("weather-results").style.display = "flex"; // maak de weather-results zichtbaar
    document.getElementById("data").style.display = "block"; // maak de data zichtbaar

    if (city === "") {
        document.getElementById("weather-results").innerHTML = "<p>Look up a city to see the weather.</p>";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`)
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
    .then(data => {
        const weather = {
            location: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            description: data.weather[0].description,
            feels: data.main.feels_like,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
            pressure: data.main.pressure,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
        }
        // const icon = document.getElementById("weather-icon");
        // icon.src = `https://openweathermap.org/img/wn/${weather.icon}.png`;
        // icon.alt = weather.description;
        document.getElementById("wind").textContent = `${weather.wind} m/s`;
        document.getElementById("humid").textContent = `${weather.humidity}%`;
        document.getElementById("feels").textContent = `${weather.feels} °C`;
        document.getElementById("pressure").textContent = `${weather.pressure} hPa`;
        document.getElementById("temp-min").textContent = `${weather.temp_min} °C`;
        document.getElementById("temp-max").textContent = `${weather.temp_max} °C`;

        document.getElementById("temp").textContent = `${weather.temp} °C`;
        document.getElementById("desc").textContent = `${weather.description}`;
        document.getElementById("city").textContent = `${weather.location}, ${weather.country}`;
        document.getElementById("date").textContent = `${new Date().toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`
        document.getElementById("day").textContent = `${new Date().toLocaleDateString('en-EN', {
            weekday: 'long',
        })}`;

        let customImg = "";
        
        switch (weather.description) {
            case "clear sky" :
                document.getElementById("weather-icon").src = "img/zon.png";
                break;
            case "few clouds":
                document.getElementById("weather-icon").src = "img/few-clouds.png";
                break;
            case "scattered clouds":
                document.getElementById("weather-icon").src = "img/scatt-clouds.png";
                break;
            case "overcast clouds":
            case "broken clouds":
                document.getElementById("weather-icon").src = "img/broken-clouds.png";
                break;
            case "light intensity shower rain":
            case "heavy intensity shower rain":
            case "ragged shower rain":
            case "light intensity drizzle":
            case "drizzle":
            case "heavy intensity drizzle":
            case "light intensity drizzle rain":
            case "drizzle rain":
            case "heavy intensity drizzle rain":
            case "shower drizzle":
            case "light rain and drizzle":
            case "heavy shower rain and drizzle":
            case "shower rain":
                document.getElementById("weather-icon").src = "img/shower-rain.png";
                break;
            case "light rain":
            case "moderate rain":
            case "heavy intensity rain":
            case "very heavy rain":
            case "extreme rain":
            case "rain":
                document.getElementById("weather-icon").src = "img/rain.png";
                break;
            case "thunderstorm with light rain":
            case "thunderstorm with rain":
            case "thunderstorm with heavy rain":
            case "light thunderstorm":
            case "heavy thunderstorm":
            case "ragged thunderstorm":
            case "thunderstorm with light drizzle":
            case "thunderstorm with drizzle":
            case "thunderstorm with heavy drizzle":
            case "thunderstorm":
                document.getElementById("weather-icon").src = "img/thunderstorm.png";
                break;
            case "light snow":
            case "heavy snow":
            case "sleet":
            case "light shower sleet":
            case "shower sleet":
            case "light rain and snow":
            case "rain and snow":
            case "light shower snow":
            case "shower snow":
            case "heavy shower snow":
            case "freezing rain":
            case "snow":
                document.getElementById("weather-icon").src = "img/snow.png";
                break;
            case "smoke":
            case "haze":
            case "sand/dust whirls":
            case "fog":
            case "sand":
            case "dust":
            case "volcanic ash":
            case "squalls":
            case "tornado":
            case "mist":
                document.getElementById("weather-icon").src = "img/mist.png";
                break;
            default:
                document.getElementById("weather-icon").src = "img/few-clouds.png";
                break;
        } 
    })
    .catch(err => {
        document.getElementById("weather-results").innerHTML = `<p>Error: ${err.message}</p>`;
    })
}

// darkmode
function toggleMode(){
    var body = document.body;
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        document.getElementById("light").style.display = "none";
        document.getElementById("dark").style.display = "block";
        document.getElementById("mode").style.backgroundColor = "#FFFF";
    } else {
        document.getElementById("light").style.display = "block";
        document.getElementById("dark").style.display = "none";    
    }
}