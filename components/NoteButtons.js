import { synth } from './Sequence.js';

export default function createNoteButtons(root) {

    return ({ notes, guessedNotes }) => {
        for (const note of notes) {
            root.append(NoteButton({ note, guessedNotes }));
        }
    };
}

function NoteButton({ note, guessedNotes }) {
    const button = document.createElement('button');
    button.classList.add('note-button');

    button.addEventListener('click', () => {
        synth.triggerAttackRelease(note, '8n');
        if (guessedNotes.length < 8) {
            guessedNotes.push(note);
        }
    });

    return button;
}