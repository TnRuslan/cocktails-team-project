import createCardMarkup from '../../templates/cocktails-card.hbs';

async function fetchPictures(searchName) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`
  );

  const data = await response.json();
  return data;
}

// fetchPictures('margarita').then(data => console.log(data));

const form = document.querySelector('#search-form');
const input = document.querySelector('[name="searchQuery"]');
const list = document.querySelector('.cocktails__list-js');

form.addEventListener('submit', onRenderImg);

async function onRenderImg(e) {
  e.preventDefault();
  const inputVal = input.value;
  console.log(inputVal);
  const img = await fetchPictures(inputVal);
  console.log(img.drinks[0]);
  renderCardImg(img);
}

function renderCardImg(img) {
  const markupCard = img.drinks
    .map(({ strDrink, strDrinkThumb, strImageSource }) => {
      return createCardMarkup(strDrink, strDrinkThumb);
    })
    .join('');
  //   return cocList.insertAdjacentHTML('beforeend', markupCard);
  return (list.innerHTML = markupCard);
}
