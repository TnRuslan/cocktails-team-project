const refs = {
  mobMenu: document.querySelector('#mob-menu'),
  openBtn: document.querySelector('#btn-open'),
  closeBtn: document.querySelector('#btn-close'),
};

refs.openBtn.addEventListener('click', () => {
  refs.mobMenu.classList.add('is-open');
});

refs.closeBtn.addEventListener('click', () => {
  refs.mobMenu.classList.remove('is-open');
});
