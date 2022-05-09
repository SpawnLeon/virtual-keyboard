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

    this.elements = {
      keyboardWrapper: null,
    };

    // setInterval(() => {
    //   console.log(this.state);
    // }, 1000);
  }

  init() {
    this.render();
    this.renderKeyboard();

    document.addEventListener('keydown', (evt) => {
      console.log(evt);
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

  rendersCapslockKeys() {
    this.allKeyElements.forEach((element) => {
      const key = element;
      if (!key.customData.isCapsLocking) {
        return;
      }
      if (this.state.isCapsLock) {
        key.textContent = key.textContent.toUpperCase();
      } else {
        key.textContent = key.textContent.toLowerCase();
      }
    });
  }

  renderKeyboard() {
    this.elements.keyboardWrapper.innerHTML = '';
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboard.append(...this.renderKeyLines(this.lines));
    this.elements.keyboardWrapper.append(keyboard);
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

    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add('keyboard-wrapper');
    this.elements.keyboardWrapper = keyboardWrapper;

    const text = document.createElement('div');
    text.classList.add('text');
    text.innerHTML = `
      Клавиатура создана в операционной системе Windows <br>
      Для переключения языка комбинация: левые shift + ctrl`;

    app.append(entryFieldWrapper);

    app.append(text);
    app.append(keyboardWrapper);
    container.append(app);
    document.body.append(container);

    this.elements.keyboardWrapper = keyboardWrapper;

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
    btn.customData = keyData;

    btn.classList.add('keyboard__key', 'key');
    if (keyData.className) {
      btn.classList.add(keyData.className);
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

      case 'MetaLeft':
      case 'MetaRight':
        console.log('win/meta');
        break;

      case 'CapsLock':
        this.state.isCapsLock = !this.state.isCapsLock;
        this.rendersCapslockKeys();
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

    const currentKey = this.allKeyElements.find((key) => key.dataset.keyCode === keyData.code);

    if (currentKey.customData.code === 'CapsLock') {
      if (!this.state.isCapsLock) {
        currentKey.classList.remove('key--active');
      }
    } else {
      currentKey.classList.remove('key--active');
    }
  }
}
