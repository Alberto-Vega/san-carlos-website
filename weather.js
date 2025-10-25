// Weather fetching for San Carlos, Sonora, Mexico
// Get your free API key from: https://openweathermap.org/api

const WEATHER_CONFIG = {
    // San Carlos, Nuevo Guaymas, Sonora, Mexico coordinates
    lat: 27.9592,
    lng: -111.0481,
    // Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key
    apiKey: 'cdb201ea5a9c0c7e0cc0fe59fac152c1',
    units: 'imperial', // 'imperial' for Fahrenheit, 'metric' for Celsius
    lang: 'en' // Language for weather description
};

function fetchWeather() {
    // Don't fetch if API key is not set
    if (WEATHER_CONFIG.apiKey === 'YOUR_API_KEY_HERE') {
        console.warn('Weather API key not configured. Please add your OpenWeatherMap API key to weather.js');
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_CONFIG.lat}&lon=${WEATHER_CONFIG.lng}&appid=${WEATHER_CONFIG.apiKey}&units=${WEATHER_CONFIG.units}&lang=${WEATHER_CONFIG.lang}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod && data.cod !== 200) {
                // API returned an error
                console.error('Weather API Error:', data.message);
                if (data.cod === 401) {
                    console.warn('API Key issue: Your OpenWeatherMap API key may not be activated yet. This can take a few minutes to 2 hours after signup. Please wait and refresh later.');
                }
                hideWeatherWidget();
                return;
            }
            updateWeatherDisplay(data);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            hideWeatherWidget();
        });
}

function hideWeatherWidget() {
    // Hide all weather widgets on the page
    const weatherWidgets = document.querySelectorAll('.weather-widget');
    weatherWidgets.forEach(widget => {
        widget.style.display = 'none';
    });
}

function updateWeatherDisplay(data) {
    const temperature = Math.round(data.main.temp);
    const units = WEATHER_CONFIG.units === 'imperial' ? '°F' : '°C';
    const tempText = `${temperature}${units}`;

    // Show weather widgets (in case they were hidden)
    const weatherWidgets = document.querySelectorAll('.weather-widget');
    weatherWidgets.forEach(widget => {
        widget.style.display = 'flex';
    });

    // Update all temperature displays on the page
    const tempElements = document.querySelectorAll('#temperature');
    tempElements.forEach(el => {
        el.textContent = tempText;
    });

    // Optional: Update weather icon based on conditions
    const weatherIcon = document.querySelector('.weather-icon');
    if (weatherIcon) {
        const iconMap = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '🌫️',
            'Haze': '🌫️',
            'Dust': '🌫️',
            'Fog': '🌫️',
            'Sand': '🌫️',
            'Ash': '🌫️',
            'Squall': '💨',
            'Tornado': '🌪️'
        };

        const condition = data.weather[0].main;
        const icon = iconMap[condition] || '☀️';
        weatherIcon.textContent = icon;
    }
}

// Fetch weather when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchWeather);
} else {
    fetchWeather();
}

// Optionally, refresh weather every 10 minutes (600000 ms)
setInterval(fetchWeather, 600000);
