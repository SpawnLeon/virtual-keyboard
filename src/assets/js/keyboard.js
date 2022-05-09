export default class Keyboard {
  constructor(lines) {
    this.state = {
      isShiftPressed: false,
      isCapsLock: false,
      isEnLang: true,
    };
    this.entryField = null;
    this.allKeys = lines.flat();
    this.allKeyElements = [];
    this.lines = lines;

    // setInterval(() => {
    //   console.log(this.state);
    // }, 1000);
  }

  init() {
    this.render();

    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      const { code } = evt;
      const keyData = this.allKeys.find((k) => k.code === code);

      this.pressKeyHandler(keyData);
    });

    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      const { code } = evt;
      const keyData = this.allKeys.find((k) => k.code === code);
      this.releaseHandler(keyData);
    });

    document.addEventListener('mouseKeyDown', (evt) => {
      evt.preventDefault();
      const { detail } = evt;
      const { code } = detail;
      const keyData = this.allKeys.find((k) => k.code === code);
      this.pressKeyHandler(keyData);
    });

    document.addEventListener('mouseKeyUp', (evt) => {
      evt.preventDefault();
      const { detail } = evt;
      const { code } = detail;
      const keyData = this.allKeys.find((k) => k.code === code);
      this.releaseHandler(keyData);
    });
  }

  printChar(char) {
    this.entryField.value += char;
  }

  render() {
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

    this.entryField = entryField;

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    keyboard.append(...this.renderKeyLines(this.keyLines));

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

    return entryField;
  }

  renderKeyLines() {
    return this.lines.map((l) => this.renderKeyLine(l));
  }

  renderKeyLine(line) {
    const keysLine = document.createElement('div');
    keysLine.classList.add('keyboard__line');
    const keys = line.map((key) => this.renderKey(key));
    this.allKeyElements = [...this.allKeyElements, ...keys];
    keysLine.append(...keys);
    return keysLine;
  }

  renderKey(keyData) {
    const btn = document.createElement('button');
    btn.classList.add('keyboard__key', 'key');
    if (keyData.className) {
      btn.classList.add(keyData.className);
    }

    if (this.state.currentKeyCode === keyData.key) {
      btn.classList.remove('key--active');
    }

    if (this.state.isCapsLock) {
      btn.classList.remove('key--active');
    }

    btn.type = 'button';
    btn.dataset.keyCode = keyData.code;
    btn.textContent = keyData.key;

    btn.addEventListener('mousedown', () => {
      const mouseKeyDown = new CustomEvent('mouseKeyDown', {
        detail: {
          code: keyData.code,
        },
      });
      document.dispatchEvent(mouseKeyDown);
    });

    btn.addEventListener('mouseup', () => {
      const mouseKeyUp = new CustomEvent('mouseKeyUp', {
        detail: {
          code: keyData.code,
        },
      });
      document.dispatchEvent(mouseKeyUp);
    });

    return btn;
  }

  pressKeyHandler(keyData) {
    if (!keyData) { return; }

    const currentKey = this.allKeyElements.find((key) => key.dataset.keyCode === keyData.code);
    currentKey.classList.add('key--active');

    const start = this.entryField.selectionStart;
    const { key: char, code: keyCode } = keyData;

    let newChar = char;
    if (this.state.isShiftPressed) {
      newChar = char.toUpperCase();
    }
    if (this.state.isCapsLock) {
      newChar = char.toUpperCase();
    }

    switch (keyCode) {
      case 'Enter':
        this.entryField.value += '\n';
        break;
      case 'Tab':
        this.entryField.value += '\t';
        break;
      case 'Delete':
        this.entryField.focus();
        if (start >= 0 && start <= this.entryField.value.length - 1) {
          this.entryField.value = this.entryField.value.slice(0, start)
            + this.entryField.value.slice(start + 1);
          this.entryField.selectionStart = start;
          this.entryField.selectionEnd = start;
        }

        break;
      case 'Backspace':
        this.entryField.focus();
        if (start >= 0 && start <= this.entryField.value.length) {
          this.entryField.value = this.entryField.value.slice(0, start - 1)
            + this.entryField.value.slice(start);
          this.entryField.selectionStart = start - 1;
          this.entryField.selectionEnd = start - 1;
        }
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.state.isShiftPressed = true;

        break;

      case 'AltLeft':
      case 'AltRight':
        console.log('alt');
        break;

      case 'CapsLock':
        this.state.isCapsLock = !this.state.isCapsLock;
        break;
      case 'ControlLeft':
      case 'ControlRight':
        console.log('Control');
        break;
      default:
        this.printChar(newChar);
    }
  }

  releaseHandler(keyData) {
    if (!keyData) { return; }
    const { code: keyCode } = keyData;

    const pressedKey = document.querySelector(`[data-key-code="${keyCode}"]`);
    pressedKey.classList.remove('key--active');
  }
}
