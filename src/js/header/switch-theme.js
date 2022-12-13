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

const switchEl = getElements(options, 'switch-field-js');
const light = getElements(options, 'switch-light-js');
const dark = getElements(options, 'switch-dark-js');
const mobMenu = document.querySelector('.backdrop-menu');
// console.log(switchEl);

switchEl.addEventListener('input', onSwitch);

const KEY = 'theme';
const body = document.body;

function onSwitch(e) {
  console.dir(e.target.checked);
  const { checked } = e.target;

  addDarkmode(checked);
}

function addDarkmode(isDark) {
  if (isDark) {
    body.classList.add('dark');
    light.classList.add('dark');
    dark.classList.add('dark');
    mobMenu.classList.add('dark');
    localStorage.setItem(KEY, 'dark');
    return;
  }

  body.classList.remove('dark');
  light.classList.remove('dark');
  dark.classList.remove('dark');
  mobMenu.classList.remove('dark');
  localStorage.removeItem(KEY);
}

addDarkmode(!!localStorage.getItem(KEY));

switchEl.checked = !!localStorage.getItem(KEY);
