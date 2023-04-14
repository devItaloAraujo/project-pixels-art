let numColors = 3;

const colorPallet = document.getElementById('color-palette');
let colors = [];

const nameColors = [
    'red',
    'green',
    'blue'
];

const randomRGB = () => {
 return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

for (let index = 0; index < numColors; index += 1) {
    colors[index] = document.createElement('div');
    colors[index].classList.add('color', 'circle');
    colors[index].style.backgroundColor = randomRGB();
    colorPallet.appendChild(colors[index]);
}


