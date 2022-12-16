import { Notify } from 'notiflix/build/notiflix-notify-aio';
const list = document.querySelector('.cocktails__list-js');
const listOfButton = document.querySelector('.hero__list');
const heroBtn = document.querySelector('.hero__btn');
const coctailTitle = document.querySelector('.cocktails__title');
const paginArrow = document.querySelector('.pagination__wrapper');

listOfButton.addEventListener('click', searchCoctail);

async function searchCoctail(e) {
  const img = e.target.name;
  heroBtn.innerHTML = img.toUpperCase();
  paginArrow.classList.add('hidden');

  if (img !== '') {
    const onFetchCoctail = await onFetchCoctails(img);
    pagination.innerHTML = '';
    if (!onFetchCoctail.drinks) {
      Notify.failure('Нажаль, такий коктейль відсутній');
      noRender();
    } else {
      let notesOnPage = 3;
      if (window.matchMedia('(min-width: 1280px)').matches) {
        notesOnPage = 9;
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        notesOnPage = 6;
      }
      let countOfItems = Math.ceil(onFetchCoctail.drinks.length / notesOnPage);

      let showPage = (function () {
        let active;

        return function (item) {
          if (active) {
            active.classList.remove('active');
          }
          active = item;

          item.classList.add('active');

          let pageNum = +item.innerHTML;

          let start = (pageNum - 1) * notesOnPage;
          let end = start + notesOnPage;

          let notes = onFetchCoctail.drinks.slice(start, end);

          list.innerHTML = '';
          renderCardImg(notes);
          paginArrow.classList.remove('hidden');
        };
      })();

      let items = [];
      for (let i = 1; i <= countOfItems; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        li.classList.add('pagination__item');
        pagination.appendChild(li);
        items.push(li);
      }

      showPage(items[0]);

      for (let item of items) {
        item.addEventListener('click', function () {
          showPage(this);
        });
      }
    }
  }
}

export async function onFetchCoctails(img) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${img}`
  );
  const data = await response.json();
  return data;
}

function renderCardImg(onFetchCoctail) {
  const markupCard = onFetchCoctail
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
                      <button class="cocktails__btn" type="button" data-action="more" data-index="${idDrink}">Learn more</button>
                      <button class="cocktails__btn cocktails__btn--white ${classEl}" type="button" data-action="add" data-id="${idDrink}" data-name="${strDrink}">${btnValue}</button>
                    </div>
                </div>
            </li>`;
    })
    .join('');
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
