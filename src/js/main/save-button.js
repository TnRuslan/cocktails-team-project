const cocktailsList = document.querySelector('.cocktails__list-js');
const cocktailsCard = document.querySelectorAll('.cocktails__card');

cocktailsList.addEventListener('click', onButtonClick);
// cocktailsCard.addEventListener

function onButtonClick(e) {
  console.log(cocktailsCard);
  //   console.log(e.target.dataset.action);
  if (e.target.dataset.action === 'more') {
    console.log('open modal');
  } else if (e.target.dataset.action === 'add') {
    console.log(e.currentTarget);
    console.log(e.target);
    localStorage.setItem('cocktails-id', '1');
  }
  return;
}
