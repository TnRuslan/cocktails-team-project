import createCardMarkup from '../../templates/cocktails-card.hbs';
const coctailTitle = document.querySelector('.cocktails__title');

export async function nameFetch(searchName) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`
  );

  const data = await response.json();
  return data;
}

// const input = document.querySelector('[name="searchQuery"]');
const list = document.querySelector('.cocktails__list-js');
[...document.querySelectorAll('.search-form')].forEach(form =>
  form.addEventListener('submit', onRenderImg)
);

async function onRenderImg(e) {
  e.preventDefault();
  const inputVal = e.target.elements.searchQuery.value;

  if (inputVal !== '') {
    const img = await nameFetch(inputVal);
    if (!img.drinks) {
      noRender();
      e.target.reset();
    } else {
      renderCardImg(img);
      e.target.reset();
    }
  }
}

// function addSelectorBySave() {

// }

export function renderCardImg(img) {
  const markupCard = img.drinks
    .map(({ strDrink, strDrinkThumb, idDrink }) => {
      let classEl = 'remove';
      let btnValue = 'Add to';
      if (JSON.parse(localStorage.getItem('names')).includes(strDrink)) {
        classEl = 'added';
        btnValue = 'Remove';
      }
      coctailTitle.classList.remove('hidden');

      return `<li class="cocktails__card">
                <div class="cocktails__thumb">
                    <img class="cocktails__image" src="${strDrinkThumb}" alt="${strDrink}">
                </div>
                <div class="cocktails__content-wrapper">
                    <h3 class="cocktails__subtitle">${strDrink}</h3>
                    <div class="cocktails__buttons-wrapper">
                      <button class="cocktails__btn" type="button" data-action="more">Learn more</button>
                      <button class="cocktails__btn cocktails__btn--white ${classEl}" type="button" data-action="add" data-id="${idDrink}" data-name="${strDrink}">${btnValue}</button>
                    </div>
                </div>
            </li>`;
    })
    .join('');
  //   return cocList.insertAdjacentHTML('beforeend', markupCard);
  return (list.innerHTML = markupCard);
}

function noRender() {
  coctailTitle.classList.add('hidden');
  const noMarkup = `<div class="hero__wrapp--failure">
    <p class="hero__text--failure">
      Sorry, we didn't find any cocktail for you
    </p>
    <div class="hero__fail-icon">

    </div>
  </div>`;

  return (list.innerHTML = noMarkup);
}
