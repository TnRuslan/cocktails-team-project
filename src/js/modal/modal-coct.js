const cocktailsModal = document.querySelector('.backdrop');
const closeCocktailModalBtn = document.querySelector('#close__modal-fc');

const coctailsCloseBackdrop = (evt) => {
  if (evt.target === evt.currentTarget) {
    cocktailsModal.classList.add('is__hidden');
    clearEvtListener();
  }
}

const closeModalHandler = (evt) => {
  if (evt.type === 'click' || evt.code === "Escape") {
    cocktailsModal.classList.add('is__hidden');
    clearEvtListener();
  }
}

const clearEvtListener = () => {
  closeCocktailModalBtn.removeEventListener('click', closeModalHandler);
  document.removeEventListener('keyup', closeModalHandler);
  cocktailsModal.removeEventListener('click', coctailsCloseBackdrop);
}

export async function openModal(id) {
  
  const data = await idFetch(id);

  // сюди вставити метод, який потім заповнить модалку(data).
  cocktailsModal.classList.remove('is__hidden');
  closeCocktailModalBtn.addEventListener('click', closeModalHandler);
  document.addEventListener('keyup', closeModalHandler);
  cocktailsModal.addEventListener('click', coctailsCloseBackdrop);
}

// })();

 async function idFetch(id) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
   );

  const data = await response.json();
   return data?.drinks.length ? data.drinks[0] : null
}


// function () {
//     const markup = `
// <div class="modal">
//         <button type="button" aria-label="Close button" class="modal__close">
//             <svg class="modal__icon" width="24" height="24">
//                 <use href="./images/image-modal/sprite.svg#icon-close"></use>
//             </svg>
//         </button>
//         <h2 class="coctail-name">${}</h2>
//         <h3 class="coctail__instruction">INSTRUCTIONS:</h3>
//         <p class="coctail__description">${}
//         </p>
//         <img class="coctail-img" src="${}" alt="${}}" />
//         <h4 class="ingredients">INGREDIENTS</h4>
//         <p class="ingredients__percoctail">Per coctail</p>
//         <ul class="ingredients__list">
//         ${
//          .map(
//         () =>
//             ` <li class="ingridients__item" data-name="${[]}>✶ ${}</li>`
//     )
//             .join('')}
//          </ul>
//          <button type="button" class="button-modal modal__button-favorite" aria-label="${a}">
//             ${}
//         </button>
//         </div>
// </div>`;
//     document.body.insertAdjacentHTML('beforeend', markup);
// }

// document.querySelector('.modal__close').addEventListener('click', closeModal);
//   document.querySelector('.modal').addEventListener('click', modalBtnListener);
//   document
//     .querySelector('.ingredients__list')
//     .addEventListener('click', onClickIngr);
// }

