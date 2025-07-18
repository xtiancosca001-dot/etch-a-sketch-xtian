const gridContainer = document.querySelector('.grid-container');
const newGridBtn = document.querySelector('.new-grid-btn');
const MIN_GRID_SIZE = 16;
const MAX_GRID_SIZE = 100;

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

let userGridSize;
newGridBtn.addEventListener('click', () => {
    gridContainer.textContent = '';
    do {
        userGridSize = prompt(`Please enter a grid size (from ${MIN_GRID_SIZE} to ${MAX_GRID_SIZE})`);
        if(userGridSize === null) return;
        userGridSize = Number(userGridSize);
    } while(userGridSize < MIN_GRID_SIZE || userGridSize > MAX_GRID_SIZE);
    createGrid(gridContainer, userGridSize);
});



