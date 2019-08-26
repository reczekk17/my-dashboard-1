const prelaoder = document.querySelector('.preloader');
const newsSection = document.querySelector('.news-section');
const placeholder = 'images/placeholder.png';

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
