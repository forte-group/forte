import { synth } from '../app.js';

export default function createNoteButtons(root) {

    return ({ notes, currentGuess }) => {
        for (const note of notes) {
            root.append(NoteButton({ note, currentGuess }));
        }
    };
}

function NoteButton({ note, currentGuess }) {
    const button = document.createElement('button');
    button.classList.add('note-button');

    button.addEventListener('click', () => {
        synth.triggerAttackRelease(note, '8n');
        if (currentGuess.length < 8) {
            currentGuess.push(note);
        }
    });

    return button;
}