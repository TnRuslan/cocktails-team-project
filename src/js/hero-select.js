const list = document.querySelector('.cocktails__list-js');
console.log(list);

const listOfButton = document.querySelector('.hero__list');
listOfButton.addEventListener('click', searchCoctail);

async function searchCoctail(event) {
  const coctailFirstLetter = event.target.name;
  console.log(coctailFirstLetter);

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
  console.log(img.drinks);
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
