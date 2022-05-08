const renderKey = (keyData) => {
  const btn = document.createElement('button');
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
