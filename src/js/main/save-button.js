const cocktailsList = document.querySelector('.cocktails__list-js');

cocktailsList.addEventListener('click', onButtonClick);

function onButtonClick(e) {
  if (e.target.dataset.action === 'more') {
  } else if (e.target.dataset.action === 'add') {
    if (e.target.textContent === 'Remove') {
      e.target.classList.add('remove');
      e.target.classList.remove('added');

      e.target.textContent = 'Add to';
      localStorage.removeItem('cocktails-id');
      return;
    } else if (e.target.textContent === 'Add to') {
      e.target.classList.add('added');
      e.target.classList.remove('remove');
      e.target.textContent = 'Remove';
      localStorage.setItem('cocktails-id', '1');
    }
  }
  return;
}
