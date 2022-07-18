import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';

// State
let user = null;
let sequenceLength = 8;
let numberOfGuesses = 4;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    display();
}

async function handleSignOut() {
    signOut();
}


let fragment = document.createDocumentFragment();

let generateGameGrid = () => {
    
    let grid = document.querySelector('#game-grid');
    grid.innerHTML = '';

    Array.from({ length: numberOfGuesses }).forEach(() => {
        let row = document.createElement('div');
        row.classList.add('row');
        
        Array.from({ length: sequenceLength }).forEach(() => {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            
            row.appendChild(tile);
        });
        
        fragment.appendChild(row);
    });

    grid.appendChild(fragment);

};

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

function display() {
    User({ user });
    generateGameGrid();

}

handlePageLoad();
