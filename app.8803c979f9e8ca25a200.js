/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var modern_normalize_modern_normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! modern-normalize/modern-normalize.css */ "./node_modules/modern-normalize/modern-normalize.css");
/* harmony import */ var _assets_scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/scss/main.scss */ "./src/assets/scss/main.scss");
/* harmony import */ var _assets_js_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/js/keys */ "./src/assets/js/keys.js");
/* harmony import */ var _assets_js_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/js/keyboard */ "./src/assets/js/keyboard.js");




const lang = window.localStorage.getItem('lang') || 'eng';
const keyboardApp = new _assets_js_keyboard__WEBPACK_IMPORTED_MODULE_3__["default"](_assets_js_keys__WEBPACK_IMPORTED_MODULE_2__["default"], lang);
keyboardApp.init();

/***/ }),

/***/ "./src/assets/js/keyboard.js":
/*!***********************************!*\
  !*** ./src/assets/js/keyboard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
class Keyboard {
  constructor(lines, lang) {
    this.state = {
      isShiftPressed: false,
      isCapsLock: false,
      lang
    };
    this.entryField = null;
    this.allKeys = lines.flat();
    this.allKeyElements = [];
    this.lines = lines;
    this.elements = {
      keyboardWrapper: null
    }; // setInterval(() => {
    //   console.log(this.state);
    // }, 1000);
  }

  init() {
    this.render();
    this.renderKeyboard();
    document.addEventListener('keydown', evt => {
      evt.preventDefault();
      const {
        code
      } = evt;
      const keyData = this.allKeys.find(k => k.code === code);
      this.pressKeyHandler(keyData, evt);
    });
    document.addEventListener('keyup', evt => {
      evt.preventDefault();
      const {
        code
      } = evt;
      const keyData = this.allKeys.find(k => k.code === code);
      this.releaseHandler(keyData);
    });
    document.addEventListener('mouseKeyDown', evt => {
      evt.preventDefault();
      const {
        detail
      } = evt;
      const {
        code
      } = detail;
      const keyData = this.allKeys.find(k => k.code === code);
      this.pressKeyHandler(keyData);
    });
    document.addEventListener('mouseKeyUp', evt => {
      evt.preventDefault();
      const {
        detail
      } = evt;
      const {
        code
      } = detail;
      const keyData = this.allKeys.find(k => k.code === code);
      this.releaseHandler(keyData);
    });
  }

  toggleLanguage(evt) {
    const lang = this.state.lang === 'eng' ? 'rus' : 'eng';
    this.state.lang = lang;
    window.localStorage.setItem('lang', lang);
  }

  rendersCapslockKeys() {
    this.allKeyElements.forEach(element => {
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
    return this.lines.map(l => this.renderKeyLine(l));
  }

  renderKeyLine(line) {
    const keysLine = document.createElement('div');
    keysLine.classList.add('keyboard__line');
    const keys = line.map(key => this.renderKey(key));
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
    const langKey = keyData[this.state.lang]?.key || keyData.key;
    btn.textContent = langKey;
    btn.addEventListener('mousedown', () => {
      const mouseKeyDown = new CustomEvent('mouseKeyDown', {
        detail: {
          code: keyData.code
        }
      });
      document.dispatchEvent(mouseKeyDown);
    });
    btn.addEventListener('mouseup', () => {
      const mouseKeyUp = new CustomEvent('mouseKeyUp', {
        detail: {
          code: keyData.code
        }
      });
      document.dispatchEvent(mouseKeyUp);
    });
    return btn;
  }

  pressKeyHandler(keyData, evt) {
    if (!keyData) {
      return;
    }

    const start = this.entryField.selectionStart;
    const currentKey = this.allKeyElements.find(key => key.dataset.keyCode === keyData.code);
    currentKey.classList.add('key--active');
    const {
      code: keyCode
    } = keyData;
    const {
      key: char
    } = keyData[this.state.lang] || keyData;
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
          this.entryField.value = this.entryField.value.slice(0, start) + this.entryField.value.slice(start + 1);
          this.entryField.selectionStart = start;
          this.entryField.selectionEnd = start;
        }

        break;

      case 'Backspace':
        this.entryField.focus();

        if (start >= 0 && start <= this.entryField.value.length) {
          this.entryField.value = this.entryField.value.slice(0, start - 1) + this.entryField.value.slice(start);
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

      default:
        this.printChar(newChar);
    }
  }

  releaseHandler(keyData) {
    if (!keyData) {
      return;
    }

    const currentKey = this.allKeyElements.find(key => key.dataset.keyCode === keyData.code);

    if (currentKey.customData.code === 'CapsLock') {
      if (!this.state.isCapsLock) {
        currentKey.classList.remove('key--active');
      }
    } else {
      currentKey.classList.remove('key--active');
    }
  }

}

/***/ }),

/***/ "./src/assets/js/keys.js":
/*!*******************************!*\
  !*** ./src/assets/js/keys.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([[{
  eng: {
    key: '`'
  },
  rus: {
    key: 'ё'
  },
  code: 'Backquote'
}, {
  key: '1',
  code: 'Digit1',
  key2: '!'
}, {
  key: '2',
  code: 'Digit2',
  key2: '@'
}, {
  key: '3',
  code: 'Digit3',
  key2: '#'
}, {
  key: '4',
  code: 'Digit4',
  key2: '$'
}, {
  key: '5',
  code: 'Digit5',
  key2: '%'
}, {
  key: '6',
  code: 'Digit6',
  key2: '^'
}, {
  key: '7',
  code: 'Digit7',
  key2: '&'
}, {
  key: '8',
  code: 'Digit8',
  key2: '*'
}, {
  key: '9',
  code: 'Digit9',
  key2: '('
}, {
  key: '0',
  code: 'Digit0',
  key2: ')'
}, {
  key: '-',
  code: 'Minus',
  key2: '_'
}, {
  key: '=',
  code: 'Equal',
  key2: '+'
}, {
  key: 'Backspace',
  code: 'Backspace',
  className: 'key--2w'
}], [{
  key: 'Tab',
  code: 'Tab',
  className: 'key--1-5w'
}, {
  eng: {
    key: 'q'
  },
  rus: {
    key: 'й'
  },
  code: 'KeyQ',
  isCapsLocking: true
}, {
  eng: {
    key: 'w'
  },
  rus: {
    key: 'ц'
  },
  code: 'KeyW',
  isCapsLocking: true
}, {
  eng: {
    key: 'e'
  },
  rus: {
    key: 'у'
  },
  code: 'KeyE',
  isCapsLocking: true
}, {
  eng: {
    key: 'r'
  },
  rus: {
    key: 'к'
  },
  code: 'KeyR',
  isCapsLocking: true
}, {
  eng: {
    key: 't'
  },
  rus: {
    key: 'е'
  },
  code: 'KeyT',
  isCapsLocking: true
}, {
  eng: {
    key: 'y'
  },
  rus: {
    key: 'н'
  },
  code: 'KeyY',
  isCapsLocking: true
}, {
  eng: {
    key: 'u'
  },
  rus: {
    key: 'г'
  },
  code: 'KeyU',
  isCapsLocking: true
}, {
  eng: {
    key: 'i'
  },
  rus: {
    key: 'ш'
  },
  code: 'KeyI',
  isCapsLocking: true
}, {
  eng: {
    key: 'o'
  },
  rus: {
    key: 'щ'
  },
  code: 'KeyO',
  isCapsLocking: true
}, {
  eng: {
    key: 'p'
  },
  rus: {
    key: 'з'
  },
  code: 'KeyP',
  isCapsLocking: true
}, {
  eng: {
    key: '['
  },
  rus: {
    key: 'х'
  },
  code: 'BracketLeft'
}, {
  eng: {
    key: ']'
  },
  rus: {
    key: 'ъ'
  },
  code: 'BracketRight'
}, {
  key: 'Delete',
  code: 'Delete',
  className: 'key--1-5w'
}], [{
  key: 'CapsLock',
  code: 'CapsLock',
  className: 'key--1-5w',
  isCapsLock: true
}, {
  eng: {
    key: 'a'
  },
  rus: {
    key: 'ф'
  },
  code: 'KeyA',
  isCapsLocking: true
}, {
  eng: {
    key: 's'
  },
  rus: {
    key: 'ы'
  },
  code: 'KeyS',
  isCapsLocking: true
}, {
  eng: {
    key: 'd'
  },
  rus: {
    key: 'в'
  },
  code: 'KeyD',
  isCapsLocking: true
}, {
  eng: {
    key: 'f'
  },
  rus: {
    key: 'а'
  },
  code: 'KeyF',
  isCapsLocking: true
}, {
  eng: {
    key: 'g'
  },
  rus: {
    key: 'п'
  },
  code: 'KeyG',
  isCapsLocking: true
}, {
  eng: {
    key: 'h'
  },
  rus: {
    key: 'р'
  },
  code: 'KeyH',
  isCapsLocking: true
}, {
  eng: {
    key: 'j'
  },
  rus: {
    key: 'о'
  },
  code: 'KeyJ',
  isCapsLocking: true
}, {
  eng: {
    key: 'k'
  },
  rus: {
    key: 'л'
  },
  code: 'KeyK',
  isCapsLocking: true
}, {
  eng: {
    key: 'l'
  },
  rus: {
    key: 'д'
  },
  code: 'KeyL',
  isCapsLocking: true
}, {
  eng: {
    key: ';'
  },
  rus: {
    key: 'ж'
  },
  code: 'Semicolon'
}, {
  eng: {
    key: '\''
  },
  rus: {
    key: 'э'
  },
  code: 'Quote'
}, {
  eng: {
    key: '\\'
  },
  rus: {
    key: '\\'
  },
  code: 'Backslash'
}, {
  key: 'Enter',
  code: 'Enter',
  className: 'key--1-5w'
}], [{
  key: 'Shift',
  code: 'ShiftLeft',
  className: 'key--2w'
}, {
  eng: {
    key: 'z'
  },
  rus: {
    key: 'я'
  },
  code: 'KeyZ',
  isCapsLocking: true
}, {
  eng: {
    key: 'x'
  },
  rus: {
    key: 'ч'
  },
  code: 'KeyX',
  isCapsLocking: true
}, {
  eng: {
    key: 'c'
  },
  rus: {
    key: 'с'
  },
  code: 'KeyC',
  isCapsLocking: true
}, {
  eng: {
    key: 'v'
  },
  rus: {
    key: 'м'
  },
  code: 'KeyV',
  isCapsLocking: true
}, {
  eng: {
    key: 'b'
  },
  rus: {
    key: 'и'
  },
  code: 'KeyB',
  isCapsLocking: true
}, {
  eng: {
    key: 'n'
  },
  rus: {
    key: 'т'
  },
  code: 'KeyN',
  isCapsLocking: true
}, {
  eng: {
    key: 'm'
  },
  rus: {
    key: 'ь'
  },
  code: 'KeyM',
  isCapsLocking: true
}, {
  eng: {
    key: ','
  },
  rus: {
    key: 'б'
  },
  code: 'Comma'
}, {
  eng: {
    key: '.'
  },
  rus: {
    key: 'ю'
  },
  code: 'Period'
}, {
  eng: {
    key: '/'
  },
  rus: {
    key: '.'
  },
  code: 'Slash'
}, {
  key: '▲',
  code: 'ArrowUp'
}, {
  key: 'Shift',
  code: 'ShiftRight',
  className: 'key--2w'
}], [{
  key: 'Ctrl',
  code: 'ControlLeft'
}, {
  key: 'Win',
  code: 'MetaLeft'
}, {
  key: 'Alt',
  code: 'AltLeft'
}, {
  key: ' ',
  code: 'Space',
  className: 'key--whitespace'
}, {
  key: 'Alt',
  code: 'AltRight'
}, {
  key: '◄',
  code: 'ArrowLeft'
}, {
  key: '▼',
  code: 'ArrowDown'
}, {
  key: '►',
  code: 'ArrowRight'
}, {
  key: 'Ctrl',
  code: 'ControlRight'
}]]);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/assets/scss/main.scss":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/assets/scss/main.scss ***!
  \**************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html, body {\n  font-family: \"Roboto Mono\", monospace;\n  font-size: 20px;\n  font-weight: 400;\n  line-height: 1.6;\n  overflow-x: hidden;\n  width: 100%;\n  max-width: 100vw;\n  height: 100%;\n  color: var(--white);\n  scroll-behavior: smooth;\n  margin: 0;\n  padding: 0;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.app {\n  text-align: center;\n}\n\n.entry-field {\n  max-width: 740px;\n  width: 100%;\n  margin-bottom: 15px;\n  margin-top: 50px;\n  resize: none;\n  border-radius: 5px;\n  outline: none;\n  background: #d4d4d4;\n  padding: 8px;\n}\n\n.keyboard {\n  display: inline-flex;\n  flex-direction: column;\n  gap: 8px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 14.52%, rgba(255, 255, 255, 0) 87.38%), #ccc;\n  box-shadow: 0px 2px 0px #848484;\n  border-radius: 12px;\n  padding: 10px;\n  margin: 30px auto;\n}\n.keyboard__line {\n  display: flex;\n  gap: 8px;\n}\n.key {\n  color: #8c8c8c;\n  font-size: 16px;\n  padding: 5px;\n  cursor: pointer;\n  width: 62px;\n  height: 60px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%), #e7e7e7;\n  border: 2px solid rgba(0, 0, 0, 0.6);\n  box-shadow: inset 0 3px 1px #fff;\n  border-radius: 6px;\n  transition: all 0.3s;\n}\n.key:hover {\n  background-color: #ccc;\n  box-shadow: none;\n}\n.key:active, .key--active {\n  box-shadow: inset 2px 2px 5px 0 #656565;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%), #e7e7e7;\n}\n.key--2w {\n  width: 129px;\n}\n.key--1-5w {\n  width: 95px;\n}\n.key--whitespace {\n  width: auto;\n  flex-grow: 1;\n}", "",{"version":3,"sources":["webpack://./src/assets/scss/main.scss"],"names":[],"mappings":"AACA;EACE,qCAAA;EAEA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,YAAA;EACA,mBAAA;EACA,uBAAA;EACA,SAAA;EACA,UAAA;EACA,mCAAA;EACA,kCAAA;AADF;;AAQA;EACE,kBAAA;AALF;;AAWA;EACE,gBAAA;EACA,WAAA;EACA,mBAAA;EACA,gBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,YAAA;AARF;;AAWA;EACE,oBAAA;EACA,sBAAA;EACA,QAAA;EACA,yGAAA;EACA,+BAAA;EACA,mBAAA;EACA,aAAA;EACA,iBAAA;AARF;AAWE;EACE,aAAA;EACA,QAAA;AATJ;AAiBA;EACE,cAAA;EACA,eAAA;EACA,YAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,kFAAA;EACA,oCAAA;EACA,gCAAA;EACA,kBAAA;EACA,oBAAA;AAfF;AAkBE;EACE,sBAAA;EACA,gBAAA;AAhBJ;AAoBE;EAEE,uCAAA;EACA,kFAAA;AAnBJ;AAuBE;EACE,YAAA;AArBJ;AAyBE;EACE,WAAA;AAvBJ;AA2BE;EACE,WAAA;EACA,YAAA;AAzBJ","sourcesContent":["\nhtml, body {\n  font-family             : 'Roboto Mono', monospace;\n\n  font-size               : 20px;\n  font-weight             : 400;\n  line-height             : 1.6;\n  overflow-x              : hidden;\n  width                   : 100%;\n  max-width               : 100vw;\n  height                  : 100%;\n  color                   : var(--white);\n  scroll-behavior         : smooth;\n  margin                  : 0;\n  padding                 : 0;\n  -webkit-font-smoothing  : antialiased;\n  -moz-osx-font-smoothing : grayscale;\n\n}\n\n.container {\n}\n\n.app {\n  text-align : center;\n}\n\n.entry-field-wrapper {\n}\n\n.entry-field {\n  max-width     : 740px;\n  width         : 100%;\n  margin-bottom : 15px;\n  margin-top    : 50px;\n  resize        : none;\n  border-radius : 5px;\n  outline       : none;\n  background    : #d4d4d4;\n  padding       : 8px;\n}\n\n.keyboard {\n  display        : inline-flex;\n  flex-direction : column;\n  gap            : 8px;\n  background     : linear-gradient(180deg, #fff3 14.52%, #fff0 87.38%), #ccc;\n  box-shadow     : 0px 2px 0px #848484;\n  border-radius  : 12px;\n  padding        : 10px;\n  margin         : 30px auto;\n\n  // .keyboard__line\n  &__line {\n    display : flex;\n    gap     : 8px;\n  }\n\n  // .keyboard__key\n  &__key {\n  }\n}\n\n.key {\n  color         : #8c8c8c;\n  font-size     : 16px;\n  padding       : 5px;\n  cursor        : pointer;\n  width         : 62px;\n  height        : 60px;\n  background    : linear-gradient(180deg, #fff0 0%, #fff 100%), #e7e7e7;\n  border        : 2px solid #0009;\n  box-shadow    : inset 0 3px 1px #fff;\n  border-radius : 6px;\n  transition: all 0.3s;\n\n\n  &:hover{\n    background-color : #ccc;\n    box-shadow : none;\n  }\n\n  // .key--active\n  &:active,\n  &--active {\n    box-shadow : inset 2px 2px 5px 0 #656565;;\n    background    : linear-gradient(180deg, #fff0 0%, #fff 100%), #e7e7e7;\n  }\n\n  // .key--2w\n  &--2w {\n    width : 129px;\n  }\n\n  // .key--1-5w\n  &--1-5w {\n    width : 95px;\n  }\n\n  // .key--whitespace\n  &--whitespace {\n    width     : auto;\n    flex-grow : 1;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/assets/scss/main.scss":
/*!***********************************!*\
  !*** ./src/assets/scss/main.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/assets/scss/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkvirtual_keyboard"] = self["webpackChunkvirtual_keyboard"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_modern-normalize_modern-normalize_css"], () => (__webpack_require__("./src/app.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.8803c979f9e8ca25a200.js.map