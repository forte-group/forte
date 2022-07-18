import { getUser, signOut } from './services/auth-service.js';
import { checkForMatch, protectPage } from './utils.js';
import createUser from './components/User.js';
import createSequence from './components/Sequence.js';
import createNoteButtons from './components/NoteButtons.js';
import createEnterGuess from './components/EnterGuess.js';
// import createBackspace from './components/Backspace.js';

// State
export const synth = new Tone.Synth().toDestination();

let user = null;
const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
const noteInputButtons = document.querySelector('.note-button');
let sequence = [];
let currentGuess = [];
let guessedSequences = [];
let sequenceLength = 8;
let maxGuesses = 4;
// let numberOfGuesses = 0;
let currentColumn = 0;
let currentRow = 0;

// make state that is currentRow, initialized to 0
// enter button scores currentRow, increments currentRow

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    generateSequence();
    
    display();
}

async function handleSignOut() {
    signOut();
}

function generateSequence() {
    for (let i = 0; i < notes.length; i++) {
        sequence[i] = notes[Math.floor(Math.random() * notes.length)];
    }
}

function handleGameEnd() {
    //brings up popup
    // says won or lost
    // gives current streak and longest streak
    // two buttons: play again and view leaderboard
}

function handleEnterGuess() {
    guessedSequences.push(currentGuess);
    const match = checkForMatch(currentGuess, sequence);
    if (match || guessedSequences.length === 4) {
        handleGameEnd();
    }
    currentGuess = [];
    currentRow++;
    display();
}


let generateGameGrid = () => {
    
    let grid = document.querySelector('#game-grid');
    grid.innerHTML = '';

    for (let i = 0; i < maxGuesses; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.id = 'row-' + i;
        grid.appendChild(row);
        for (let j = 0; j < 8; j++) {
            let column = document.createElement('div');
            column.className = 'column';
            column.id = 'column-' + i + '-' + j;
            row.appendChild(column);
        }
    }
};

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Sequence = createSequence(document.querySelector('#sequence'));
const NoteButtons = createNoteButtons(document.querySelector('#note-buttons'));
const EnterButton = createEnterGuess(document.querySelector('#enter'), { handleEnterGuess });
// const BackspaceButton = createBackspace(document.querySelector('#backspace'), { goBack });

function display() {
    User({ user });
    generateGameGrid();
    Sequence({ sequence });
    NoteButtons({ notes, currentGuess });
    EnterButton({ currentGuess });
    // BackspaceButton();
}

handlePageLoad();

// next steps:
    // - enter button to submit guess
// const goBack = () => {
//     if (currentColumn > 0) {
//         (currentColumn - 1).innerText = ''; 
//         currentColumn--;
//         currentGuess.pop();
//     }
// };

// function enterANote(event) {
//     if (currentColumn < 8) {
//         document.querySelector('#column' + currentRow + '-' + currentColumn).innerText = event.target.innerText;
//         currentColumn++;
//         currentGuess.push(event.target.innerText);
//     }
// }

// noteInputButtons.addEventListener('click', () => {
//     enterANote();
// });









    // - backspace button to remove note from guess