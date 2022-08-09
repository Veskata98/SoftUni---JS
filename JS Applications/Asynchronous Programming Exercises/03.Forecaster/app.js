function attachEvents() {
    const inputElement = document.getElementById('location');
    const submitBtn = document.getElementById('submit');
    const forecastElement = document.getElementById('forecast');
    const currentWeatherDiv = document.getElementById('current');
    const upcomingWeatherDiv = document.getElementById('upcoming');

    const weatherIcons = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°',
    };

    submitBtn.addEventListener('click', getWeater);

    async function getWeater() {
        let res = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
        let data = await res.json();

        const currentCity = data.filter((x) => x.name === inputElement.value)[0];
        forecastElement.style.display = 'block';

        if (currentCity) {
            currentWeatherDiv.textContent = '';
            upcomingWeatherDiv.textContent = '';
            getTodayWeather(currentCity);
            getUpcomingWeather(currentCity);
            console.log(1);
        } else {
            currentWeatherDiv.textContent = '';
            upcomingWeatherDiv.textContent = '';
            forecastElement.children[0].textContent = 'Error';
        }
    }

    async function getTodayWeather(currentCity) {
        let today = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${currentCity.code}`);
        let todayData = await today.json();
        renderTodayData(todayData);
    }

    async function getUpcomingWeather(currentCity) {
        let upcoming = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${currentCity.code}`);
        let upcomingData = await upcoming.json();
        renderUpcomingData(upcomingData);
    }

    function renderTodayData(data) {
        const forecasts = document.createElement('div');
        forecasts.classList.add('forecasts');

        const spanSymbol = document.createElement('span');
        spanSymbol.classList.add('condition', 'symbol');
        spanSymbol.textContent = weatherIcons[data.forecast.condition];

        const conditionSpan = document.createElement('span');
        conditionSpan.classList.add('condition');

        const cityNameSpan = document.createElement('span');
        cityNameSpan.classList.add('forecast-data');
        cityNameSpan.textContent = data.name;
        conditionSpan.appendChild(cityNameSpan);

        const temperatureSpan = document.createElement('span');
        temperatureSpan.classList.add('forecast-data');
        temperatureSpan.textContent = `${data.forecast.low}${weatherIcons['Degrees']}/${data.forecast.high}${weatherIcons['Degrees']}`;
        conditionSpan.appendChild(temperatureSpan);

        const weatherConditionSpan = document.createElement('span');
        weatherConditionSpan.classList.add('forecast-data');
        weatherConditionSpan.textContent = data.forecast.condition;
        conditionSpan.appendChild(weatherConditionSpan);

        forecasts.appendChild(spanSymbol);
        forecasts.appendChild(conditionSpan);

        currentWeatherDiv.appendChild(forecasts);
    }

    function renderUpcomingData(data) {
        const forecastInfo = document.createElement('div');
        forecastInfo.classList.add('forecast-info');

        data.forecast.forEach((x) => {
            const upcomingEl = document.createElement('span');
            upcomingEl.classList.add('upcoming');

            const spanSymbol = document.createElement('span');
            spanSymbol.classList.add('symbol');
            spanSymbol.textContent = weatherIcons[x.condition];

            const temperatureSpan = document.createElement('span');
            temperatureSpan.classList.add('forecast-data');
            temperatureSpan.textContent = `${x.low}${weatherIcons['Degrees']}/${x.high}${weatherIcons['Degrees']}`;

            const weatherConditionSpan = document.createElement('span');
            weatherConditionSpan.classList.add('forecast-data');
            weatherConditionSpan.textContent = x.condition;

            upcomingEl.appendChild(spanSymbol);
            upcomingEl.appendChild(temperatureSpan);
            upcomingEl.appendChild(weatherConditionSpan);

            upcomingWeatherDiv.appendChild(upcomingEl);
        });
    }
}

attachEvents();
