import 'modern-normalize/modern-normalize.css';
import './assets/scss/main.scss';

import keyLines from './assets/js/keys';
import Keyboard from './assets/js/keyboard';

const lang = window.localStorage.getItem('lang') || 'eng';

const keyboardApp = new Keyboard(keyLines, lang);
keyboardApp.init();
