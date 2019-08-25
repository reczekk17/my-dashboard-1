const prelaoder = document.querySelector('.preloader');
const newsSection = document.querySelector('.news-section');
const placeholder = 'images/placeholder.png';
let timezone = 'Krakow';

fetch('https://it-academy-api.000webhostapp.com/?rest_route=/myplugin/v1/news/')
  .then(res => {
    return res.json();
  })
  .then(res => {
    prelaoder.style.display = 'none';
    createNewsElements(res);
  })
  .catch(err => {
    console.log('Error: ', err);
  });

const createNewsElements = newsData => {
  newsData.forEach(element => {
    const newsElement = document.createElement('div');
    newsElement.classList.add('news-element');

    const newsElementImage = document.createElement('img');
    newsElementImage.classList.add('news-element__image');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper');

    const newsElementTitle = document.createElement('a');
    newsElementTitle.classList.add('news-element-title');

    const newsElementDescription = document.createElement('p');
    newsElementDescription.classList.add('news-element__description');

    const author = document.createElement('div');
    author.classList.add('author');

    const name = document.createElement('span');
    name.classList.add('name');

    const date = document.createElement('span');
    date.classList.add('date');

    newsElementImage.src = element.image ? element.image : placeholder;
    newsElementTitle.textContent = element.title;
    newsElementTitle.href = element.url;
    newsElementDescription.textContent = element.details;
    name.textContent = element.author;
    date.textContent = element.date;

    newsElement.appendChild(newsElementImage);

    contentWrapper.appendChild(newsElementTitle);
    contentWrapper.appendChild(newsElementDescription);

    author.appendChild(name);
    author.appendChild(date);

    contentWrapper.appendChild(author);

    newsElement.appendChild(contentWrapper);

    newsSection.appendChild(newsElement);
  });
};

const setTimeZone = zone => {
  timezone = zone;
};

const timezoneOffset = (time, timezone) => {
  switch (timezone) {
    case 'Krakow':
      return time + 0;
    case 'London':
      return time - 1 * 60 * 60 * 1000;
    case 'New York':
      return time - 6 * 60 * 60 * 1000;
    default:
      return time;
  }
};

const startTime = () => {
  const today = new Date();
  today.setTime(timezoneOffset(today.getTime(), timezone));

  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();

  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);

  document.querySelector('.current-time').innerHTML = h + ':' + m + ':' + s;
  document.querySelector('.city').textContent = timezone;

  setTimeout(startTime, 500);
};

function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

startTime();

const news = document.querySelectorAll('.live__video');

const switchNews = id => {
  news.forEach(newsBlock => {
    newsBlock.style.display = 'none';

    if (newsBlock.id === id) {
      newsBlock.style.display = 'block';
    }
  });
};

switchNews('sky-news');

/// Light / Dark

const setTheme = theme => {
  const app = document.querySelector('.app');

  if (theme === 'dark' && !app.classList.contains('dark')) {
    app.classList.add('dark');
  } else {
    app.classList.remove('dark');
  }
};
