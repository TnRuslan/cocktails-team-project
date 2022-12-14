import axios from 'axios';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

const favoriteList = document.querySelector('.cocktails__list');
const favTitle = document.querySelector('.favourites__title');

favoriteList.addEventListener('click', throttle(onClickRemove, 1000));

function resetLocalStorage() {
  let local = JSON.parse(localStorage.getItem('names'));
  return local;
}
// let local = JSON.parse(localStorage.getItem('names'));

allPromises();

async function fetchLocal(resetLocalStorage) {
  let local = resetLocalStorage;
  return await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${local}`
  );
}

function mapLocal() {
  const arrPromises = [];
  let local = resetLocalStorage();
  local.map(cocktail => {
    arrPromises.push(fetchLocal(cocktail));
  });
  return arrPromises;
}

async function allPromises() {
  const cocktail = await Promise.all([...mapLocal()]);
  favoriteList.innerHTML = renderByLocal(cocktail);
}

function renderByLocal(datas) {
  //   datas.map(data => console.log(data.data.drinks[0].strDrink));
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
async function onClickRemove(e) {
  if (e.target.textContent === 'Remove') {
    resetLocalStorage();
    const cocktail = await Promise.all([...mapLocal()]);
    favoriteList.innerHTML = renderByLocal(cocktail);
  }
}

// fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007')
//   .then(data => data.json())
//   .then(data => console.log(data));
