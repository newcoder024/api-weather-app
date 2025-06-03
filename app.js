const apiKey = "85a07391f9cff6eeb48b4398fdb483ca"; // api-sleutel voor OpenWeatherMap

function searchCity(){
    const city = document.getElementById("locationInput").value.trim();
    document.getElementById("result-cont").style.display = "flex"; // maak de section zichtbaar
    document.getElementById("main-results").style.display = "flex"; // maak de main zichtbaar
    document.getElementById("weather-results").style.display = "flex"; // maak de weather-results zichtbaar

    if (city === "") {
        document.getElementById("weather-results").innerHTML = "<p>Put a location.</p>";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=nl`)
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

        // const html = `
        // <h2 id="city">${weather.location}, ${weather.country}</h2>
        // <h3 id="date">${new Date().toLocaleDateString('en-EN', {
        //     weekday: 'long',
        //     year: 'numeric',
        //     month: 'long',
        //     day: ''
        // })}</h3>
        // <p id="temp">Temperature: ${weather.temp} °C</p>
        // <p id="feel">Feels like: ${weather.feels} °C</p>
        // <p id="wind">Wind: ${weather.wind} m/s</p>
        // <p id="humid">Humidity: ${weather.humidity}%</p>
        // <p id="desc">${weather.description}</p>
        // <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}" class="weather-img">
        // `;
        // document.getElementById("weather-results").innerHTML = html;
    })
    .catch(err => {
        document.getElementById("weather-results").innerHTML = `<p>Error: ${err.message}</p>`;
    })
}

