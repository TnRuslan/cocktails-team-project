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
    .map(({ strDrink, strDrinkThumb }) => {
      return `<li class="cocktails__card >
                 <div class="cocktails__thumb">
                     <img class="cocktails__image" src="${strDrinkThumb}" alt="${strDrink}">
                 </div>
                 <div class="cocktails__content-wrapper">
                     <h3 class="cocktails__subtitle">${strDrink}</h3>
                     <div class="cocktails__buttons-wrapper">
                         <button class="cocktails__btn" type="button">Learn more</button>
                         <button class="cocktails__btn cocktails__btn--white" type="button">
                             Remove
                             <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http:www.w3.org/2000/svg">
                                 <path
                                     d="M9.5 17L8.1225 15.7771C3.23 11.4507 0 8.59727 0 5.09537C0 2.24196 2.299 0 5.225 0C6.878 0 8.4645 0.750409 9.5 1.93624C10.5355 0.750409 12.122 0 13.775 0C16.701 0 19 2.24196 19 5.09537C19 8.59727 15.77 11.4507 10.8775 15.7864L9.5 17Z"
                                     fill="#FD5103" />
                                 <path
                                     d="M9.50005 15.2106L8.38493 14.2452C4.42433 10.8296 1.80957 8.57687 1.80957 5.81221C1.80957 3.55952 3.67067 1.78955 6.03933 1.78955C7.37748 1.78955 8.66178 2.38198 9.50005 3.31816C10.3383 2.38198 11.6226 1.78955 12.9608 1.78955C15.3294 1.78955 17.1905 3.55952 17.1905 5.81221C17.1905 8.57687 14.5758 10.8296 10.6152 14.2525L9.50005 15.2106Z"
                                     fill="#FCFCFC" />
                             </svg>
                         </button>
                     </div>
                 </div>
             `;
    })
    .join('');
  return (list.innerHTML = markup);
}
