import createCardMarkup from '../../templates/cocktails-card.hbs';

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

function renderCardImg(img) {
  const markupCard = img.drinks
    .map(({ strDrink, strDrinkThumb, strImageSource, idDrink }) => {
      return `<li class="cocktails__card">
                <div class="cocktails__thumb">
                    <img class="cocktails__image" src="${strDrinkThumb}" alt="${strDrink}">
                </div>
                <div class="cocktails__content-wrapper">
                    <h3 class="cocktails__subtitle">${strDrink}</h3>
                    <div class="cocktails__buttons-wrapper">
                      <button class="cocktails__btn" type="button" data-action="more">Learn more</button>
                      <button class="cocktails__btn cocktails__btn--white remove" type="button" data-action="add" data-id="${idDrink}" data-name="${strDrink}">Add to</button>
                    </div>
                </div>
            </li>`;
    })
    .join('');
  //   return cocList.insertAdjacentHTML('beforeend', markupCard);
  return (list.innerHTML = markupCard);
}

export function noRender() {
  const noMarkup = `<div class="hero__wrapp--failure">
    <p class="hero__text--failure">
      Sorry, we didn't find any cocktail for you
    </p>
      <svg width="20px" height="20px">
        <use href="./images/symbol-defs.svg#icon-people"></use>
      </svg>
  </div>`;

  return (list.innerHTML = noMarkup);
}
