const renderKey = (keyData) => {
  const btn = document.createElement('button');
  btn.classList.add('keyboard__key', 'key');
  if (keyData.className) {
    btn.classList.add('keyboard__key', keyData.className);
  }
  btn.type = 'button';
  btn.textContent = keyData.key;
  return btn;
};

const renderKeyLine = (line) => {
  const keysLine = document.createElement('div');
  keysLine.classList.add('keyboard__line');
  const keys = line.map((key) => renderKey(key));
  keysLine.append(...keys);
  return keysLine;
};

const renderKeyLines = (lines) => lines.map((l) => renderKeyLine(l));

export default (data) => renderKeyLines(data);
