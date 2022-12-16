document.body.addEventListener('click', onFavList);

const options = {
  1280: '',
  320: '-mob',
  // ? 768: '-tablet', //?
};

const getElements = (options, selector) => {
  const key = Object.keys(options)
    .reverse()
    .find(key => window.matchMedia(`(min-width: ${key}px)`).matches);
  return document.querySelector(`.${selector}${options[key]}`);
};

const favList = getElements(options, 'favorite');

function onFavList(e) {
  if (e.target.classList.contains('fav-list-js')) {
    if (favList.classList.contains('is-visible')) {
      favList.classList.remove('is-visible');
      return;
    }
    favList.classList.add('is-visible');
    return;
  }

  if (!e.target.classList.contains('favorite__item')) {
    favList.classList.remove('is-visible');
  }
}
