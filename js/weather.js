const apiKey = 'be45fea377f32d5e3f469489e86cdfc2';
const cityName = 'Krakow';
const countryCode = 'PL';

//DOM
const weatherForecastWrapper = document.querySelector('.weather');
var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

fetch(
  `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName},${countryCode}&cnt=5&units=metric&appid=${apiKey}`
)
  .then(res => res.json())
  .then(res => {
    createWeatherElements(res);
  });

const createWeatherElements = weatherData => {
  weatherData.list.forEach(element => {
    const weatherDay = document.createElement('div');
    weatherDay.classList.add('weather-day');
    weatherDay.classList.add(element.weather[0].main.toLowerCase());

    const dayName = document.createElement('div');
    dayName.classList.add('day-name');

    const weatherDescription = document.createElement('span');
    weatherDescription.classList.add('weather-description');

    const temperature = document.createElement('div');
    temperature.classList.add('temperature');

    const weatherIcon = document.createElement('img');

    const dt = new Date(element.dt * 1000);
    const weekDay = days[dt.getDay()];
    const month = `${dt.getMonth() + 1}`.padStart(2, 0);
    const date = `${dt.getDate()}`.padStart(2, 0);

    dayName.textContent = `${weekDay} ${date}.${month}`;

    weatherDescription.textContent = element.weather.main;

    temperature.textContent = Math.floor(element.temp.day);

    weatherIcon.src = `images/weather-icons/${
      element.weather[0].main ? element.weather[0].main.toLowerCase() : 'na'
    }.png`;

    // append elements

    weatherDay.appendChild(dayName);
    weatherDay.appendChild(weatherDescription);
    weatherDay.appendChild(temperature);
    weatherDay.appendChild(weatherIcon);

    weatherForecastWrapper.appendChild(weatherDay);
  });
};
