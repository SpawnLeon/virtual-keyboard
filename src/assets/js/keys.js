export default [
  [
    { eng: { key: '`' }, rus: { key: 'ё' }, code: 'Backquote' },
    { key: '1', code: 'Digit1', key2: '!' },
    { key: '2', code: 'Digit2', key2: '@' },
    { key: '3', code: 'Digit3', key2: '#' },
    { key: '4', code: 'Digit4', key2: '$' },
    { key: '5', code: 'Digit5', key2: '%' },
    { key: '6', code: 'Digit6', key2: '^' },
    { key: '7', code: 'Digit7', key2: '&' },
    { key: '8', code: 'Digit8', key2: '*' },
    { key: '9', code: 'Digit9', key2: '(' },
    { key: '0', code: 'Digit0', key2: ')' },
    { key: '-', code: 'Minus', key2: '_' },
    { key: '=', code: 'Equal', key2: '+' },
    { key: 'Backspace', code: 'Backspace', className: 'key--2w' },
  ],
  [
    { key: 'Tab', code: 'Tab', className: 'key--1-5w' },

    {
      eng: { key: 'q' }, rus: { key: 'й' }, code: 'KeyQ', isCapsLocking: true,
    },

    {
      eng: { key: 'w' }, rus: { key: 'ц' }, code: 'KeyW', isCapsLocking: true,
    },
    {
      eng: { key: 'e' }, rus: { key: 'у' }, code: 'KeyE', isCapsLocking: true,
    },
    {
      eng: { key: 'r' }, rus: { key: 'к' }, code: 'KeyR', isCapsLocking: true,
    },
    {
      eng: { key: 't' }, rus: { key: 'е' }, code: 'KeyT', isCapsLocking: true,
    },
    {
      eng: { key: 'y' }, rus: { key: 'н' }, code: 'KeyY', isCapsLocking: true,
    },
    {
      eng: { key: 'u' }, rus: { key: 'г' }, code: 'KeyU', isCapsLocking: true,
    },
    {
      eng: { key: 'i' }, rus: { key: 'ш' }, code: 'KeyI', isCapsLocking: true,
    },
    {
      eng: { key: 'o' }, rus: { key: 'щ' }, code: 'KeyO', isCapsLocking: true,
    },
    {
      eng: { key: 'p' }, rus: { key: 'з' }, code: 'KeyP', isCapsLocking: true,
    },
    { eng: { key: '[' }, rus: { key: 'х' }, code: 'BracketLeft' },
    { eng: { key: ']' }, rus: { key: 'ъ' }, code: 'BracketRight' },
    { key: 'Delete', code: 'Delete', className: 'key--1-5w' },
  ],
  [
    {
      key: 'CapsLock', code: 'CapsLock', className: 'key--1-5w', isCapsLock: true,
    },
    {
      eng: { key: 'a' }, rus: { key: 'ф' }, code: 'KeyA', isCapsLocking: true,
    },
    {
      eng: { key: 's' }, rus: { key: 'ы' }, code: 'KeyS', isCapsLocking: true,
    },
    {
      eng: { key: 'd' }, rus: { key: 'в' }, code: 'KeyD', isCapsLocking: true,
    },
    {
      eng: { key: 'f' }, rus: { key: 'а' }, code: 'KeyF', isCapsLocking: true,
    },
    {
      eng: { key: 'g' }, rus: { key: 'п' }, code: 'KeyG', isCapsLocking: true,
    },
    {
      eng: { key: 'h' }, rus: { key: 'р' }, code: 'KeyH', isCapsLocking: true,
    },
    {
      eng: { key: 'j' }, rus: { key: 'о' }, code: 'KeyJ', isCapsLocking: true,
    },
    {
      eng: { key: 'k' }, rus: { key: 'л' }, code: 'KeyK', isCapsLocking: true,
    },
    {
      eng: { key: 'l' }, rus: { key: 'д' }, code: 'KeyL', isCapsLocking: true,
    },
    { eng: { key: ';' }, rus: { key: 'ж' }, code: 'Semicolon' },
    { eng: { key: '\'' }, rus: { key: 'э' }, code: 'Quote' },
    { eng: { key: '\\' }, rus: { key: '\\' }, code: 'Backslash' },
    { key: 'Enter', code: 'Enter', className: 'key--1-5w' },
  ],
  [
    { key: 'Shift', code: 'ShiftLeft', className: 'key--2w' },
    {
      eng: { key: 'z' }, rus: { key: 'я' }, code: 'KeyZ', isCapsLocking: true,
    },
    {
      eng: { key: 'x' }, rus: { key: 'ч' }, code: 'KeyX', isCapsLocking: true,
    },
    {
      eng: { key: 'c' }, rus: { key: 'с' }, code: 'KeyC', isCapsLocking: true,
    },
    {
      eng: { key: 'v' }, rus: { key: 'м' }, code: 'KeyV', isCapsLocking: true,
    },
    {
      eng: { key: 'b' }, rus: { key: 'и' }, code: 'KeyB', isCapsLocking: true,
    },
    {
      eng: { key: 'n' }, rus: { key: 'т' }, code: 'KeyN', isCapsLocking: true,
    },
    {
      eng: { key: 'm' }, rus: { key: 'ь' }, code: 'KeyM', isCapsLocking: true,
    },
    { eng: { key: ',' }, rus: { key: 'б' }, code: 'Comma' },
    { eng: { key: '.' }, rus: { key: 'ю' }, code: 'Period' },
    { eng: { key: '/' }, rus: { key: '.' }, code: 'Slash' },
    { key: '▲', code: 'ArrowUp' },
    { key: 'Shift', code: 'ShiftRight', className: 'key--2w' },
  ],
  [
    { key: 'Ctrl', code: 'ControlLeft' },
    { key: 'Win', code: 'MetaLeft' },
    { key: 'Alt', code: 'AltLeft' },
    { key: ' ', code: 'Space', className: 'key--whitespace' },
    { key: 'Alt', code: 'AltRight' },
    { key: '◄', code: 'ArrowLeft' },
    { key: '▼', code: 'ArrowDown' },
    { key: '►', code: 'ArrowRight' },
    { key: 'Ctrl', code: 'ControlRight' },
  ],
];
