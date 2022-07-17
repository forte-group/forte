import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import { getStreaks } from '../services/forte-service.js';
import createLeaderboard from '../components/Leaderboard.js';

// State
let user = null;
let streaks = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    streaks = await getStreaks();

    display();
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Leaderboard = createLeaderboard(document.querySelector('#scores'));

function display() {
    User({ user });
    Leaderboard({ streaks });

}

handlePageLoad();
