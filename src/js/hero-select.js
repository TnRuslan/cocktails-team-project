import { Notify } from 'notiflix/build/notiflix-notify-aio';
const list = document.querySelector('.cocktails__list-js');
const listOfButton = document.querySelector('.hero__list');
const heroBtn = document.querySelector('.hero__btn');
listOfButton.addEventListener('click', searchCoctail);

async function searchCoctail(event) {
  const coctailFirstLetter = event.target.name;
  heroBtn.innerHTML = coctailFirstLetter.toUpperCase();

  const onFetchCoctail = await onFetchCoctails(coctailFirstLetter);
  onRenderCountItem(onFetchCoctail);
}

export async function onFetchCoctails(coctailFirstLetter) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${coctailFirstLetter}`
  );
  const data = await response.json();
  return data;
}

function onRenderCountItem(img) {
  if (!img.drinks) {
    Notify.failure('Нажаль, такий коктейль відсутній');
    noRender();
    return;
  } else {
    const markupCard = img.drinks
      .map(({ strDrink, strDrinkThumb, idDrink }) => {
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
    return (list.innerHTML = markupCard);
  }
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
