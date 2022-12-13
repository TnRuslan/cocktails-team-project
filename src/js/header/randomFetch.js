const list = document.querySelector('.cocktails__list-js');
export async function random() {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  );
  const data = await response.json();

  return data;
}

window.addEventListener('load', renderImg);
let arr = [];
let coc = null;
async function renderImg() {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    for (let i = 0; i < 9; i++) {
      const img = await random();
      arr.push(img.drinks);
      coc = arr.flat();
    }
    console.log(arr);
    console.log(coc);
    render(coc);
    return;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    for (let i = 0; i < 6; i++) {
      const img = await random();
      arr.push(img.drinks);
      coc = arr.flat();
    }
    render(coc);
    return;
  } else if (window.matchMedia('(min-width: 320px)').matches) {
    for (let i = 0; i < 3; i++) {
      const img = await random();
      arr.push(img.drinks);
      coc = arr.flat();
    }
    render(coc);
    return;
  }
}
function render(img) {
  const markup = img
    .map(({ strDrink, strDrinkThumb, idDrink }) => {
      return `<li class="cocktails__card >
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
             `;
    })
    .join('');
  return (list.innerHTML = markup);
}
