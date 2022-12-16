import { onButtonClick } from '../main/save-button';

const cocktailsModal = document.querySelector('.backdrop');
const closeCocktailModalBtn = document.querySelector('#close__modal-fc');
const modalRender = document.querySelector('.modal__wrapper');
const addFavButton = document.querySelector('.cocktails__btn--white');

async function idFetchMod(id) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await response.json();
  return data?.drinks.length ? data.drinks[0] : null;
}

const coctailsCloseBackdrop = evt => {
  if (evt.target === evt.currentTarget) {
    cocktailsModal.classList.add('is__hidden');
    clearEvtListener();
  }
};

const closeModalHandler = evt => {
  if (evt.type === 'click' || evt.code === 'Escape') {
    cocktailsModal.classList.add('is__hidden');
    clearEvtListener();
  }
};

const clearEvtListener = () => {
  closeCocktailModalBtn.removeEventListener('click', closeModalHandler);
  document.removeEventListener('keyup', closeModalHandler);
  cocktailsModal.removeEventListener('click', coctailsCloseBackdrop);
};

export async function openModal(id) {
  const data = await idFetchMod(id);

  cocktailsModal.classList.remove('is__hidden');
  closeCocktailModalBtn.addEventListener('click', closeModalHandler);
  document.addEventListener('keyup', closeModalHandler);
  cocktailsModal.addEventListener('click', coctailsCloseBackdrop);

  addFavButton.setAttribute('data-name', `${data.strDrink}`);
  // console.log(data);
  renderIngList(data);

  const markupModal = `
          <div class="modal__cocktail-wrapper">

            <img class="coctail-img" src="${data.strDrinkThumb}" alt="${
    data.strDrink
  }" />
            <div class="modal__cocktail-info">
              <h2 class="coctail-name">${data.strDrink}</h2>
              <h4 class="ingredients">INGREDIENTS</h4>
              <p class="ingredients__percoctail">Per coctail</p>
              <ul class="ingredients__list">${renderIngList(data)}</ul>
            </div>
         </div>
         <div class="modal__instructions-wrapper">
          <h3 class="coctail__instruction">INSTRUCTIONS:</h3>
          <p class="coctail__description">${data.strInstructions}</p>
         </div>`;

  modalRender.innerHTML = markupModal;
  const ingsList = document.querySelector('.ingredients__list');
  addFavButton.addEventListener('click', onButtonClick);
  ingsList.addEventListener('click', onButtonClick);
}

function renderIngList(data) {
  const arrOfIngs = [];
  Object.keys(data)
    .splice(17, 15)
    .map(key => {
      if (data[key]) {
        arrOfIngs.push(data[key]);
      }
    });

  const markupListIngs = arrOfIngs
    .map(ing => {
      let classEl = 'remove';
      if (JSON.parse(localStorage.getItem('ings')).includes(ing)) {
        classEl = 'added';
      }
      return `<li class="ingredients__item added">
                <a class="${classEl}" data-action="add-ing" data-name="${ing}">✶ ${ing}</a>
              </li>`;
    })
    .join('');

  return markupListIngs;
}
