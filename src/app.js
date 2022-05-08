import 'modern-normalize/modern-normalize.css';
import './assets/scss/main.scss';
import keyLines from './assets/js/keys';
import renderKeyboard from './assets/js/keyboard';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.keyboard').append(...renderKeyboard(keyLines));
});

document.addEventListener('keypress', (evt) => {
  evt.preventDefault();
  console.log(evt.code);
  console.log(evt);
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  console.log(evt.code);
  console.log(evt);
});
