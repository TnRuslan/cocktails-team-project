import { openModal } from '../modal/modal-coct';

const cocktailsList = document.querySelector('.cocktails__list-js');
// const cocktailsModal = document.querySelector('.backdrop');
// const closeCocktailModalBtn = document.querySelector('.modal__close');

cocktailsList.addEventListener('click', onButtonClick);


let names = [];
addStartNames();
localStorage.setItem('names', JSON.stringify(names));

async function onButtonClick(e) {
  if (e.target.dataset.action === 'more') {
    await openModal(e.target.dataset.index);
  } else if (e.target.dataset.action === 'add') {
    if (e.target.textContent === 'Remove') {
      e.target.classList.add('remove');
      e.target.classList.remove('added');

      e.target.textContent = 'Add to';

      addStartNames();
      deletName(e.target.dataset.name);
      localStorage.setItem('names', JSON.stringify(names));
    } else if (e.target.textContent === 'Add to') {
      e.target.classList.add('added');
      e.target.classList.remove('remove');
      e.target.textContent = 'Remove';

      addStartNames();
      names.push(e.target.dataset.name);
      localStorage.setItem('names', JSON.stringify(names));
    }
  }
}

function deletName(name) {
  let nameIndex = names.indexOf(name);

  if (nameIndex !== -1) {
    names.splice(nameIndex, 1);
  }
}

function addStartNames() {
  const saveName = JSON.parse(localStorage.getItem('names'));

  if (saveName) {
    names = [...saveName];
  }
}



// localStorage.clear();
