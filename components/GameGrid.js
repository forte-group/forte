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

    return ({ currentGuess, correctNotes, guessedSequences, currentRow }) => {

        if (currentRow < 4) {
            for (let i = 0; i < currentGuess.length; i++) {
                const cell = root.querySelector(`#column-${currentRow}-${i}`);
                let noteText = currentGuess[i].match(/[a-zA-Z]+/g);
                cell.textContent = noteText[0];
            }

            for (let i = currentGuess.length; i < 8; i++) {
                const blankCell = root.querySelector(`#column-${currentRow}-${i}`);
                blankCell.textContent = '';
            }
        }

        if (guessedSequences.length) {
            for (let i = 0; i < guessedSequences[currentRow - 1].length; i++) {
                const completedCell = root.querySelector(`#column-${currentRow - 1}-${i}`);
                if (correctNotes[currentRow - 1].includes(i)) {
                    completedCell.classList.add('correct');
                }
            }
        }

        if (currentGuess.length === 0 && correctNotes.length === 0 && guessedSequences.length === 0 && currentRow === 0) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 4; j++) {
                    const cell = root.querySelector(`#column-${j}-${i}`);
                    cell.textContent = '';
                    cell.classList.remove('correct');
                }
            }
        }
    };

}