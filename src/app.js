import 'modern-normalize/modern-normalize.css';
import './assets/scss/main.scss';
import keyLines from './assets/js/keys';
import renderKeyboard from './assets/js/keyboard';

const FLAT_KEY_LINES = keyLines.flat();
let ENTRY_FIELD = null;

const printChar = (char, start = ENTRY_FIELD.selectionStart) => {
  ENTRY_FIELD.value += char;
};

const pressKeyHandler = (keyData) => {
  if (!keyData) { return; }
  const start = ENTRY_FIELD.selectionStart;
  const { key: char, code: keyCode } = keyData;
  switch (keyCode) {
    case 'Enter':
      ENTRY_FIELD.value += '\n';
      break;
    case 'Tab':
      ENTRY_FIELD.value += '\t';
      break;
    case 'Delete':
      ENTRY_FIELD.value = ENTRY_FIELD.value.slice(0, start)
        + ENTRY_FIELD.value.slice(start + 1);
      ENTRY_FIELD.selectionStart = start;
      ENTRY_FIELD.selectionEnd = start;
      break;
    case 'Backspace':
      ENTRY_FIELD.value = ENTRY_FIELD.value.slice(0, start - 1)
        + ENTRY_FIELD.value.slice(start);
      ENTRY_FIELD.selectionStart = start - 1;
      ENTRY_FIELD.selectionEnd = start - 1;
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      console.log('shift');
      break;
    case 'ControlLeft':
    case 'ControlRight':
      console.log('Control');
      break;
    default:
      printChar(char, start);
  }

  const pressedKey = document.querySelector(`[data-key-code="${keyCode}"]`);
  pressedKey.classList.add('key--active');
};

const releaseHandler = (keyData) => {
  if (!keyData) { return; }
  const { code: keyCode } = keyData;
  const pressedKey = document.querySelector(`[data-key-code="${keyCode}"]`);
  pressedKey.classList.remove('key--active');
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.classList.add('container');

  const app = document.createElement('div');
  app.classList.add('app');

  const entryFieldWrapper = document.createElement('div');
  entryFieldWrapper.classList.add('entry-field-wrapper');

  const entryField = document.createElement('textarea');
  entryField.classList.add('entry-field');
  entryField.cols = 30;
  entryField.rows = 10;
  entryFieldWrapper.append(entryField);
  ENTRY_FIELD = entryField;

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboard.append(...renderKeyboard(keyLines));

  const text = document.createElement('div');
  text.classList.add('text');
  text.innerHTML = `<br>
      Клавиатура создана в операционной системе Windows <br>
      Для переключения языка комбинация: левые shift + ctrl`;

  app.append(entryFieldWrapper);
  app.append(keyboard);
  app.append(text);
  container.append(app);
  document.body.append(container);
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  console.log(evt);
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
