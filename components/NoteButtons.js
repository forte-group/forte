export default function createNoteButtons(root, { handleGuessNote }) {

    return ({ notes }) => {
        root.innerHTML = '';
        for (const note of notes) {
            root.append(NoteButton({ note, handleGuessNote }));
        }
    };
}


function NoteButton({ note, handleGuessNote }) {
    const button = document.createElement('button');
    button.classList.add('note-button');
    button.textContent = note === 'C5' ? 'C (high)' : note.split('')[0];
    button.addEventListener('click', () => {
        handleGuessNote(note);
    });

    return button;
}