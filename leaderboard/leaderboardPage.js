import { getUser, signOut, getProfile } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getLongestStreaks } from '../services/forte-service.js';
import createLeaderboard from '../components/Leaderboard.js';

// State
let user = null;
let profile = null;
let streaks = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile();

    streaks = await getLongestStreaks();

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
    User({ user, profile });
    Leaderboard({ streaks });

}

handlePageLoad();
