export default function createGameGrid(root) {

    root.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.id = 'row-' + i;
        root.appendChild(row);
        for (let j = 0; j < 8; j++) {
            let column = document.createElement('div');
            column.className = 'column';
            column.id = 'column-' + i + '-' + j;
            row.appendChild(column);
        }
    }

    return ({ currentGuess }) => {
        for (let i = 0; i < currentGuess.length; i++) {
            const cell = root.querySelector(`#column-0-${i}`);
            console.log(cell);
            cell.textContent = currentGuess[i].split('')[0];
        }
    };

}

//column-currentRow-currentColumn