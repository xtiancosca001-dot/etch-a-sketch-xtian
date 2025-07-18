const gridContainer = document.querySelector('.grid-container');
const sizeButton = document.querySelector('.grid-size-btn');
const GRID_SIZE = 16;

function createRow(size) {
    const gridRow = document.createElement('div');
    gridRow.classList.add('row');
    for(let cols = 0; cols < size; cols++) {
        const gridColumn = document.createElement('div');
        gridColumn.classList.add('column');
        gridRow.appendChild(gridColumn);
    }
    return gridRow;
}

function createGrid(grid, size) {
    for(let row = 0; row < size; row++) {
        grid.appendChild(createRow(size));
    }
}



