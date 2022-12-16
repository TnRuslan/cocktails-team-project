import axios from 'axios';

const favoriteList = document.querySelector('.favourites__ing-list-js');
const favTitle = document.querySelector('.favourites__title');
const favouritesSubtitle = document.querySelector('.favourites__subtitle');

let ingredients = JSON.parse(localStorage.getItem('ings'));

allPromises();

async function fetchLocal(name) {
  return await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
  );
}

function mapLocal() {
  const arrPromises = [];
  ingredients.map(ing => {
    arrPromises.push(fetchLocal(ing));
  });
  return arrPromises;
}

async function allPromises() {
  if (ingredients.length !== 0) {
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
        JSON.parse(localStorage.getItem('ings')).includes(
          data.data.ingredients[0].strIngredient
        )
      ) {
        classEl = 'added';
        btnValue = 'Remove';
      }
      favTitle.classList.remove('hidden');

      return `<li class="cocktails__card">
                <div class="cocktails__content-wrapper">
                    <h3 class="favourite__name">${data.data.ingredients[0].strIngredient}</h3>
                    <p class="favourites__type">${data.data.ingredients[0].strType}</p>
                    <div class="cocktails__buttons-wrapper">
                      <button class="cocktails__btn" type="button" data-action="more">Learn more</button>
                      <button class="cocktails__btn cocktails__btn--white ${classEl}" type="button" data-action="add-ing" data-id="${data.data.ingredients[0].idIngredient}" data-name="${data.data.ingredients[0].strIngredient}">${btnValue}</button>
                    </div>
                </div>
            </li>`;
    })
    .join('');
  return markupCard;
}
