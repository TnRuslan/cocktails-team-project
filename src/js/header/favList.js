[...document.querySelectorAll('.fav-list-js')].forEach(data =>
  data.addEventListener('click', onFavList)
);

const favList = document.querySelector('.favorite');

function onFavList(e) {
  favList.classList.toggle('is-hidden');
}
