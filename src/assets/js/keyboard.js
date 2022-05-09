export default class Keyboard {
  constructor(lines, lang) {
    this.state = {
      isShiftPressed: false,
      isCapsLock: false,
      lang,
    };
    this.entryField = null;
    this.allKeys = lines.flat();
    this.allKeyElements = [];
    this.lines = lines;

    this.elements = {
      keyboardWrapper: null,
    };
  }

  init() {
    this.render();
    this.renderKeyboard();

    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      const { code } = evt;
      const keyData = this.allKeys.find((k) => k.code === code);

      this.pressKeyHandler(keyData, evt);
    });

    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      const { code } = evt;
      const keyData = this.allKeys.find((k) => k.code === code);
      this.releaseHandler(keyData, evt);
    });

    document.addEventListener('mouseKeyDown', (evt) => {
      evt.preventDefault();
      const { detail } = evt;
      const { code } = detail;
      const keyData = this.allKeys.find((k) => k.code === code);
      this.pressKeyHandler(keyData, evt);
    });

    document.addEventListener('mouseKeyUp', (evt) => {
      evt.preventDefault();
      const { detail } = evt;
      const { code } = detail;
      const keyData = this.allKeys.find((k) => k.code === code);
      this.releaseHandler(keyData, evt);
    });
  }

  toggleLanguage() {
    const lang = this.state.lang === 'eng' ? 'rus' : 'eng';
    this.state.lang = lang;
    window.localStorage.setItem('lang', lang);
  }

  renderKeyboard() {
    this.allKeyElements = [];

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

    if (keyData.code === 'CapsLock') {
      if (this.state.isCapsLock) {
        btn.classList.add('key--active');
      } else {
        btn.classList.remove('key--active');
      }
    }

    btn.type = 'button';
    btn.dataset.keyCode = keyData.code;

    btn.textContent = this.getChar(keyData);

    btn.addEventListener('mousedown', (evt) => {
      const mouseKeyDown = new CustomEvent('mouseKeyDown', {
        detail: {
          code: keyData.code,
          ctrlKey: evt.ctrlKey,
          shiftKey: evt.shiftKey,
        },
      });
      document.dispatchEvent(mouseKeyDown);
    });

    btn.addEventListener('mouseup', (evt) => {
      const mouseKeyUp = new CustomEvent('mouseKeyUp', {
        detail: {
          code: keyData.code,
          ctrlKey: evt.ctrlKey,
          shiftKey: evt.shiftKey,
        },
      });
      document.dispatchEvent(mouseKeyUp);
    });

    return btn;
  }

  pressKeyHandler(keyData, evt) {
    if (!keyData) { return; }

    const start = this.entryField.selectionStart;

    const { code: keyCode } = keyData;

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
        if (evt.ctrlKey && evt.shiftKey) {
          this.toggleLanguage(evt);
          this.renderKeyboard();
        } else {
          this.state.isShiftPressed = true;
          this.renderKeyboard();
        }

        break;

      case 'ControlLeft':
      case 'ControlRight':
        if (evt.ctrlKey && evt.shiftKey) {
          this.toggleLanguage(evt);
          this.renderKeyboard();
        }
        break;

      case 'AltLeft':
      case 'AltRight':
        break;

      case 'MetaLeft':
      case 'MetaRight':
        break;

      case 'CapsLock':
        this.state.isCapsLock = !this.state.isCapsLock;
        this.renderKeyboard();
        break;

      default:
        this.printChar(this.getChar(keyData));
    }

    const currentKey = this.allKeyElements.find((key) => key.dataset.keyCode === keyData.code);

    if (currentKey.customData.code !== 'CapsLock') {
      currentKey.classList.add('key--active');
    }
  }

  releaseHandler(keyData) {
    if (!keyData) { return; }

    const currentKey = this.allKeyElements.find((key) => key.dataset.keyCode === keyData.code);
    const { code: keyCode } = keyData;

    switch (keyCode) {
      case 'ShiftLeft':
      case 'ShiftRight':

        this.state.isShiftPressed = false;
        this.renderKeyboard();

        break;
      default:
    }

    if (currentKey.customData.code !== 'CapsLock') {
      currentKey.classList.remove('key--active');
    }
  }

  getChar(keyData) {
    const charData = keyData[this.state.lang];
    let char = charData.lower;
    if (this.state.isShiftPressed) {
      char = charData.upper;
    }
    if (this.state.isCapsLock) {
      char = charData.upper;
    }

    return char;
  }
}
