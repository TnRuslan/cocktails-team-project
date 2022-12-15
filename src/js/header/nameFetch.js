import createCardMarkup from '../../templates/cocktails-card.hbs';
const coctailTitle = document.querySelector('.cocktails__title');
const mobMenu = document.querySelector('#mob-menu');

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
  mobMenu.classList.remove('is-open');
  const inputVal = e.target.elements.searchQuery.value;

  if (inputVal !== '') {
    const img = await nameFetch(inputVal);
    pagination.innerHTML = '';
    if (!img.drinks) {
      noRender();
      e.target.reset();
    } else {
      let notesOnPage = 3;
      if (window.matchMedia('(min-width: 1280px)').matches) {
        notesOnPage = 9;
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        notesOnPage = 6;
      }
      let countOfItems = Math.ceil(img.drinks.length / notesOnPage);
      console.log(countOfItems);

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

          let notes = img.drinks.slice(start, end);

          list.innerHTML = '';
          renderCardImg(notes);
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
      e.target.reset();
    }
  }
}

export function renderCardImg(img) {
  const markupCard = img
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
