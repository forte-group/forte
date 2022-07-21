import { getProfile, getUser, signOut, updateProfile } from './services/auth-service.js';
import { checkForMatch, protectPage } from './utils.js';
import createUser from './components/User.js';
import createSequence from './components/Sequence.js';
import createNoteButtons from './components/NoteButtons.js';
import createEnterGuess from './components/EnterGuess.js';
import createGameGrid from './components/GameGrid.js';
import createBackspace from './components/Backspace.js';
import createResult from './components/Result.js';
import createScaleSelect from './components/ScaleSelect.js';
import createNavBar from './components/Nav.js';
import { addStreak, updateStreak } from './services/forte-service.js';

// State
export const synth = new Tone.Synth().toDestination();

let user = null;
let profile = null;
const scaleNames = ['Ionian (standard major)', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian (natural minor)', 'Locrian'];
const scales = [['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
    ['C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4', 'C5'],
    ['C4', 'Db4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5'],
    ['C4', 'D4', 'E4', 'Gb4', 'G4', 'A4', 'B4', 'C5'],
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'Bb4', 'C5'],
    ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5'],
    ['C4', 'Db4', 'Eb4', 'F4', 'Gb4', 'Ab4', 'Bb4', 'C5']
];
let scaleIndex = 0;
let notes;
let sequence = [];
let currentGuess = [];
let guessedSequences = [];
let correctNotes = [];

let currentRow = 0;
let end = false;
let result = -1;

let currentStreak = 0;
let longestStreak = 0;
let numOfStreaks = 0;

let menuOpen = false;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    if (!user) return;

    profile = await getProfile();

    if (!profile) {
        const update = {
            id: user.id,
            username: user?.email.split('@')[0],
            avatar_url: 'https://vzknktjrbugxtqzlomdz.supabase.co/storage/v1/object/public/avatars/f7d0a9e4-b59d-41a4-8f0b-a1ea8286f40c/musician-removebg-preview.png',
        };

        profile = await updateProfile(update);

    }

    numOfStreaks = profile.numberOfStreaks;

    const params = new URLSearchParams(window.location.search);
    scaleIndex = params.get('scale') || 0;

    notes = scales[scaleIndex];

    generateSequence();

    currentStreak = profile.currentStreak;
    longestStreak = profile.longestStreak;

    display();
}

async function handleSignOut() {
    await signOut();
}

function generateSequence() {
    for (let i = 0; i < notes.length; i++) {
        sequence[i] = notes[Math.floor(Math.random() * notes.length)];
    }
}

function handleMenuToggle(menu, closeIcon, menuIcon) {
    if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
        closeIcon.style.display = 'none';
        menuIcon.style.display = 'block';
        menuOpen = !menuOpen;

    }
    else {
        menu.classList.add('showMenu');
        closeIcon.style.display = 'block';
        menuIcon.style.display = 'none';
        menuOpen = !menuOpen;
    }
    display();
}

function handleScaleSelect(index) {
    const params = new URLSearchParams(window.location.search);
    scaleIndex = index;
    params.set('scale', scaleIndex);
    window.location.search = params.toString();
}

function handleGuessNote(note) {
    synth.triggerAttackRelease(note, '8n');
    if (currentGuess.length < 8) {
        currentGuess.push(note);
    }
    EnterButton({ currentGuess });
    BackspaceButton({ currentGuess });
    gameGrid({ currentGuess, correctNotes, guessedSequences, currentRow });
}

function handleBackspace() {
    currentGuess.pop();
    BackspaceButton({ currentGuess });
    EnterButton({ currentGuess });
    gameGrid({ currentGuess, correctNotes, guessedSequences, currentRow });
}

async function handleGameEnd(result) {
    end = true;

    if (result === 1) {
        if (currentStreak === 0) {
            currentStreak++;
            if (currentStreak > longestStreak) longestStreak = currentStreak;
            numOfStreaks++;
            await updateProfile({ id: user.id, numberOfStreaks: numOfStreaks });
            await addStreak(currentStreak, numOfStreaks, user.id);
        }
        else {
            currentStreak++;
            if (currentStreak > longestStreak) longestStreak = currentStreak;
            await updateStreak(user.id, numOfStreaks, currentStreak);
        }
    }
    if (result === -1) {
        currentStreak = 0;
    }

    const streakUpdate = {
        id: user.id,
        longestStreak,
        currentStreak
    };

    profile = await updateProfile(streakUpdate);
}

function handleEnterGuess() {
    guessedSequences.push(currentGuess);
    let match = checkForMatch(sequence, currentGuess);
    if (match || guessedSequences.length === 4) {
        result = match ? 1 : -1;
        handleGameEnd(result);
    }
    let correct = [];
    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess[i] === sequence[i]) {
            correct.push(i);
        }
    }
    correctNotes.push(correct);

    currentGuess = [];
    if (currentRow < 4) currentRow++;
    EnterButton({ currentGuess });
    BackspaceButton({ currentGuess });
    gameGrid({ currentGuess, correctNotes, guessedSequences, currentRow });
    if (currentRow === 4 || result === 1) {
        Result({ result, end, currentStreak, longestStreak, sequence });
    }

}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const NavBar = createNavBar(document, { handleMenuToggle });
const scaleSelect = createScaleSelect(document.querySelector('#scale-select'), { handleScaleSelect });
const Sequence = createSequence(document.querySelector('main'));
const NoteButtons = createNoteButtons(document.querySelector('#note-buttons'), { handleGuessNote });
const EnterButton = createEnterGuess(document.querySelector('#enter'), { handleEnterGuess });
const BackspaceButton = createBackspace(document.querySelector('#backspace'), { handleBackspace });
const gameGrid = createGameGrid(document.querySelector('#game-grid'));
const Result = createResult(document.querySelector('#result'));

function display() {
    User({ user, profile });
    NavBar({ menuOpen });
    scaleSelect({ scaleNames, scales, notes, scaleIndex });
    NoteButtons({ notes });
    EnterButton({ currentGuess });
    BackspaceButton({ currentGuess });
    Sequence({ sequence });
    gameGrid({ currentGuess, correctNotes, guessedSequences, currentRow });
    Result({ result, end, currentStreak, longestStreak, sequence });
}

handlePageLoad();