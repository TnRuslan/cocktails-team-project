const cocktailsList = document.querySelector('.cocktails__list-js');

cocktailsList.addEventListener('click', onButtonClick);

function onButtonClick(e) {
  if (e.target.dataset.action === 'more') {
  } else if (e.target.dataset.action === 'add') {
    if (e.target.textContent === 'Remove') {
      e.target.classList.add('remove');
      e.target.classList.remove('added');

      e.target.textContent = 'Add to';
      localStorage.removeItem(e.target.dataset.name);
      return;
    } else if (e.target.textContent === 'Add to') {
      e.target.classList.add('added');
      e.target.classList.remove('remove');
      e.target.textContent = 'Remove';

      localStorage.setItem(
        e.target.dataset.name,
        JSON.stringify(e.target.dataset.id)
      );
    }
  }
  return;
}

// localStorage.clear();
