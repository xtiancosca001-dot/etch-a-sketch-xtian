// Constants
const MIN_GRID_SIZE = 16;
const MAX_GRID_SIZE = 100;

// Global Variables
let userGridSize, colorMethod, alpha, color='0,0,0';

// Containers
const gridContainer = document.querySelector('.grid-container');

// Buttons and Inputs
const newGridBtn = document.querySelector('.new-grid-btn');
const clearBtn = document.querySelector('.clear-btn');
clearBtn.setAttribute('disabled','');
const randomCanvasBtn = document.querySelector('.random-canvas');
randomCanvasBtn.setAttribute('disabled', '');
const randomColorCheckBox = document.querySelector('#random-color');
randomColorCheckBox.setAttribute('disabled','');
const opacityCheckBox = document.querySelector('#opacity');
opacityCheckBox.setAttribute('disabled','');
const colorInput = document.querySelector('#color');
colorInput.setAttribute('disabled','');

function createRow(gridSize) {
    const gridRow = document.createElement('div');
    gridRow.classList.add('row');
    for(let cols = 0; cols < gridSize; cols++) {
        const gridColumn = document.createElement('div');
        gridColumn.classList.add('cell');
        gridRow.appendChild(gridColumn);
    }
    return gridRow;
}

function createGrid(grid, gridSize) {
    for(let row = 0; row < gridSize; row++) {
        grid.appendChild(createRow(gridSize));
    }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
   ].join(',') : null;
}

function randomBgColor() {
    const [v1,v2,v3] = [
        Math.floor(Math.random()*256),
        Math.floor(Math.random()*256),
        Math.floor(Math.random()*256)
    ];
    return [v1,v2,v3].join(',');
}

colorInput.addEventListener('change', e => {
    color = hexToRgb(e.target.value);
});

function draw(grid) {
    if(grid.children) {
        const rows = Array.from(grid.children);
        gridContainer.addEventListener('mouseenter', () => { alpha = 0.1; });
        rows.forEach(row => {
            row.addEventListener('mouseover', e => {
                colorMethod = randomColorCheckBox.checked ? randomBgColor() : color;
                if(opacityCheckBox.checked) {
                    e.target.style.backgroundColor = `rgba(${colorMethod},${Number(alpha.toFixed(2))})`;
                    if(Number(alpha.toFixed(2)) < 1.0) alpha += 0.1;
                }
                else {
                    e.target.style.backgroundColor = `rgb(${colorMethod})`;
                }
            });
        });
    }
}

function clear(grid) {
    if(grid.children) {
        const rows = Array.from(grid.children);
        rows.forEach(row => {
            [...row.children].forEach(child=>{child.style.backgroundColor='';});
        });
    }
}

function randomCanvas(grid) {
    if(grid.children) {
        const rows = Array.from(grid.children);
        rows.forEach(row => {
            [...row.children].forEach(child=>{child.style.backgroundColor=`rgb(${randomBgColor()})`;});
        });
    }
}

function enableButtons() {
    randomCanvasBtn.removeAttribute('disabled');
    clearBtn.removeAttribute('disabled');
    opacityCheckBox.removeAttribute('disabled');
    randomColorCheckBox.removeAttribute('disabled');
    colorInput.removeAttribute('disabled');
}

newGridBtn.addEventListener('click', () => {
    gridContainer.textContent = '';
    enableButtons();
    do {
        userGridSize = prompt(`Please enter a grid size (from ${MIN_GRID_SIZE} to ${MAX_GRID_SIZE})`);
        if(userGridSize === null) return;
        userGridSize = Number(userGridSize);
    } while(userGridSize < MIN_GRID_SIZE || userGridSize > MAX_GRID_SIZE);
    createGrid(gridContainer, userGridSize);
    draw(gridContainer);
    clearBtn.addEventListener('click', () => {
        clear(gridContainer);
    })
    randomCanvasBtn.addEventListener('click', () => {
        randomCanvas(gridContainer);
    })
});





