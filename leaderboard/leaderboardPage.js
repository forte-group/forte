import { getUser, signOut, getProfile } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getLongestStreaks } from '../services/forte-service.js';
import createLeaderboard from '../components/Leaderboard.js';
import createPaging from '../components/Paging.js';

// State
let user = null;
let profile = null;
let streaks = [];
let length = 10;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    if (!user) return;

    profile = await getProfile();

    streaks = await getLongestStreaks(length);

    display();
}

async function handleSignOut() {
    await signOut();
}

async function handleExpand() {
    length += 10;
    streaks = await getLongestStreaks(length);
    display();
}

async function handleShrink() {
    length -= 10;
    streaks = await getLongestStreaks(length);
    display();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Leaderboard = createLeaderboard(document.querySelector('#scores'));
const Paging = createPaging(document.querySelector('#buttons-div'), { handleShrink, handleExpand });

function display() {
    User({ user, profile });
    Leaderboard({ streaks });
    Paging({ length });
}

handlePageLoad();
