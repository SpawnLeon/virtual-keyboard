import 'modern-normalize/modern-normalize.css';
import './assets/scss/main.scss';
import keyLines from './assets/js/keys';
import renderKeyboard from './assets/js/keyboard';

const FLAT_KEY_LINES = keyLines.flat();
const ENTRY_FIELD = document.querySelector('.entry-field');

const printChar = (char) => {
  ENTRY_FIELD.value += char;
};

const pressKeyHandler = (keyData) => {
  const { key: char, code: keyCode } = keyData;
  switch (keyCode) {
    case 'Enter':
      ENTRY_FIELD.value += '\n';
      break;
    case 'Tab':
      ENTRY_FIELD.value += '\t';
      break;
    case 'Delete':
      ENTRY_FIELD.value = ENTRY_FIELD.value.slice(0, ENTRY_FIELD.selectionStart)
        + ENTRY_FIELD.value.slice(ENTRY_FIELD.selectionStart + 1);
      break;
    case 'Backspace':
      ENTRY_FIELD.value = ENTRY_FIELD.value.slice(0, ENTRY_FIELD.selectionStart - 1)
        + ENTRY_FIELD.value.slice(ENTRY_FIELD.selectionStart);
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      console.log('shift');
      break;
    default:
      printChar(char);
  }

  const pressedKey = document.querySelector(`[data-key-code="${keyCode}"]`);
  pressedKey.classList.add('key--active');
};

const releaseHandler = (keyData) => {
  const { key: char, code: keyCode } = keyData;
  const pressedKey = document.querySelector(`[data-key-code="${keyCode}"]`);
  pressedKey.classList.remove('key--active');
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.keyboard').append(...renderKeyboard(keyLines));
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();

  const { code } = evt;
  const keyData = FLAT_KEY_LINES.find((k) => k.code === code);

  pressKeyHandler(keyData);
});

document.addEventListener('keyup', (evt) => {
  evt.preventDefault();
  const { code } = evt;
  const keyData = FLAT_KEY_LINES.find((k) => k.code === code);
  releaseHandler(keyData);
});

document.addEventListener('mouseKeyDown', (evt) => {
  evt.preventDefault();
  const { detail } = evt;
  const { code } = detail;
  const keyData = FLAT_KEY_LINES.find((k) => k.code === code);
  pressKeyHandler(keyData);
});

document.addEventListener('mouseKeyUp', (evt) => {
  evt.preventDefault();
  const { detail } = evt;
  const { code } = detail;
  const keyData = FLAT_KEY_LINES.find((k) => k.code === code);
  releaseHandler(keyData);
});

// setInterval(() => {
//   console.log(ENTRY_FIELD.selectionStart);
// }, 500);
