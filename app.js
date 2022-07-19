import { getProfile, getUser, signOut } from './services/auth-service.js';
import { checkForMatch, protectPage } from './utils.js';
import createUser from './components/User.js';
import createSequence from './components/Sequence.js';
import createNoteButtons from './components/NoteButtons.js';
import createEnterGuess from './components/EnterGuess.js';
import createGameGrid from './components/GameGrid.js';
import createBackspace from './components/Backspace.js';
import createResult from './components/Result.js';

// State
export const synth = new Tone.Synth().toDestination();

let user = null;
let profile = null;
const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
let sequence = [];
let currentGuess = [];
let guessedSequences = [];
let correctNotes = [];

let currentRow = 0;
let end = false;
let result = -1;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile();
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

function handleGuessNote(note) {
    synth.triggerAttackRelease(note, '8n');
    if (currentGuess.length < 8) {
        currentGuess.push(note);
    }
    display();
}

function handleBackspace() {
    currentGuess.pop();
    display();
}

function handleGameEnd(result) {
    end = true;
    //brings up popup
    // says won or lost
    // gives current streak and longest streak
    // two buttons: play again and view leaderboard
}

function handleEnterGuess() {
    guessedSequences.push(currentGuess);
    const match = checkForMatch(currentGuess, sequence);
    if (match || guessedSequences.length === 4) {
        result = match ? 1 : -1;
        handleGameEnd(result);
    }
    else if (!match) {
        let correct = [];
        for (let i = 0; i < currentGuess.length; i++) {
            if (currentGuess[i] === sequence[i]) {
                correct.push(i);
            }
        }
        correctNotes.push(correct);

    }
    currentGuess = [];
    if (currentRow < 3) currentRow++;
    display();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Sequence = createSequence(document.querySelector('#sequence'));
const NoteButtons = createNoteButtons(document.querySelector('#note-buttons'), { handleGuessNote });
const EnterButton = createEnterGuess(document.querySelector('#enter'), { handleEnterGuess });
const BackspaceButton = createBackspace(document.querySelector('#backspace'), { handleBackspace });
const gameGrid = createGameGrid(document.querySelector('#game-grid'));
const Result = createResult(document.querySelector('#result'));

function display() {
    User({ user, profile });
    Sequence({ sequence });
    NoteButtons({ notes });
    EnterButton({ currentGuess });
    BackspaceButton();
    gameGrid({ currentGuess, correctNotes, guessedSequences, currentRow });
    Result({ result, end });
}

handlePageLoad();