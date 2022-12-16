import { openModal } from '../modal/modal-coct';

const cocktailsList = document.querySelector('.cocktails__list-js');
// const cocktailsModal = document.querySelector('.backdrop');
// const closeCocktailModalBtn = document.querySelector('.modal__close');

cocktailsList.addEventListener('click', onButtonClick);

let ings = [];
let names = [];

addStartNames();
addStartIng();

localStorage.setItem('names', JSON.stringify(names));
localStorage.setItem('ings', JSON.stringify(ings));

export async function onButtonClick(e) {
  if (e.target.dataset.action === 'more') {
    await openModal(e.target.dataset.index);
  } else if (e.target.dataset.action === 'add') {
    if (e.target.textContent === 'Remove') {
      removeFromLocal(e);
    } else if (e.target.textContent === 'Add to') {
      addToLocal(e);
    }
  }
  if (e.target.dataset.action === 'add-ing') {
    if (e.target.textContent === 'Remove') {
      removeIngFromLocal(e);
    } else if (e.target.textContent === 'Add to') {
      addIng(e);
    } else if (e.target.classList.contains('added')) {
      removeIngInModal(e);
    } else if (e.target.classList.contains('remove')) {
      addIngInModal(e);
    }
  }
}

function addIng(e) {
  e.target.classList.add('added');
  e.target.classList.remove('remove');

  e.target.textContent = 'Remove';

  addStartIng();
  ings.push(e.target.dataset.name);
  localStorage.setItem('ings', JSON.stringify(ings));
}

function addIngInModal(e) {
  e.target.classList.add('added');
  e.target.classList.remove('remove');

  addStartIng();
  ings.push(e.target.dataset.name);
  localStorage.setItem('ings', JSON.stringify(ings));
}

function addToLocal(e) {
  e.target.classList.add('added');
  e.target.classList.remove('remove');
  e.target.textContent = 'Remove';

  addStartNames();
  names.push(e.target.dataset.name);
  localStorage.setItem('names', JSON.stringify(names));
}

function removeFromLocal(e) {
  e.target.classList.add('remove');
  e.target.classList.remove('added');

  e.target.textContent = 'Add to';

  addStartNames();
  deletName(e.target.dataset.name);
  localStorage.setItem('names', JSON.stringify(names));
}

function removeIngInModal(e) {
  e.target.classList.add('remove');
  e.target.classList.remove('added');

  addStartIng();
  deletIng(e.target.dataset.name);
  localStorage.setItem('ings', JSON.stringify(ings));
}

function removeIngFromLocal(e) {
  e.target.classList.add('remove');
  e.target.classList.remove('added');

  e.target.textContent = 'Add to';

  addStartIng();
  deletIng(e.target.dataset.name);
  localStorage.setItem('ings', JSON.stringify(ings));
}

function deletName(name) {
  let nameIndex = names.indexOf(name);

  if (nameIndex !== -1) {
    names.splice(nameIndex, 1);
  }
}

function deletIng(ing) {
  let nameIndex = ings.indexOf(ing);

  if (nameIndex !== -1) {
    ings.splice(nameIndex, 1);
  }
}

function addStartNames() {
  const saveName = JSON.parse(localStorage.getItem('names'));

  if (saveName) {
    names = [...saveName];
  }
}

function addStartIng() {
  const saveIng = JSON.parse(localStorage.getItem('ings'));

  if (saveIng) {
    ings = [...saveIng];
  }
}

// localStorage.clear();
