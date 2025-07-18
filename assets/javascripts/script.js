const gridContainer = document.querySelector('.grid-container');
const newGridBtn = document.querySelector('.new-grid-btn');
const GRID_SIZE = 16;

function createRow(size) {
    const gridRow = document.createElement('div');
    gridRow.classList.add('row');
    for(let cols = 0; cols < size; cols++) {
        const gridColumn = document.createElement('div');
        gridColumn.classList.add('cell');
        gridRow.appendChild(gridColumn);
    }
    return gridRow;
}

function createGrid(grid, size) {
    for(let row = 0; row < size; row++) {
        grid.appendChild(createRow(size));
    }
}

let userSize;
newGridBtn.addEventListener('click', () => {
    gridContainer.textContent = '';
    do {
        userSize = prompt('Please enter a grid size (from 16 to 100)');
        if(userSize === null) return;
        userSize = Number(userSize);
    } while(userSize < 16 || userSize > 100);
    createGrid(gridContainer, userSize);
});



