const numColors = 5;

// Paleta de Cores

const colorPallete = document.getElementById('color-palette');
const colors = [];

const randomRGB = () => `rgb(${Math.floor(Math.random() * 256)},
   ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

if (localStorage.colorPalette) {
  const coresPurasRgb = JSON.parse(localStorage.colorPalette);
  for (let index = 0; index < numColors; index += 1) {
    colors[index] = document.createElement('div');
    colors[index].classList.add('color', 'circle');
    colors[index].style.backgroundColor = coresPurasRgb[index];
    colorPallete.appendChild(colors[index]);
  }
} else {
  for (let index = 0; index < numColors; index += 1) {
    colors[index] = document.createElement('div');
    colors[index].classList.add('color', 'circle');
    colors[index].style.backgroundColor = randomRGB();
    colorPallete.appendChild(colors[index]);
  }
}

const createPallette = () => {
  for (let index = 0; index < numColors; index += 1) {
    colors[index].style.backgroundColor = randomRGB();
  }
};

const savePallette = () => {
  const coresPurasRgb = [];
  for (let index = 0; index < numColors; index += 1) {
    coresPurasRgb[index] = colors[index].style.backgroundColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(coresPurasRgb));
};

const buttonPallete = document.getElementById('button-random-color');
buttonPallete.addEventListener('click', createPallette);
buttonPallete.addEventListener('click', savePallette);

// Pixel-Board

let tamBoard;
if (localStorage.boardSize) {
  tamBoard = parseInt(localStorage.boardSize, 10) ** 2;
} else {
  tamBoard = 25;
}

const pixels = [];
const pixelsFrame = document.getElementById('pixel-board');

if (localStorage.pixelBoard) {
  const pixelBoard = JSON.parse(localStorage.pixelBoard);
  for (let index = 0; index < pixelBoard.length; index += 1) {
    if (index % Math.sqrt(tamBoard) === 0) {
      pixelsFrame.appendChild(document.createElement('br'));
    }
    pixels[index] = document.createElement('div');
    pixels[index].classList.add('pixel', 'square');
    pixels[index].style.backgroundColor = pixelBoard[index];
    pixelsFrame.appendChild(pixels[index]);
  }
} else {
  for (let index = 0; index < tamBoard; index += 1) {
    if (index % Math.sqrt(tamBoard) === 0) {
      pixelsFrame.appendChild(document.createElement('br'));
    }
    pixels[index] = document.createElement('div');
    pixels[index].classList.add('pixel', 'square');
    pixels[index].style.backgroundColor = 'white';
    pixelsFrame.appendChild(pixels[index]);
  }
}

const selectColor = (event) => {
  document.querySelector('.selected').classList.remove('selected');
  for (div of document.querySelectorAll('.selected')) {
    div.classList.remove('selected');
  }
  event.target.classList.add('selected');
};

const paint = (event) => {
  event.target.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
};

const paint2 = (event) => {
  if (event.which === 1) {
    event.target.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
}};

const resetBoard = () => {
  for (const pixel of pixels) {
    pixel.style.backgroundColor = 'white';
  }
};

const saveBoard = () => {
  const colorsOfPixels = [];
  for (let index = 0; index < pixels.length; index += 1) {
    colorsOfPixels[index] = pixels[index].style.backgroundColor;
  }
  localStorage.setItem('pixelBoard', JSON.stringify(colorsOfPixels));
};

const buttonBoard = document.getElementById('clear-board');
buttonBoard.addEventListener('click', resetBoard);

const input = document.getElementById('board-size');
const buttonVQV = document.getElementById('generate-board');

const novaBoard = () => {
  if (input.value.length === 0) {
    alert('Selecione um tamanho pro quadro!');
  } else if (input.value < 5) {
    input.value = 5;
  } else if (input.value > 50) {
    input.value = 50;
  }
  
  tamBoard = parseInt(input.value, 10) ** 2;
  pixelsFrame.innerHTML = '';
  for (let index = 0; index < tamBoard; index += 1) {
    if (index % Math.sqrt(tamBoard) === 0) {
      pixelsFrame.appendChild(document.createElement('br'));
    }
    pixels[index] = document.createElement('div');
    pixels[index].classList.add('pixel', 'square');
    pixels[index].style.backgroundColor = 'white';
    pixelsFrame.appendChild(pixels[index]);
  }
  localStorage.removeItem('pixelBoard');
  localStorage.setItem('boardSize', input.value);
};

buttonVQV.addEventListener('click', novaBoard);

for (let pixel of pixels) {
  pixel.addEventListener('mouseenter', (event) => {
  paint2(event);
  saveBoard();
})};
  
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('color')) {
    selectColor(event);
  }
  if (event.target.classList.contains('pixel')) {
    paint(event);
    saveBoard();
  }
});
