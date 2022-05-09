import 'modern-normalize/modern-normalize.css';
import './assets/scss/main.scss';

import keyLines from './assets/js/keys';
import Keyboard from './assets/js/keyboard';

const keyboardApp = new Keyboard(keyLines);
keyboardApp.init();
