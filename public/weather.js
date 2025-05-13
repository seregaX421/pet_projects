const search_weather = document.querySelector('.search-weather');
const weather_map = document.querySelector('.weather-map');
const weather_data = document.querySelector('.weather-data');
const search_field = document.querySelector('.search-city');

// Подключение Weather API
const weatherKey = 'c52434a0c19cda8b68e8df5e9f3f7958';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Карта погоды 
const map = L.map('map').setView([55.7558, 37.6176], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${weatherKey}`, {
    attribution: '© OpenWeatherMap',
    opacity: 1
}).addTo(map);

const precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${weatherKey}`, {
    attribution: '© OpenWeatherMap',
    opacity: 1
});

const overlayMaps = {
    "Облачность": weatherLayer,
    "Осадки": precipitationLayer
};

L.control.layers(null, overlayMaps).addTo(map);

// Получение координат пользователя
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getCurrentWeather(latitude, longitude); 
        }, 
        (error) => {
            alert(`Ошибка получения данных о геолокации: ${error.message}`);
        }
    );
} else {
    alert(`Геолокация не поддерживается вашим браузером`);
}


// Получение данных о погоде по координатам
async function getCurrentWeather(latitude, longitude) {
    try {
        const response = await fetch(`${weatherUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric&lang=ru`);
        if (!response.ok) {
            throw new Error('Ошибка получения данных о погоде');
        }
        const data = await response.json();
        if (data && data.main && data.main.temp !== undefined) {
            displayWeather(data);
        } else {
            throw new Error('Данные о погоде не найдены');
        } 
    } catch(error) {
        weather_data.innerHTML = `
        Ошибка: ${error.message}
        `
    }
}

// Плучение данных о погоде по названию города 
async function searchWeather() {
    const cityName = search_field.value;
    cityName.replace(/\s+/g, '');

    if (cityName) {
        try {
            const response = await fetch(`${weatherUrl}?q=${cityName}&appid=${weatherKey}&units=metric&lang=ru`);
    
            if (!response.ok) {
                throw new Error('Ошибка получения данных о погоде')
            }
            const data = await response.json();
            if (data && data.main && data.main.temp !== undefined) {
                displayWeather(data);
            } else {
                throw new Error('Данные о погоде не найдены');
            } 
            if (data.coord) {
                const latitude = data.coord.lat;
                const longitude = data.coord.lon;
                map.setView([latitude, longitude], 13);
            } 
        } catch(error) {
            weather_data.innerHTML = `
            Ошибка: ${error.message}
        `
        }
    } else {
        weather_data.innerHTML = 'Название города введено некорректно'
    }

    search_field.blur();
}

document.querySelector('.search-btn').addEventListener('click', searchWeather);

search_field.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        searchWeather();
    }
})

// Вывод информации о погоде на экран
function displayWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;;
    weather_data.innerHTML = `
    <h2>${data.name} погода</h2>
    <p>
        Температура: ${data.main.temp}°C<br>
        Максимальная температура: ${data.main.temp_max}°C<br>
        Минимальная температура: ${data.main.temp_min}°C<br>
        Описание: ${data.weather[0].description} <img src="${iconUrl}"><br>
        Скорость ветра: ${data.wind.speed}м/c<br>
        Атмосферное давление: ${data.main.pressure}<br>
        Влажность воздуха: ${data.main.humidity}%<br>
    </p>
    `
}

// Анимация поискового блока
function searchAnimation1() {
    search_weather.classList.add('centered');
    weather_map.classList.add('hidden');
}

function searchAnimation2() {
    search_weather.classList.remove('centered');
    weather_map.classList.remove('hidden');
    search_weather.value = "";
}

