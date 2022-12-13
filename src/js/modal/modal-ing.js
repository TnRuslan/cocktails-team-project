// const backdrop = document.querySelector('.backdrop__ing');
// const modalCockt = document.querySelector('.modal__ing');
// const btnCloseModal = document.querySelector('.close__modal-ing');


const markup = `
<div class="backdrop__ing is-hidden">
    <div class="modal__ing">
        <button type="button" class="close__modal-ing" aria-label="Close button">
            <svg class="modal-icon-close" width="24" height="24">
                <use href="./images/image-modal/close-modal.svg"></use>
            </svg>
        </button>
        <h2 class="ingridient">${}</h2>
        <h3 class="ingridient__type">${}</h3>
        <p class="ingridient__description">
            ${ }
        </p>
        <ul class="ingredients__list">
            <li class="ingridients__item">✶ Type: ${}</li>
            <li class="ingridients__item">✶ Country of origin: ${}</li>
            <li class="ingridients__item">✶ Alcohol by volume: ${} + '%'</li>
            <li class="ingridients__item">✶ Flavour: ${}</li>
        </ul>
        <button type="button" class="button-modal modal__favorite-ingridients" aria-label="${}">
            ${}
        </button>
          </div>
</div>`;
  document.body.insertAdjacentHTML('beforeend', markup)

