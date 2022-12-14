// const backdrop = document.querySelector('.backdrop');
// const modalCocktail = document.querySelector('.modal');
// // console.log();
// const btnCloseModal = document.querySelector('.modal__close');
// cocktails__btn

// (() => {
//     const modalCocktail = document.querySelector('.backdrop');
//     const openModalBtn = document.querySelector('.cocktails__btn');
//     const closeModalBtn = document.querySelector('.modal__close');

//     const toggleModal = () => {
//         const isMenuOpen =
//             openModalBtn.getAttribute('aria-expanded') === 'true' || false;
//             openModalBtn.setAttribute('aria-expanded', !isMenuOpen);
//             modalCocktail.classList.toggle('is__hidden');
//     };

//     openModalBtn.addEventListener('click', () => {
//         toggleModal();
//         document.body.style.overflow = '';
//     });
//     closeModalBtn.addEventListener('click', () => {
//         toggleModal();
//         document.body.style.overflow = '';
//     });

// })();

// // export function openModalCockt(onClose = () => {}) {
// //   backdrop.classList.remove('is__hidden');
// //   btnCloseModal.addEventListener('click', closeModalCockt);
// //   backdrop.addEventListener('click', onBackdropClick);
// //   window.addEventListener('keydown', onEscClick);
// //   document.body.classList.add('no-scroll');
// //   callbackOnClose = onClose;
// // }

// export function closeModalCocktail() {
//   backdrop.classList.add('is-hidden');
//   btnCloseModal.removeEventListener('click', closeModalCocktail);
//   backdrop.removeEventListener('click', onBackDropClick);
//   window.removeEventListener('keydown', onEscClick);
//   document.body.classList.remove('no-scroll');
//   callbackOnClose();
// }

// function onBackDropClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModalCocktail();
//   }
// }

// function onEscClick(evt) {
//   if (evt.code === 'Escape') {
//     closeModalCocktail();
//   }
// }

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
//         <img class="coctail-img" src="${}" alt="$}" />
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

// export function closeModal() {
//   modalDelay();
//   document
//     .querySelector('.modal__close')
//     .removeEventListener('click', closeModal);
//   document.querySelector('.modal').removeEventListener('click', cardBtnListenr);
//   setTimeout(removeModalMark, 400);
//   ingrList = [];
//   ingrNameList = [];
// }

// function modalDelay() {
//   document.body.classList.toggle('scroll_off');
//   document.querySelector('.backdrop').classList.toggle('is__hidden');
// }

// function removeModalMark() {
//   document.querySelector('.backdrop').remove();
// }

// export async function modalBtnListener(e) {
//   if (e.target.dataset.add)
//     return await btnAddFav(e.target.dataset.favid, 'modal', refFav);
// }
