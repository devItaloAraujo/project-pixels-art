const numColors = 3;

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
