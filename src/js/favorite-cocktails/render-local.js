import axios from 'axios';

const favoriteList = document.querySelector('.cocktails__list');
const favTitle = document.querySelector('.favourites__title');
const favouritesSubtitle = document.querySelector('.favourites__subtitle');

let names = JSON.parse(localStorage.getItem('names'));

allPromises();

async function fetchLocal(name) {
  return await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
}

function mapLocal() {
  const arrPromises = [];
  names.map(cocktail => {
    arrPromises.push(fetchLocal(cocktail));
  });
  return arrPromises;
}

async function allPromises() {
  if (names.length !== 0) {
    favouritesSubtitle.classList.add('hidden');
    const cocktail = await Promise.all([...mapLocal()]);
    favoriteList.innerHTML = renderByLocal(cocktail);
    return;
  }
  favouritesSubtitle.classList.remove('hidden');
}

function renderByLocal(datas) {
  const markupCard = datas
    .map(data => {
      let classEl = 'remove';
      let btnValue = 'Add to';
      if (
        JSON.parse(localStorage.getItem('names')).includes(
          data.data.drinks[0].strDrink
        )
      ) {
        classEl = 'added';
        btnValue = 'Remove';
      }
      favTitle.classList.remove('hidden');

      return `<li class="cocktails__card">
                <div class="cocktails__thumb">
                    <img class="cocktails__image" src="${data.data.drinks[0].strDrinkThumb}" alt="${data.data.drinks[0].strDrink}">
                </div>
                <div class="cocktails__content-wrapper">
                    <h3 class="cocktails__subtitle">${data.data.drinks[0].strDrink}</h3>
                    <div class="cocktails__buttons-wrapper">
                      <button class="cocktails__btn" type="button" data-action="more">Learn more</button>
                      <button class="cocktails__btn cocktails__btn--white ${classEl}" type="button" data-action="add" data-id="${data.data.drinks[0].idDrink}" data-name="${data.data.drinks[0].strDrink}">${btnValue}</button>
                    </div>
                </div>
            </li>`;
    })
    .join('');
  return markupCard;
}
