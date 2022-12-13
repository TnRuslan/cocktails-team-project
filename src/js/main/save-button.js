const cocktailsList = document.querySelector('.cocktails__list-js');

cocktailsList.addEventListener('click', onButtonClick);

let names = [];

function onButtonClick(e) {
  if (e.target.dataset.action === 'more') {
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
  console.log(saveName);
}

// localStorage.clear();
